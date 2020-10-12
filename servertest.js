function testServer() {
	console.log('1');
}

function firstDropdownChanged() {
    let singularDropdown = document.getElementById("singular");
    let pluralDropdown = document.getElementById("plural");
    let qDropdown = document.getElementById("q");
    let goButton = document.getElementById("goButton");
    
    let singularSelected = singularDropdown.options[singularDropdown.selectedIndex].value;
    var values = ["base"];
    var texts = ["----"];
    
    if(singularSelected == "base") {
        pluralDropdown.disabled = true;
        
    }else{
        if(singularSelected == "type"){
            values.push("satellite");
            texts.push("satellites");
            
            values.push("launch");
            texts.push("launches");
            
//            values.push("vehicle");
//            texts.push("spaceships");
        }else if(singularSelected == "ownercountry"){
            values.push("satellite");
            texts.push("satellites");
            
            values.push("launch");
            texts.push("launches");
            
            values.push("vehicle");
            texts.push("spaceships");
        }else if(singularSelected == "companyname"){
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
    qDropdown.disabled = true;
    goButton.disabled = true;
//    console.log(pluralDropdown.options);
}

function secondDropdownChanged() {
    
    let singularDropdown = document.getElementById("singular");
    let singularSelected = singularDropdown.options[singularDropdown.selectedIndex].value;

    
    let pluralDropdown = document.getElementById("plural");
    let pluralSelected = pluralDropdown.options[pluralDropdown.selectedIndex].value;

    let qDropdown = document.getElementById("q");
    
    let goButton = document.getElementById("goButton");

    var values = ["base"];
    var texts = ["----"];
    
    if(pluralSelected == "base") {
        qDropdown.disabled = true;
    } else {
        
        //Add pertinent options
        if(pluralSelected == "satellite"){
            
//            values.push("decade");
//            texts.push("were launched in which decade");

            values.push("class");
            texts.push("are in which orbital class");
            
            values.push("type");
            texts.push("belong to which use case");
            
            //WAY too many companies
//            values.push("companyname");
//            texts.push("were launched by which company");
            
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
            
//            values.push("class");
//            texts.push("are in which orbital class");
            
            values.push("type");
            texts.push("belong to which use case");
            
            //WAY too many companies
//            values.push("companyname");
//            texts.push("were launched by which company");
            
            if(singularSelected != "companyname") {
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
            
//            values.push("class");
//            texts.push("are in which orbital class");
            
//            values.push("type");
//            texts.push("belong to which use case");
            
            if(singularSelected != "type"){
                
                //WAY too many companies
//                values.push("companyname");
//                texts.push("were launched by which company");
            
            
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
        
        goButton.disabled = true;
    }
    
}

function thirdDropdownChanged() {

    let qDropdown = document.getElementById("q");
    let qSelected = qDropdown.options[qDropdown.selectedIndex].value;

    let goButton = document.getElementById("goButton");
    
    if(qSelected == "base") {
        goButton.disabled = true;
    } else {
        goButton.disabled = false;
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
