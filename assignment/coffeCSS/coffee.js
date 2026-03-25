const coffeeStyles = {
    "text-red": {
        color: "red"
    },
    "text-green":{
        color: "green"
    },
    "bg-blue":{
        backgroundColor: "blue"
    },
    "border":{
        border: "1px solid red"
    },
    "bg-brown":{
        backgroundColor: "brown"
    },
    "p-10":{
        padding: "10px"
    }
}

const element = document.querySelectorAll('[class]')
console.log("element: ", element);

element.forEach((ele)=>{
    ele.classList.forEach((cls)=>{
        if(cls.startsWith("cofi-")){
            const key = cls.replace("cofi-", "")
            console.log("key: ", key);
            const style = coffeeStyles[key]
            if(style){
                Object.assign(ele.style, style)
            }
        }
    })
})