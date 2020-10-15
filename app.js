var http = require('http'),
    fs = require('fs');

const path = require('path');
const dbPath = path.resolve(__dirname, 'Satellites.db');
const sqlite3 = require('sqlite3').verbose();


http.createServer(function(request, response) {
    
    var u = request.url;
    let sqlMap = {"decade" : "(strftime('%Y', launchdate)/10)*10", "weightClass" : "round(maxpayload/1000)*1000" };
    
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
        let minim = fields[5] || 0;
        
        let table = plural;
        
        if (table == "satellite") {
            
            if(singular == "type") {
                singular = "purpose";
            }
            
            if(q == "type"){
                q = "purpose";
            }
            
            if(q == "orbitclass"){
                table = "satellite s inner join orbit o on s.satapogee=o.apogee AND s.satperigee=o.perigee AND s.satinclination=o.inclination AND s.satperiod=o.period";
            }
            
        }else if(table == "launch" || table == "vehicle.vehiclename"){
            
            table = "launch inner join vehicle on launch.vehiclename=vehicle.vehiclename";
            
        }
        
        
        
        let sql = `SELECT distinct ${singular} as first, ${sqlMap[q] || q} as second, Count(${sqlMap[q] || q}) as howMany FROM ${table} GROUP BY ${singular}, ${sqlMap[q] || q} ORDER BY ${sqlMap[q] || q};`
        
        console.log(sql);
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                response.writeHeader(404, {"Content-Type": "text/plain"});
                console.log(err)
                throw err;
            }

            response.writeHeader(200, {"Content-Type": "text/plain"});

            var dict = {};

            var counter = 0;
            rows.forEach((row) => {
//                console.log(row);
                counter++;
                let first = String(row["first"]);
                let howMany = row["howMany"];
                let second = String(row["second"]);

                if(howMany >= minim) {
                    let arr = first.split("/");
                    arr.forEach((f) => {
                        let sArr = second.split("/");
                        sArr.forEach( (s) => {
                            
//                            if(s.includes("Inc")){
//                                console.log(row);
//                            }
                            
                            const k = f + ",,," + s;
                            if(dict[k]) {
                                dict[k] = dict[k] + howMany
                            } else {
                                dict[k] = howMany
                            }
                //            console.log(t + " [" + howMany + "] " + decade);
                        });
                    });
                }
            });
            for (var key in dict) {
                value = dict[key];
                keys = key.split(",,,");
//                console.log(keys[0] + " [" + value + "] " + keys[1] + "\n");
                response.write(keys[0] + " [" + value + "] " + keys[1] + "\n");
            }
            response.end();
//            console.log(counter);
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
