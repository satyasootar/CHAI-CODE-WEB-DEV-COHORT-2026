import http from 'http';

import express from 'express';
import { Server } from 'socket.io';

import { publisher, subscriber, redis } from './redis-connection.js';
import e from 'express';

const CHECKBOX_STATE_KEY = 'checkbox-statev1';

async function main() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  const PORT = process.env.PORT || 3000;


  //socket.io handlers
  io.attach(server)
  await subscriber.subscribe('checkbox-change')
    
  subscriber.on('message', (channel, message) => {
        if (channel === 'checkbox-change') {
            const {index, checked} = JSON.parse(message);
            io.emit('checkbox-update', { index, checked });
        }
    }); 


  io.on('connection', (socket) => {
    
    socket.on("checkbox-change", async(data) => {

    const rateLimitKey = `rate-limit:${socket.id}`;
    const lastOperationTimeStr = await redis.get(rateLimitKey);
    
    if(lastOperationTimeStr){
        const lastOperationTime = parseInt(lastOperationTimeStr, 10);
        const timeElapsed = Date.now() - lastOperationTime;
        if(timeElapsed < 5000){
          const remainingTime = 5000 - timeElapsed;
          socket.emit("server:error", { message: `Rate limit exceeded. Please try again in ${remainingTime} ms.`, data: data });
            return;
        }
    }
    // Update the timestamp in Redis, with an expiration of 5 seconds to automatically clear up memory
    await redis.set(rateLimitKey, Date.now().toString(), 'PX', 5000).catch(() => redis.set(rateLimitKey, Date.now().toString()));
    

    const existingstate = await redis.get(CHECKBOX_STATE_KEY);

    if(existingstate){
        const remoteData = JSON.parse(existingstate);
        remoteData[data.index] = data.checked;
        redis.set(CHECKBOX_STATE_KEY, JSON.stringify(remoteData));
    }else{
        redis.set(CHECKBOX_STATE_KEY, JSON.stringify(new Array(100).fill(false)));
    }
   
    await publisher.publish('checkbox-change', JSON.stringify(data));
    });
  });


  //express handlers
  app.use(express.static('public'));

  app.get("/checkbox-state", async(req, res)=>{
    const existingstate = await redis.get(CHECKBOX_STATE_KEY);
    if(existingstate){
      res.json({state: JSON.parse(existingstate)});
    }else{
      res.json({state: state.checkboxes});
    }
  })

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main()