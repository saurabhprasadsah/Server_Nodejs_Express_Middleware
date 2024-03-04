const express = require("express")
const users = require('./MOCK_DATA.json')
const fs = require("fs")
const mongoose = require("mongoose")
const { log } = require("console")
const app = express()
const PORT = 9000;

//connection
mongoose
    .connect("mongodb://127.0.0.1:27017/youtube-app-1")
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("Mongo Error", err));

//schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobtitle: {
        type: String,
    },
    gender: {
        type: String,

    },
});


const User = mongoose.model("user", userSchema);



//middleware for express
app.use(express.urlencoded({ urlencoded: false }));

app.use((req, res, next) => {
    // console.log("Hello from middleware 1");
    fs.appendFile('log.txt', `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`, (err, data) => {
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
app.get('/users', (req, res) => {
    const html = `
    <ul>
         ${users.map((user) => `<li>${user.first_name}</li>`).join("  ")}
    </ul>
    `
    res.send(html)

});


//Rest Api
app.get('/api/users', (req, res) => {
    res.setHeader("myname", "saurabh kumar");
    console.log(req.myUsername);
    return res.json(users)
})


app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

app.route("api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
    .patch((req, res) => {
        return res.json({ status: "pending" })
    })
    .delete((req, res) => {
        return res.json({ status: "deleted" });
    })

app.post('/api/users', async (req, res) => {
    const body = req.body;
    //  console.log("Body", body);
    if
     (
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.gender ||
        !body.jobtitle
    ) {
        return res.status(400).json({ msg: "All fileds are required......" });
    }
    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        email: body.email,
        gender: body.gender,
    });

    console.log("Result", result);
    return res.status(201).json({ msg: "success" });

});


// app.patch('/api/users/:id',(req,res)=>{
//     return res.json({status : "pending"})
// })

// app.delete('/api/users/:id',(req,res)=>{
//     return res.json({status : "pending"})
//  })

app.listen(PORT, () => console.log(`Sever has started successfully at port no ${PORT}`));