const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const path=require('path');
const { string } = require('yargs');

const app=express();
const PORT=process.env.PORT||8080;

const routes=require("./routes/api")
const db="mongodb+srv://mernapp:gameofthrones01@mernapp.dho3i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(db || "mongodb://localhost/mern_youtube",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on("connected",()=>{
    console.log("Mongoose is connected!");
});
app.use(express.json());
app.use(express.json({extended:false}));


//saving data to mongodb
// const data={
// title:"welcome",
// body:"sic mundus creatus est"
// }

// const newBlogPost=new BlogPost(data) //instance of the model

// newBlogPost.save((error)=>{
//    if(error){
//        console.log("error!");
//    } 
//    else{
//        console.log("data has been saved!")
//    }
// });
//.save

//http request logger
app.use(morgan("tiny"));
app.use("/api",routes);


app.listen(PORT,console.log(`server is starting at ${PORT}`));