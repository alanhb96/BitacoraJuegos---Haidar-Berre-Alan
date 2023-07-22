//RELOJ
function updateTime() {
    var currentTime = new Date();
  
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
  
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;
  
    var timeString = hours + ":" + minutes + ":" + seconds;
    document.getElementById("clock").innerHTML = timeString;
}

setInterval(updateTime, 1000);


//CREADOR DE TABLA
class TableRow{
    constructor(game, date, players,winner,points,comments){
        this.game = game
        this.date = date
        this.players = parseInt(players)
        this.winner = winner
        this.points = parseInt(points)
        this.comments = comments
    }
}

//CREADOR DE TABLA DESDE EL LOCALSTORAGE
function tableFromLocalStorageArray(localStorageKey) {
  const myArray = JSON.parse(localStorage.getItem(localStorageKey));
  const tableBody = document.querySelector('#table tbody');

  if (!Array.isArray(myArray)) {
    console.error('Invalid array in localStorage');
    return;
  }

  tableBody.innerHTML = '';

  myArray.forEach(item => {
    const newRow = document.createElement('tr');

    for (const propertyName in item) {
      if (item.hasOwnProperty(propertyName)) {
        const cell = document.createElement('td');
        cell.textContent = item[propertyName];
        newRow.appendChild(cell);
      }
    }

    tableBody.appendChild(newRow);
  });
}

tableFromLocalStorageArray('table')

const tableArray = []
let sectionTable = document.getElementById('table')
let myForm = document.getElementById('form')

//SUBMIT DEL FORMULARIO PARA CREAR Y STOREAR DATOS
myForm.onsubmit= (evt) => {
    evt.preventDefault()
    let form = evt.target

    let game = form.elements[0].value;
    let date = form.elements[1].value;
    let players = form.elements[2].value;
    let winner = form.elements[3].value;
    let points = form.elements[4].value;
    let comments = form.elements[5].value;

    tableArray.push(new TableRow (game,date,players,winner,points,comments))

    const tableRow = document.createElement('tr') 
    tableRow.classList.add('tableRow')

    for (let i = 0; i < form.elements.length - 1; i++) {
        const tableCell = document.createElement('td');
        tableCell.classList.add('cell');
        tableCell.innerHTML = form.elements[i].value;
        tableRow.appendChild(tableCell);
      }
      
    localStorage.setItem('table',JSON.stringify(tableArray))
    sectionTable.appendChild(tableRow)
}
