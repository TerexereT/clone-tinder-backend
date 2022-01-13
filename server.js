import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import cards from './dbCards.js';

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
	'mongodb+srv://armando:armando13@cluster0.ys54f.mongodb.net/tinderdb?retryWrites=true&w=majority';

// Middlewares
app.use(express.json());
app.use(cors());

// DB Config
mongoose.connect(connection_url);

// API Endpoints
app.get('/', (req, res) => {
	res.status(200).send('hola mundo');
});

app.post('/tinder/card', (req, res) => {
	const dbCard = req.body;
	cards.create(dbCard, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.get('/tinder/card', (req, res) => {
	cards.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

// Listener
app.listen(port, () => console.log(`escuchando en localhost:${port}`));
