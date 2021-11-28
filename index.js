// const express = require('express');
import express from 'express';
import {MongoClient} from 'mongodb';
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { getMovies, 
    getMovieById, 
    deleteMovieById, 
    addMovies, 
    updateMovie } from './helper.js';


dotenv.config();

const app = express();

const PORT = 9000;

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

createConnection();


// app.get('/movies', (req, res) => {
//     res.send(movies);
// });



app.get('/movies', async(req, res) => {
    console.log(req.query);  
    const filter=req.query;
    // let filteredMovie = movies;
    if(filter.rating){
        filter.rating=+filter.rating;
    }

    const client = await createConnection();

    const movie = await getMovies(filter,client);

    res.send(movie); 
});

app.get('/movies/:id', async(req, res) => {
    console.log(req.params);
    const {id}=req.params;
    // const findedMovie = movies.find((mv)=>mv.id===id);
    const client = await createConnection();
    const notFound = {message:"Movie Not Found"};
    const movie = await getMovieById(client, id);
    // res.send(findedMovie);
    movie?res.send(movie):res.send(notFound);
});


app.delete('/movies/:id', async(req, res) => {
    console.log(req.params);
    const {id}=req.params;
    // const findedMovie = movies.find((mv)=>mv.id===id);
    const client = await createConnection();
    const notFound = {message:"Movie Not Found"};
    const movie = await deleteMovieById(client, id);
    // res.send(findedMovie);
    movie?res.send(movie):res.send(notFound);
});

app.post('/movies', async(req, res) => {
    // console.log(req.params);
    const data = req.body;
    console.log(data);
 
    const client = await createConnection();
    // const notFound = {message:"Movie Not Found"};
    const result = await addMovies(client, data);
    res.send(result);

});

app.put('/movies/:id', async(req, res) => {
    // console.log(req.params);
    const {id}=req.params;
    const data = req.body;
    console.log(data);
 
    const client = await createConnection();
    // const notFound = {message:"Movie Not Found"};
    const result = await updateMovie(client, id, data);
    res.send(result);

});

app.listen(PORT, () => console.log("App is Started"));

