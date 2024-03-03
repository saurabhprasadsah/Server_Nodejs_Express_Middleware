const express = require("express")
const users = require('./MOCK_DATA.json')
const app = express()
const PORT = 8000;


// app.get('/users',(req,res) =>{
//     const html =`
//     <ul>
//          ${users.map((user) => `<li>${user.first_name}</li>`).join("  ")}
//     </ul>
//     `;
//     res.send(html)

// });

//Rest Api will be started.....
app.get('/api/users',(req,res) =>{
    return res.json(users)
})

// app.get('/api/users/:id',(req,res) =>{
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })

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

// app.post('api/users',(req,res)=>{
//    return res.json({status : "pending"})
// })

// app.patch('api/users/:id',(req,res)=>{
//     return res.json({status : "pending"})
// })

// app.delete('api/users/:id',(req,res)=>{
//     return res.json({status : "pending"})
//  })

app.listen(PORT,() =>console.log(`Sever has started successfully at port no ${PORT}`));