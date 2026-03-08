// These 3 are main and most important

const fs = require("fs")
const path = require("path")
const os = require("os")


console.log("Node: ", process.versions.node);
console.log("libuv: ", process.versions.uv);
console.log("v8: ", process.versions.v8);
console.log("=".repeat(25))
console.log("Platform ", process.platform);
console.log("CPU ", os.cpus().length);


console.log(typeof global)
console.log(typeof globalThis)