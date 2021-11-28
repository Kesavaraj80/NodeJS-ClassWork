 async function updateMovie(client, id, data) {
    return await client.db("movieDb").collection("movies").updateOne({ id: id }, { $set: data });
}
 async function addMovies(client, data) {
    return await client.db("movieDb").collection("movies").insertMany(data);
}
 async function deleteMovieById(client, id) {
    return await client.db("movieDb").collection("movies").deleteOe({ id: id });
}
 async function getMovieById(client, id) {
    return await client.db("movieDb").collection("movies").findOne({ id: id });
}
 async function getMovies(filter, client) {
    return await client.db("movieDb").collection("movies").find(filter).toArray();
}

export { getMovies, 
    getMovieById, 
    deleteMovieById, 
    addMovies, 
    updateMovie };