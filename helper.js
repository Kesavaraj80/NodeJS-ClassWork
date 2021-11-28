 import {client} from './index.js'
 
 
 async function updateMovie(id, data) {
    return await client.db("movieDb").collection("movies").updateOne({ id: id }, { $set: data });
}
 async function addMovies(data) {
    return await client.db("movieDb").collection("movies").insertMany(data);
}
 async function deleteMovieById(id) {
    return await client.db("movieDb").collection("movies").deleteOe({ id: id });
}
 async function getMovieById(id) {
    return await client.db("movieDb").collection("movies").findOne({ id: id });
}
 async function getMovies(filter) {
    return await client.db("movieDb").collection("movies").find(filter).toArray();
}

export { getMovies, 
    getMovieById, 
    deleteMovieById, 
    addMovies, 
    updateMovie };