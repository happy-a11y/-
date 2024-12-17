const express = require('express');
const app = express();

app.use(express.urlencoded({extended:false}))

const userRouter = require('./router')
app.use(userRouter)

app.listen(80,()=>{
    console.log("Server is running on port 80");
});