// const express = require('express');
import express from 'express';
import {MongoClient} from 'mongodb';
import dotenv from "dotenv";
import { moviesRouter } from './routes/movies.js';
// import bcrypt from "bcrypt";
// import { getMovies, 
//     getMovieById, 
//     deleteMovieById, 
//     addMovies, 
//     updateMovie } from './helper.js'


dotenv.config();

const app = express();

const PORT = process.env.PORT||9000;

const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB Connected");

    // const movie = await client.db("movieDb").collection("movies").findOne({id:"101"})

    // console.log(movie);
    return client;
}

export  const client = await createConnection();



app.get('/', (req, res) => {
    res.send("Hello World");
});





app.use('/movies', moviesRouter)

app.listen(PORT, () => console.log("App is Started"));

