import express from 'express';
import signin from "./controllers/signin.js";
import register from "./controllers/register.js";
import profile from "./controllers/profile.js";
import {handleApiCall, handleImage} from "./controllers/image.js";
//const bodyParser = require('body-parser');
import cors from "cors";
import knex from "knex";

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'osdasa27',
        database: 'smart-brain'
    }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('success')
});
app.post('/signin', signin(db));
app.post('/register', (req, res) => register(req, res, db));
app.get('/profile/:id', (req, res) => {
    profile(req, res, db)
});
app.put('/image', (req, res) => {
    handleImage(req, res, db)
})
app.post('/imageurl', (req, res) => {
    handleApiCall(req, res)
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
 */