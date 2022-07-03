const express = require("express");
const app = express();
const axios = require("axios");
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

//Delete
app.delete("/movies", async(req,res)=>{
    console.log("--------------------------------------")
    console.log(req.body)
    
    const newData = Movie.deleteOne()
    res.send("Deleted Data")
})


app.get("/movies/search/:name", function (req, res) {
    var regex = new RegExp(req.params.name, "i");
    Movie.find({ name: regex }).then((result) => {

      res.status(200).json(result);
    });
  });

app.listen(8080, async()=>{
    try{
        await connection;
        console.log("Connected to db")
    }catch{
        console.log("Server Failed")
    }
    console.log(`server started at http://localhost:${8080 }`)
})

// {
//     "id": 14,
//     "name": "Mirzapur",
//     "image": "xyz image",
//     "rating": 8,
//     "duration": 160,
//     "date": 2018,
//     "language":"Hindi"
// }
