let imagearray = ["images/gallery/tempsnip0.png",
    "images/gallery/tempsnip1.png",
    "images/gallery/tempsnip2.png",
    "images/gallery/tempsnip3.png",
    "images/gallery/tempsnip3,5.png",
    "images/gallery/tempsnip4.png",
    "images/gallery/tempsnip5.png",
    "images/gallery/tempsnip6.png",
    "images/gallery/tempsnip7.png",
    "images/gallery/tempsnip8.png",
    "images/gallery/tempsnip9.png",
    "images/gallery/tempsnip10.png",
    "images/gallery/tempsnip11.png"];

let textarray = ["Zunächst ist zu erwähnen dass ein Google Konto (https://support.google.com/accounts/answer/27441?hl=de , falls noch keins vorhanden ist) von Nöten ist, und auch nur Daten ab der Aktivierung der Standortverfolgung ausgelesen werden können.",
    "Schritt 1:<br>Zunächst muss die Standortverfolgung für den zu verwendenden Account aktiviert werden, falls dies noch nicht zuvor geschehen ist. <br> https://myaccount.google.com/activitycontrols",
    "Schritt 2:<br>Nun müssen Sie über Google Takeout (https://takeout.google.com) die Die Daten zur Standortverfolgung herunterladen, dazu müssen sie zunächst alle anderen Häkchen entfernen.",
    "Schritt 3:<br>Nur das Häkchen bei Standortverlauf setzen.",
    "Schritt 4:<br>Als Nächstes müssen Sie weiter unten auf der Seite zum nächsten Schritt gehen.",
    "Schritt 5:<br>Nun müssen Sie eine Übermittlungsmethode auswählen, wir empfehlen Drive und verwenden das auch weiter im Guide, aber es würde auch funktionieren, wenn sie eine Übermittlungsmethode ihrer Wahl verwenden. Sollten sie eine andere Übermittlungsmethode verwenden, so können Sie die Schritte 8 und 9 überspringen, müssen aber auf eigene Faust ihren Weg zum Herunterladen Suchen.",
    "Schritt 6:<br>Achten Sie nun darauf, dass Sie die Dateien ein mal Exportieren und Starten sie den Export. (Dies kann in Abhängigkeit der Menge an gespeicherten Standorten unterschiedlich lange dauern.)",
    "Schritt 7:<br>Bestätigen Sie nun Ihre Identität mit ihrem Google Account.",
    "Schritt 8:<br>Und Folgen Sie dem Link um auf Google Drive weiter geleitet zu werden.",
    "Schritt 9:<br>Laden sie die Dateien herunter.",
    "Schritt 10:<br>Bestätigen sie das Herunterladen, und öffnen sie die Dateien im Windows-Explorer",
    "Schritt 11:<br>Folgen sie den gezeigten Ordnern zu der/den gesuchten Datei/Dateien.",
    "Schritt 12:<br> Nun wählen Sie die Dateien die von Interesse sind (dieses Beispiel wurde am 21.03. erstellt, also ist hier nur der März von Interesse)"];

let currentPage = 0;
let pageSide = 1;

function print() {
    let background_gray = document.getElementById('helpGalerie');
    let page = document.getElementById('seitenzahl');

    background_gray.style.zIndex = '15';
    background_gray.style.height = '100%';

    let helpDescription = document.getElementById('helpPicturesDescription');
    let helpPicture = document.getElementById('helpPicture');

    helpDescription.innerHTML = textarray[currentPage];
    helpPicture.setAttribute('src', imagearray[currentPage])
    page.innerHTML = pageSide + "/13";
}

function next() {
    let helpDescription = document.getElementById('helpPicturesDescription');
    let helpPicture = document.getElementById('helpPicture');
    let page = document.getElementById('seitenzahl');

    if (currentPage <= 11){
        currentPage++;
        pageSide++;
    } else {
        currentPage = 0;
        pageSide = 1;
    }

    helpDescription.innerHTML = textarray[currentPage];
    helpPicture.setAttribute('src', imagearray[currentPage]);
    page.innerHTML = pageSide + "/13";
}

function previous() {
    let helpDescription = document.getElementById('helpPicturesDescription');
    let helpPicture = document.getElementById('helpPicture');
    let page = document.getElementById('seitenzahl');

    if (currentPage !== 0){
        currentPage--;
        pageSide--;
    } else {
        currentPage = 12;
        pageSide = 13;
    }
    helpDescription.innerHTML = textarray[currentPage];
    helpPicture.setAttribute('src', imagearray[currentPage]);
    page.innerHTML = pageSide + "/13";
}

function reset() {
    let background_gray = document.getElementById('helpGalerie');
    background_gray.style.zIndex = '-2';
    background_gray.style.height = '98%';
}