const path = require('path');
const dbPath = path.resolve(__dirname, 'Satellites.db')

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err)  =>{
    if (err){
        return console.error(err.message);
    } 
    //throw console.log('connected successfully');
});

//let sql = 'SELECT * FROM SATELLITE LIMIT 10';
let sql = "SELECT type floor(Extract(year FROM launchdate)/10)*10 as decade Count(launchdate) FROM launch GROUP  BY type floor(Extract year FROM launchdate/10)*10 ORDER  BY floor(Extract(year FROM launchdate)/10)*10;"
//let sql = "SELECT type as ']', strftime('%Y', launchdate) as '[', Count(launchdate) FROM launch LIMIT 10 GROUP  BY type, launchdate ORDER  BY launchdate;"
db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row);
    });
});

  db.close();
