function verschluessel() {
    var walzeR = document.getElementById("walze1").value -1;
    var walzeM = document.getElementById("walze2").value -1;
    var walzeL = document.getElementById("walze3").value -1;
    if (walzeR == walzeM || walzeR == walzeL || walzeM == walzeL) {
        window.alert("Die Walzen muessen verschieden sein!");
        return;
    }
    var grundR = document.getElementById("initial1").value.toUpperCase();
    var grundM = document.getElementById("initial2").value.toUpperCase();
    var grundL = document.getElementById("initial3").value.toUpperCase();
    
    var ringR = document.getElementById("ring1").value -1;
    var ringM = document.getElementById("ring2").value -1;
    var ringL = document.getElementById("ring3").value -1;

    const stecker = new Map();
    for (i = 1; i < 14; i++) {
        var gesteckt = document.getElementById("stecker"+i).value.toUpperCase();
        if (gesteckt != "") {
            stecker.set(gesteckt.charAt(0), gesteckt.charAt(1));
            stecker.set(gesteckt.charAt(1), gesteckt.charAt(0));
        }
    }

    const verdrahtung   = ["EKMFLGDQVZNTOWYHXUSPAIBRCJ","AJDKSIRUXBLHWTMCQGZNPYFVOE","BDFHJLCPRTXVZNYEIWGAKMUSQO","ESOVPZJAYQUIRHXLNFTGKDCMWB",
                           "VZBRGITYUPSDNHLXAWMJQOFECK","JPGVOUMFYQBENHZRDKASXLICTW","NZJHGRCXMYSWBOUFAIVLPEKQDT","FKQHTLXOCBJSPDZRAMEWNIUYGV"];
    const kontakte      = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ","ABCDEFGHIJKLMNOPQRSTUVWXYZ","ABCDEFGHIJKLMNOPQRSTUVWXYZ","ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                           "ABCDEFGHIJKLMNOPQRSTUVWXYZ","ABCDEFGHIJKLMNOPQRSTUVWXYZ","ABCDEFGHIJKLMNOPQRSTUVWXYZ","ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    const dpunkte       = ["R","F","W","K","A","A","A","A"];
    const dpunkte2      = ["", "", "", "", "", "N","N","N"];
    const ukw           = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

    drehe(kontakte, verdrahtung, walzeR, alphabetPos(grundR) + 26-ringR);
    drehe(kontakte, verdrahtung, walzeM, alphabetPos(grundM) + 26-ringM);
    drehe(kontakte, verdrahtung, walzeL, alphabetPos(grundL) + 26-ringL);
    dreheRing(dpunkte, dpunkte2, walzeR, ringR);
    dreheRing(dpunkte, dpunkte2, walzeM, ringM);

    var eingabe =  document.getElementById("input").value.toUpperCase().replaceAll(" ", "");
    var ausgabe = "";
    var zeichen;
    while(eingabe != "") {
        zeichen = steck(eingabe.charAt(0), stecker);
        eingabe = eingabe.slice(1);
        
        drehe(kontakte, verdrahtung, walzeR, 1);
        if(kontakte[walzeR].charAt(0) == dpunkte[walzeR] || kontakte[walzeR].charAt(0) == dpunkte2[walzeR]) {
            drehe(kontakte, verdrahtung, walzeM, 1);
            if(kontakte[walzeM].charAt(0) == dpunkte[walzeM] || kontakte[walzeM].charAt(0) == dpunkte2[walzeM]) drehe(kontakte, verdrahtung, walzeL, 1);
        }

        zeichen = verdrahtung[walzeR].charAt(alphabetPos(zeichen));                                
        zeichen = verdrahtung[walzeM].charAt(kontakte[walzeR].indexOf(zeichen));                   
        zeichen = verdrahtung[walzeL].charAt(kontakte[walzeM].indexOf(zeichen));                   
        zeichen = ukw.charAt(kontakte[walzeL].indexOf(zeichen));                              
        zeichen = kontakte[walzeL].charAt(alphabetPos(zeichen));                              
        zeichen = kontakte[walzeM].charAt(verdrahtung[walzeL].indexOf(zeichen));                   
        zeichen = kontakte[walzeR].charAt(verdrahtung[walzeM].indexOf(zeichen));                   
        zeichen = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(verdrahtung[walzeR].indexOf(zeichen));       
        
        ausgabe += steck(zeichen, stecker);
        if (ausgabe.replaceAll(" ","").length % 5 == 0) ausgabe += " ";  
    }

    document.getElementById("output").innerHTML = ausgabe;
}

function drehe(kontakte, walzen, index, drehungen) {
    for (i = 0; i < drehungen; i++) {
        kontakte[index] = kontakte[index].slice(1) + kontakte[index].charAt(0);
        walzen[index]   = walzen[index].slice(1) + walzen[index].charAt(0);
    }
}

function dreheRing(dp, dp2, index, drehungen) {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (i = 0; i < drehungen; i++) {
        dp[index] = alphabet.charAt((alphabet.indexOf(dp[index])-1) % 26);
        if (dp2[index] != "")
            dp2[index] = alphabet.charAt((alphabet.indexOf(dp2[index])-1) % 26);
    }
}

function steck(zeichen, stecker) {
    if (stecker.has(zeichen)) return stecker.get(zeichen); 
    else return zeichen;
}

function alphabetPos(letter) {
    return (letter.charCodeAt(0)-65);
}