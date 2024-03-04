const express = require("express")
const users = require('./MOCK_DATA.json')
const fs = require("fs")
const app = express()
const PORT = 9000;

//middleware for express
app.use(express.urlencoded({urlencoded: false}));

app.use((req, res, next) => {
    // console.log("Hello from middleware 1");
    fs.appendFile('log.txt', `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`,(err, data)=>{
        next()
    });   
   // req.myUsername = "saurabhkumar.dev"
    // return res.json("Hello from middleware 1")
})


// app.use((req, res, next) => {
//     console.log("Hello from middleware 2", req.myUsername);
//     // return res.json("HEY")
//     next()

// })


//api will be use in html tag in browser.
app.get('/users',(req,res) =>{
    const html =`
    <ul>
         ${users.map((user) => `<li>${user.first_name}</li>`).join("  ")}
    </ul>
    `
    res.send(html)

});


//Rest Api
app.get('/api/users',(req,res) =>{
    res.setHeader("myname", "saurabh kumar");
    console.log(req.myUsername);
    return res.json(users)
})


app.get('/api/users/:id',(req,res) =>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})


app.route("api/users/:id").get((req,res) =>{
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req,res) =>{
        return res.json({status: "pending"})
    })
    .delete((req,res) =>{
        return res.json({status: "deleted"});
    })



app.post('/api/users',(req,res)=>{
   const body = req.body;
 //  console.log("Body", body);
   users.push({ ...body, id: users.length +1 });
   fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
   return res.status(201).json({status : "success", id: users.length})
   })
})

app.patch('/api/users/:id',(req,res)=>{
    return res.json({status : "pending"})
})

app.delete('/api/users/:id',(req,res)=>{
    return res.json({status : "pending"})
 })

app.listen(PORT,() =>console.log(`Sever has started successfully at port no ${PORT}`));