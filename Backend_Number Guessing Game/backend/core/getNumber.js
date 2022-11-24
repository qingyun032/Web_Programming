import express from 'express';

const router = express.Router();
let number;

const getNumber = () => {
    return number;
};

const genNumber = () => {
    number = Date.now() % 100;
    router.put('/guess', (_, res) => {res.json({data: {number}})});
    console.log("ans " + number);
};

export {getNumber, genNumber};