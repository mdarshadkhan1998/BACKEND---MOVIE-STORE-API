const mongoose = require("mongoose");
const {Schema, model} = require("mongoose");
const connecton = mongoose.connect("mongodb://localhost:27017/moviestore")

const MoviSchema = new Schema({
    id: Number,
    name: {type:String, require:true},
    image: {type:String},
    rating: Number,
    duration: {type: Number, default: 150, min: 100, max: 300},
    date: {type: Number, default: 2020, min: 2010, max: 2030},
    language:{
        type: String,
        enum: ["English", "Hindi"],   
    }
})

const Movie = model('movie', MoviSchema)
module.exports = {Movie, connecton}

// const main = async() => {
//     const con = await connecton;
//     console.log("Connected Successfully");
//     const movie = new Movie({
//         id: 13,
//         name: "Gangs of Wasepur",
//         image: "xyz image",
//         rating: 8.5,
//         duration: 160,
//         date: 2018,
//         language:"Hindi"
//     })
//     await movie.save()
//     con.disconnect();
// }
// main();