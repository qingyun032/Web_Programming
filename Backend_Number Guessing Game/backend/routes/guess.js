import express from 'express';
import { genNumber, getNumber } from '../core/getNumber';

const router = express.Router();
router.post('/start', (_, res) => {
    genNumber();
    res.json({msg: 'The game has started.'});
})

router.get('/guess', (req, res) => {
    const ans = getNumber();
    const num = req.query.number;
    if(isNaN(num) === true)
        res.status(406).send({msg: 'Error: ' + num + ' is not a valid number (1 - 100)'});
    else if(num > 100 || num < 1)
        res.status(406).send({msg: 'Error: ' + num + ' is not a valid number (1 - 100)'});
    else if(num > ans)
        res.send({msg: 'Smaller'});
    else if(num < ans)
        res.send({msg: 'Bigger'});
    else if(num == ans)
        res.send({msg: 'Equal'}); 
})

router.post('/restart', (_, res) => {
    genNumber();
    res.json({msg: 'The game has started.'});
})

export default router;