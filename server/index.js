const express =  require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const app = express()
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")

const port = 3001 || 3000

//database connection
mongoose.connect("mongodb://localhost:27017/ecommerce")



//middleware 
app.use(cors())
app.use(body_parser.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json())

app.use("/",(req,res)=>{
    res.send("Server Running . . .")
})
app.use("/auth",userRouter)
app.use("/products",productRouter)


app.listen(port,() => {
    console.log("Server Running in Successfully ---> ",port)
})




