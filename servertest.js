function testServer() {
	console.log('1');
}

function firstDropdownChanged() {
    let singularDropdown = document.getElementById("singular");
    let pluralDropdown = document.getElementById("plural");
    let qDropdown = document.getElementById("q");
    
    let singularSelected = singularDropdown.options[singularDropdown.selectedIndex].value;
    var values = ["base"];
    var texts = ["----"];
    
    if(singularSelected == "base") {
        pluralDropdown.disabled = true;
        qDropdown.disabled = true;
    }else{
        if(singularSelected == "type"){
            values.push("satellite");
            texts.push("satellites");
            
            values.push("launch");
            texts.push("launches");
            
//            values.push("vehicle");
//            texts.push("spaceships");
        }else if(singularSelected == "country"){
            values.push("satellite");
            texts.push("satellites");
            
            values.push("launch");
            texts.push("launches");
            
            values.push("vehicle");
            texts.push("spaceships");
        }else if(singularSelected == "company"){
            values.push("satellite");
            texts.push("satellites");
            
            values.push("launch");
            texts.push("launches");
            
            values.push("vehicle");
            texts.push("spaceships");
        }
        
        pluralDropdown.innerHTML = "";
        var i;
        for(i = 0; i < values.length; i++) {
            var opt = document.createElement("option");
            opt.value = values[i];
            opt.text = texts[i];
            pluralDropdown.options[i] = opt;
        }

        pluralDropdown.disabled = false;
    }
//    console.log(pluralDropdown.options);
}

function secondDropdownChanged() {
    
    let singularDropdown = document.getElementById("singular");
    let singularSelected = singularDropdown.options[singularDropdown.selectedIndex].value;

    
    let pluralDropdown = document.getElementById("plural");
    let pluralSelected = pluralDropdown.options[pluralDropdown.selectedIndex].value;

    let qDropdown = document.getElementById("q");
    
    var values = ["base"];
    var texts = ["----"];
    
    if(pluralSelected == "base") {
        qDropdown.disabled = true;
        
    } else {
        
        //Add pertinent options
        if(pluralSelected == "satellite"){
            
//            values.push("decade");
//            texts.push("were launched in which decade");

            values.push("orbitClass");
            texts.push("are in which orbital class");
            
            values.push("type");
            texts.push("belong to which use case");
            
            values.push("company");
            texts.push("were launched by which company");
            
//            values.push("ship");
//            texts.push("were launched on which ship");
            
//            values.push("weightClass");
//            texts.push("were in which weight class");
            
//            values.push("numLaunches");
//            texts.push("were launched how many times");
            
//            values.push("whichSite");
//            texts.push("were launched from which site");
            
        }else if(pluralSelected == "launch"){
            
            values.push("decade");
            texts.push("were launched in which decade");
            
//            values.push("orbitClass");
//            texts.push("are in which orbital class");
            
            values.push("type");
            texts.push("belong to which use case");
            
            values.push("company");
            texts.push("were launched by which company");
            
            if(singularSelected != "company") {
                values.push("ship");
                texts.push("were launched on which ship");
            }
            
            values.push("weightClass");
            texts.push("were in which weight class");
            
//            values.push("numLaunches");
//            texts.push("were launched how many times");
            
            values.push("whichSite");
            texts.push("were launched from which site");
            
        }else if(pluralSelected == "vehicle"){
            
            values.push("decade");
            texts.push("were launched in which decade");
            
//            values.push("orbitClass");
//            texts.push("are in which orbital class");
            
//            values.push("type");
//            texts.push("belong to which use case");
            
            if(singularSelected != "type"){
                values.push("company");
                texts.push("were launched by which company");
            
            
//            values.push("ship");
//            texts.push("were launched on which ship");
            
                values.push("weightClass");
                texts.push("were in which weight class");
            
                values.push("numLaunches");
                texts.push("were launched how many times");
            
                values.push("whichSite");
                texts.push("were launched from which site");
            }
        
        }
        
        
        qDropdown.innerHTML = "";
        
        var i;
        for(i = 0; i < values.length; i++) {
            var opt = document.createElement("option");
            opt.value = values[i];
            opt.text = texts[i];
            qDropdown.options[i] = opt;
        }

        qDropdown.disabled = false;
    }
    
    
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
    if(singularSelected == qSelected) {
        add_message(`errormessage`, `Asking how many of which ${singularSelected}'s anything map to which ${qSelected} is a bit redundant no?`, false);
        return
    }
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

