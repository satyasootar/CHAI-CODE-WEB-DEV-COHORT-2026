import { createApplication } from "./src/app/app.js";
import { initializeSchema } from "./src/db/schema.js";

const port = process.env.PORT || 8080;

export async function startServer() {
  try {
    await initializeSchema();
    const app = createApplication();

    app.listen(port, () => {
      console.log("Server starting on port: " + port);
    });
  } catch (error) {
    console.log("Failed to initialize schema", error);
    process.exit(1);
  }
}

startServer();