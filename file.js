const fs = require('fs');
const [,,input] = process.argv;
for(let i =1;i<=input;i++){
    fs.writeFile('test'+i+'.html','file created',function(err){
        if(err) throw err;
        console.log("created",i);
    })
}