'use strict';

var db = require('../config/db');
var uuid = require('uuid');
var moment = require("moment");
var date = moment().format("MMM Do YY");



 db.run('CREATE TABLE IF NOT EXISTS messages (id text, text TEXT, handle TEXT, date TEXT)');


exports.findAll = function(cb) {

	db.all('SELECT * FROM messages', cb);

}

exports.create = function(message, cb) {
	db.serialize(function () {
		var stmt = db.prepare("INSERT INTO messages VALUES (?, ?, ?, ?)")
		stmt.run( uuid(), message.text, message.handle, moment().format("MMM Do YY"));
		stmt.finalize(cb); 	
	})
}

exports.findById = function(id, cb) {
	db.each("SELECT * FROM messages WHERE id = ?", id,
		cb)
}

exports.delete = function(id, cb) {
	db.run("DELETE FROM messages WHERE id = ?", id, cb)
}

exports.update = function(req, cb) {


	db.run("UPDATE messages SET text = ?, handle = ? WHERE id = ?", 

		[ req.body.text, req.body.handle, req.params.id ], 
		cb
		)

}






	// UPDATE
	// db.serialize(function () {
	// 	var stmt = db.prepare("UPDATE messages SET text = ?, handle = ? WHERE id = ?")
	// 	stmt.run( req.body.text, req.body.handle, req.params.id);
	// 	stmt.finalize(cb); 	
	// })
	
	// DELETE
	// db.serialize(function () {
	// 	var stmt = db.prepare("DELETE FROM messages WHERE id = ?")
	// 	stmt.run( id );
	// 	stmt.finalize(cb); 	
	// })



