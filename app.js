'use strict';

const PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var Message = require("./models/message");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// **** redirect to /messages 
app.get('/', (req, res) => {
  res.redirect('/api/messages');
});

// dont need this, ask cade later
// app.get('/messages', (req,res) => {
// 	// console.log("***********", res.messages);
//   // res.render('index', {messages: messages});
// });

// app.get("/messages/:id", (req, res) => {
// 	res.render("updated!!");
// })




app.use('/api', require('./routes/api'));

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
