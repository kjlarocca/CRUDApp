const { response } = require("express")
const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "docker",
    host: "localhost",
    port: 5432
})


pool.query("CREATE DATABASE animalcreator;").then((Response) => {
    console.log("Database Created")
    console.log(response)
})
.catch((err) => {
    console.log(err);
});

module.exports = pool