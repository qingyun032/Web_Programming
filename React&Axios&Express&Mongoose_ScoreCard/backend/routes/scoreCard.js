import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();
router.delete("/cards", async (req, res) => {
    await ScoreCard.deleteMany({});
    res.send({message: "Database deleted"});
});

router.post("/card", async (req, res) => {
    const name = req.body.name;
    const subject = req.body.subject;
    const score = req.body.score;
    const existing = await ScoreCard.findOne({name: name, subject: subject});
    if(existing){
        existing.score = score;
        existing.save();
        res.send({message: `Updating (${name}, ${subject}, ${score})`, card: existing});
    }else{
        const newCard = new ScoreCard({name, subject, score});
        newCard.save();
        res.send({message: `Adding (${name}, ${subject}, ${score})`, card: newCard});
    }
});

router.get("/cards", async (req, res) => {
    const type = req.query.type;
    const queryString = req.query.queryString;
    let messages = [];
    if(type === 'name'){
        (await ScoreCard.find({name: queryString})).map((m) => {messages.push(`Found card with name: (${m.name}, ${m.subject}, ${m.score})`);});
        if(messages.length === 0)
            res.send({message: [`Name (${queryString}) not found!`]});
        else
            res.send({messages: messages});
    }else{
        (await ScoreCard.find({subject: queryString})).map((m) => {messages.push(`Found card with subject: (${m.name}, ${m.subject}, ${m.score})`);});;
        if(messages.length === 0)
            res.send({message: [`Subject (${queryString}) not found!`]});
        else
            res.send({messages: messages});
    }

});

export default router;
