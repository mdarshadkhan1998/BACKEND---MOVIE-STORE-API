const express = require("express");
const app = express();
const { Movie, connection } = require("./db");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET
app.get("/movies", async(req,res)=>{
    const params = req.query;
    const movies = await Movie.find(params)
    // for searching language and rating simaltaneously
    // http://localhost:8080/movies?language=English&rating=9
    return res.json(movies)
})

//POST
app.post("/movies", async(req,res)=>{
    console.log("--------------------------------------")
    console.log(req.body)
    const newData = Movie.insertMany(req.body)
   res.send("Posted Data")
})


app.listen(8080, async()=>{
    try{
        await connection;
        console.log("Connected to db")
    }catch{
        console.log("Server Failed")
    }
    console.log(`server started at http://localhost:${8080 }`)
})