import express from 'express';
import cors from 'cors';
import db from './db';
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import routes from '../routes/index'; 

const app = express();

// init middleware
app.use(cors());
app.use(express.json());

// define routes
app.use('/', routes);

// define server
const port = process.env.PORT || 4000;
app.listen(port, () => {console.log(`Server is up on port ${port}.`)});

db.connect();
/*
const saveUser = async (id, name) => {
    const existing = await User.findOne({name});
    if(existing) throw new Error(`data ${name} exists!`);
    try{
        const newUser = new User({id, name});
        console.log("Created user ", newUser);
        return newUser.save();
    } catch(e) {throw new Error("User creation error: " + e);}
};

const deleteDB = async () => {
    try{
        await User.deleteMany({});
        console.log("Database deleted");
    } catch(e) {throw new Error("Database deletion failed");}
};

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
    await deleteDB();
});
*/