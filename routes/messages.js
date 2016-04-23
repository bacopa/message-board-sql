"use strict";

var express = require("express");
var router = express.Router();


var Message = require("../models/message")


router.get("/", (req, res) => {
	Message.findAll(function (err, messages){
		if(err)return res.status(400).send(err);
		res.render('index', { messages: messages });
	});	
});


router.post("/", (req, res) => {
	console.log("line 20 from routes")
	Message.create(req.body, err => {
		if(err) return res.status(400).send(err);

		Message.findAll(function (err, messages){
			if(err)return res.status(400).send(err);
			res.render('index', { messages: messages });
		});
		//why can't i save this function to a variable?
		// retrieve();	
	});
});

// does the uri need the :id? --> yes it does!
router.get("/:id", (req, res) => {
	Message.findById(req.params.id, (err, message) => {
		if(err) return res.status(400).send(err);
		res.send(message);
	});
});

router.delete("/:id", (req, res) => {
	Message.delete(req.params.id, err => {
		if(err) return res.status(400).send(err);
		res.send(err);
	})
})

router.put("/:id", (req, res) => {
	Message.update(req, err => {
		if(err){
			return res.status(400).send(err);
		}		
		res.send(err);
	})
})

module.exports = router;















