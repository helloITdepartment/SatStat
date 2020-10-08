function testServer() {
	console.log('1');
}

function requestData() {
    let singularDropdown = document.getElementById("singular");
    let singularSelected = singularDropdown.options[singularDropdown.selectedIndex].value;
    
    let pluralDropdown = document.getElementById("plural");
    let pluralSelected = pluralDropdown.options[pluralDropdown.selectedIndex].value;
    
    let qDropdown = document.getElementById("q");
    let qSelected = qDropdown.options[qDropdown.selectedIndex].value;
    
    console.log(singularSelected);
    console.log(pluralSelected);
    console.log(qSelected);
    
    const Http = new XMLHttpRequest();
    const url=`data/${singularSelected}/${pluralSelected}/${qSelected}`;
    console.log(url);
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200) {
//            console.log(Http.responseText);
            process_sankey(Http.responseText);
        }
    }
}
//console.log("1");
//const path = require('path');
//const dbPath = path.resolve(__dirname, 'Satellites.db');
//
//const sqlite3 = require('sqlite3').verbose();
//let db = new sqlite3.Database(dbPath, (err) =>{
//	if (err){
//		return console.error(err.message);
//    } else {
//    }
//});
//
//
//let sql = "SELECT type, (strftime('%Y', launchdate)/10)*10 as decade, Count(launchdate) as howMany FROM launch GROUP  BY type, launchdate ORDER  BY launchdate;"
//
//db.all(sql, [], (err, rows) => {
//    if (err) {
//        throw err;
//    }
//
//    var dict = {};
//
//    rows.forEach((row) => {
//        let type = row["TYPE"];
//        let howMany = row["howMany"];
//        let decade = row["decade"];
//
//        let arr = type.split("/");
//        arr.forEach((t) => {
//            const k = [t, decade];
//            if(dict[k]) {
//                dict[k] = dict[k] + howMany
//            } else {
//                dict[k] = howMany
//            }
////            console.log(t + " [" + howMany + "] " + decade);
//        });
//    });
//    for (var key in dict) {
//        value = dict[key];
//        keys = key.split(",");
//        console.log(keys[0] + " [" + value + "] " + keys[1]);
//    }
//});
//
//db.close();

