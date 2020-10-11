var http = require('http'),
    fs = require('fs');

const path = require('path');
const dbPath = path.resolve(__dirname, 'Satellites.db');
const sqlite3 = require('sqlite3').verbose();


http.createServer(function(request, response) {
    var u = request.url;
    if(u.startsWith("/data")) {//Requesting database data
        
        let db = new sqlite3.Database(dbPath, (err) =>{
            if (err){
                return console.error(err.message);
            } else {
            }
        });
        
        let fields = u.split("/");
        let singular = fields[2];
        let plural = fields[3];
        let q = fields[4];
        
//        let sql = "SELECT (strftime('%Y', launchdate)/10)*10 as TYPE, (strftime('%Y', launchdate)/10)*10 as decade, Count((strftime('%Y', launchdate)/10)*10) as howMany FROM launch GROUP  BY decade ORDER  BY decade;"

        
        let sql = "SELECT type, (strftime('%Y', launchdate)/10)*10 as decade, Count(launchdate) as howMany FROM launch GROUP  BY type, launchdate ORDER  BY launchdate;"
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                response.writeHeader(404, {"Content-Type": "text/plain"});
                console.log(err)
                throw err;
            }

            response.writeHeader(200, {"Content-Type": "text/plain"});

            var dict = {};

            rows.forEach((row) => {
                let type = String(row["TYPE"]);
                let howMany = row["howMany"];
                let decade = row["decade"];

//                console.log(row);
                let arr = type.split("/");
                arr.forEach((t) => {
                    const k = [t, decade];
                    if(dict[k]) {
                        dict[k] = dict[k] + howMany
                    } else {
                        dict[k] = howMany
                    }
        //            console.log(t + " [" + howMany + "] " + decade);
                });
            });
            for (var key in dict) {
                value = dict[key];
                keys = key.split(",");
                response.write(keys[0] + " [" + value + "] " + keys[1] + "\n");
            }
            response.end();
        });

        db.close();
        
//        response.write("test");
        
        
    } else { //Regular old boring page request
        if (u == "/") {
            u = "/index.html";
        }
        u = "." + u;
//        console.log(u);
//        console.log(request.method);
        fs.readFile(u, function (err, dat) {
            if (err) {
                console.log(err);
            }
            contentType = "text/html";
            var s = u.split(".");
            var fileExtension = s[s.length - 1];
//            console.log(fileExtension);
            if(fileExtension == "js") {
                contentType = "application/javascript";
            } else if(fileExtension == "css") {
                contentType = "text/css";
            }
            response.writeHeader(200, {"Content-Type": contentType});
            response.write(dat);
            response.end();
        })
    }
}).listen(3000);
