import express from "express";
const router = express.Router();
import cors from "cors";
import {
    getMovies,
    getMovieById,
    deleteMovieById,
    addMovies,
    updateMovie
} from '../helper.js'

router
    .route('/')
    .get(cors(),async (req, res) => {
        console.log(req.query);
        const filter = req.query;
        // let filteredMovie = movies;
        if (filter.rating) {
            filter.rating = +filter.rating;
        }


        const movie = await getMovies(filter);

        res.send(movie);
    })
    .post(cors(),async (req, res) => {
        // console.log(req.params);
        const data = req.body;
        console.log(data);

        // const notFound = {message:"Movie Not Found"};
        const result = await addMovies(data);
        res.send(result);

    });


router
    .route('/:id')
    .get(cors(),async (req, res) => {
        console.log(req.params);
        const { id } = req.params;
        // const findedMovie = movies.find((mv)=>mv.id===id);
        const notFound = { message: "Movie Not Found" };
        const movie = await getMovieById(id);
        // res.send(findedMovie);
        movie ? res.send(movie) : res.send(notFound);
    })
    .delete( cors(), async (req, res) => {
        console.log(req.params);
        const { id } = req.params;
        // const findedMovie = movies.find((mv)=>mv.id===id);
        const notFound = { message: "Movie Not Found" };
        const movie = await deleteMovieById(id);
        // res.send(findedMovie);
        movie ? res.send(movie) : res.send(notFound);
    })
    .put(cors(),async (req, res) => {
        // console.log(req.params);
        const { id } = req.params;
        const data = req.body;
        console.log(data);
        // const notFound = {message:"Movie Not Found"};
        const result = await updateMovie(id, data);
        res.send(result);

    });

export const moviesRouter = router;