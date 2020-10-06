/*function testServer() {
	console.log('1');
}*/

/*const path = require('path');
const dbPath = path.resolve(__dirname, 'Satellites.db');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(dbPath, (err) =>{
	if (err){
		return console.error(err.message);
	}
});*/

console.log('2');

/*var db = openDatabase('Satellites', '1.0', 'SatStat', 1000000);
db.transaction(function (tx) {
	console.log('3');
	tx.executeSql('CREATE TABLE test(name varchar(255))', [], function (tx, results) {
		console.log('5');
		console.log(results);
	}, function (tx, error) {
		console.log('7');
		console.log(error);
	});
	tx.executeSql('SELECT * FROM test', [], function (tx, results) {
		console.log('8');
		console.log(results);
	}, function (tx, error) {
		console.log('9');
		console.log(error);
	});
	console.log('4');
});
console.log('6');
console.log(db);*/

function createDB() {
	db = openDatabase('Satellites', '1.0', 'SatStat', 1000000);
	db.transaction(function (tx) {
	tx.executeSql('DROP TABLE *;', [], function (tx, results) {
		console.log('12');
		console.log(results);
	}, function (tx, error) {
		console.log('13');
		console.log(error);
	});
	
	console.log('3');
	tx.executeSql('CREATE TABLE OWNER ( country VARCHAR2(50) NOT NULL, companyname VARCHAR2(50) NOT NULL, classification VARCHAR2(50) );', [], function (tx, results) {
		console.log('5');
		console.log(results);
	}, function (tx, error) {
		console.log('7');
		console.log(error);
	});
	tx.executeSql("INSERT INTO OWNER VALUES('USA','Hera Systems','Commercial');", [], function (tx, results) {
		console.log('8');
		console.log(results);
	}, function (tx, error) {
		console.log('9');
		console.log(error);
	});
	tx.executeSql("SELECT * FROM OWNER;", [], function (tx, results) {
		console.log('10');
		console.log(results);
	}, function (tx, error) {
		console.log('11');
		console.log(error);
	});
	console.log('4');
	console.log(db);
});
}

//createDB();