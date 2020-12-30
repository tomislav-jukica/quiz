let brojPitanja = 1;
let oznacenaPitanja = {
    prvo: 0,
    drugo: 0,
    trece: 0,
    cetvrto: 0
};


//Start
dodajOdgovore();
generiraj();
$(".previous").hide();
$(".rezultat").hide();

//PITANJA
function next() {
    $(".previous").show();
    console.log($(".previous"));
    sakrijSlajd();
    brojPitanja++;

    showSlajd($($(".container").children()[1+brojPitanja]))    
    $(".pitanje.selected").removeClass("selected");
    $(".pitanje:nth-child("+brojPitanja+")").addClass("selected");
    if(brojPitanja === 4) {
        $(".dalje").hide();
        $(".rezultat").show();
    }
    provjeriPitanja();
}

function nazad() {
    $(".dalje").show();
    $(".rezultat").hide();

    sakrijSlajd();
    brojPitanja--;

    showSlajd($($(".container").children()[1+brojPitanja]))    
    $(".pitanje.selected").removeClass("selected");
    $(".pitanje:nth-child("+brojPitanja+")").addClass("selected");
    if(brojPitanja === 1) {
        $(".previous").hide();
    }
    provjeriPitanja();
}

$(".pitanje").click(function() {
    sakrijSlajd();
    brojPitanja = Number(this.innerHTML);
    console.log("Broj pitanja: " + brojPitanja);

    showSlajd($($(".container").children()[1 + Number(brojPitanja)]));
    $(".pitanje.selected").removeClass("selected");
    $(".pitanje:nth-child("+brojPitanja+")").addClass("selected");

    if(brojPitanja !== 4) {
        $(".dalje").show();  
        $(".rezultat").hide();      
    } else {
        $(".dalje").hide();
        $(".rezultat").show();
    }
    if(brojPitanja !== 1) {
        $(".previous").show();
    } else {
        $(".previous").hide();
    }
    provjeriPitanja();
})

//ODGOVORI
function generiraj() {
    for(let i = 0; i<4; i++) {
        let brojOdgovora = Math.round(Math.random() * (8 - 2) + 2);
        for(let i = 0; i < brojOdgovora; i++) {        
            let odgovor = $('<button></button>').addClass('odgovor').text(i+1);      
            $($(".container").children()[1+brojPitanja]).append(odgovor);
        }
        brojPitanja++;
        sakrijSlajd();
    }
    brojPitanja = 1;
    showSlajd($($(".container").children()[1+brojPitanja]))    
}




$(".dalje").click(function() {
    next();
});
$(".previous").click(function() {
    nazad();
});

$(".odgovor").click(function() {    
    if($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        ukloniOznaku();
    } else {

        if(provjeriBrojOznaka()) {
            $(this).addClass("selected");
            dodajOznaku();
        }        
    }    
    provjeriPitanja();
});



//Pomocne 
function sakrijSlajd() {
    $(".odgovori").hide();
}

function showSlajd(elem) {
    $(elem).show();
}

function dodajOznaku() {
    if(provjeriBrojOznaka()) {
        switch(brojPitanja) {
            case 1:
                oznacenaPitanja.prvo++;
                break;
            case 2:
                oznacenaPitanja.drugo++;
                break;
            case 3:
                oznacenaPitanja.trece++;
                break;
            case 4:
                oznacenaPitanja.cetvrto++;
                break;
        }
    } 
    spremiOdgovore();   
}

function ukloniOznaku() {
    switch(brojPitanja) {
        case 1:
            oznacenaPitanja.prvo--;
            break;
        case 2:
            oznacenaPitanja.drugo--;
            break;
        case 3:
            oznacenaPitanja.trece--;
            break;
        case 4:
            oznacenaPitanja.cetvrto--;
            break;
    }
    spremiOdgovore();
}

function provjeriBrojOznaka() {
    
    switch(brojPitanja) {
        case 1:
            if(oznacenaPitanja.prvo >= brojPitanja + 2) {
                showError();
                return false;
            }
            return true;
        case 2:
            if(oznacenaPitanja.drugo >= brojPitanja + 2) {
                showError();
                return false;
            }
            return true;
        case 3:
            if(oznacenaPitanja.trece >= brojPitanja + 2) {
                showError();
                return false;
            }
            return true;
        case 4:
            if(oznacenaPitanja.cetvrto >= brojPitanja + 2) {
                showError();
                return false;
            }
            return true;
    }
}

function spremiOdgovore() {
    switch(brojPitanja) {
        case 1:
            if(oznacenaPitanja.prvo > 0) {
                $(".pitanje:nth-child("+brojPitanja+")").addClass("spremljeniOdgovori");
            } else {
                $(".pitanje:nth-child("+brojPitanja+")").removeClass("spremljeniOdgovori");
            }
            break;
        case 2:
            if(oznacenaPitanja.drugo > 0) {
                $(".pitanje:nth-child("+brojPitanja+")").addClass("spremljeniOdgovori");
            } else {
                $(".pitanje:nth-child("+brojPitanja+")").removeClass("spremljeniOdgovori");
            }
            break;
        case 3:
            if(oznacenaPitanja.trece > 0) {
                $(".pitanje:nth-child("+brojPitanja+")").addClass("spremljeniOdgovori");
            } else {
                $(".pitanje:nth-child("+brojPitanja+")").removeClass("spremljeniOdgovori");
            }
            break;
        case 4:
            if(oznacenaPitanja.cetvrto > 0) {
                $(".pitanje:nth-child("+brojPitanja+")").addClass("spremljeniOdgovori");
            } else {
                $(".pitanje:nth-child("+brojPitanja+")").removeClass("spremljeniOdgovori");
            }
            break;
    }
}

function dodajOdgovore() {
    for(let i = 0; i<4; i++) {
        let odgovori = $('<div></div>').addClass('odgovori');
        $(".container").append(odgovori);    
    }
    
}

function showError() {
    document.getElementById('error').innerHTML='Ne možete označiti više odgovora!'; 
    
    setTimeout(function() {$("#error").addClass("fade-out");},0);
    setTimeout(function() {document.getElementById('error').innerHTML='';},5000);
    $("#error").removeClass("fade-out");
}

function provjeriPitanja() {
    let p = oznacenaPitanja;
    if(p.prvo <= 0 || p.drugo <= 0 || p.trece <= 0 || p.cetvrto <=0) {
        $(".rezultat").prop("disabled",true);
    } else {
        $(".rezultat").prop("disabled",false);
    }
}
