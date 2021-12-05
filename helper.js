 import {client} from './index.js'
 
 
 async function updateMovie(id, data) {
    return await client.db("movieDb").collection("movies").updateOne({ id: id }, { $set: data });
}
 async function addMovies(data) {
    return await client.db("movieDb").collection("movies").insertOne(data);
}



 async function deleteMovieById(id) {
    return await client.db("movieDb").collection("movies").deleteOne({ id: id });
}
 async function getMovieById(id) {
    return await client.db("movieDb").collection("movies").findOne({ id: id });
}
 async function getMovies(filter) {
    return await client.db("movieDb").collection("movies").find(filter).toArray();
}

// Users Router Function
async function createUser(data) {
    console.log("inserted")
    return await client.db("movieDb").collection("users").insertOne(data);
}


async function getUserByusername(username) {
    return await client.db("movieDb").collection("users").findOne({ username:username });
}

export { getMovies, 
    getMovieById, 
    deleteMovieById, 
    addMovies, 
    updateMovie,
    createUser,
    getUserByusername 
};