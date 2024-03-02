const http = require('http');

const fs = require('fs')

const url = require('url')

const myserver = http.createServer((req,res) =>{
    const log = `${Date.now()}: ${req.url} New request received\n`;

    const myurl =url.parse(req.url);
    console.log(myurl);

    fs.appendFile("logo.txt", log, (err, data) =>{
        switch(req.url){
            case "/": 
                          res.end("This is homepage");
            break   

            case "/about": 
                          res.end("hello i am saurabh kumar");
            break
            default: 
                          res.end("404 page not found")

        }

    })
})

myserver.listen(8000,()=>{
    
    console.log("server will be started !");
})


// const os = require('os')
// console.log(os.cpus().length) // in this os it will show the cpu threads in cpu.


