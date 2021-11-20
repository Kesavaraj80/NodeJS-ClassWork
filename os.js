// const os = require('os');
const fs = require('fs');

// console.log(os.freemem())
// console.log(os.totalmem())
// console.log(os.hostname())
// console.log(os.userInfo())
// console.log(os.cpus())
// console.log(fs)

const [,,name] = process.argv

fs.readFile("./msg.txt","utf-8",(err,data)=>{
    err?console.log(err):console.log(data+name)
})

console.log(fs)