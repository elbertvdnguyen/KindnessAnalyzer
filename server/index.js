const express = require('express')
const app = express()
const port = 3000

const nlp = require('./moodService.js');

var bodyparser = require('body-parser');

app.use(bodyparser.json())

app.get('/', (req,res) => {
	res.send("hello world!");
});


app.post('/analyze', async (req,res) => {
	if (!req.body.text) {
		res.send("ERROR! MALFORMED REQUEST");
		return;
	}
	console.log(req);
	console.log(req.body);
	let input = req.body.text;
	try {
	let myScore = await nlp.analysis(input);
	res.json({score: myScore});
		return;
	}
	catch (exception) {
		res.send(exception);
		return;
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});
