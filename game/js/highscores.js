// variables -------------------------------------------------------------------
let table = document.querySelector('#highscores');

// function to save the highscore ----------------------------------------------
saveHighBtn.addEventListener('click', function() {
  if (saveInput.value == '') {
    alert('Enter a nickname');
  } else {
    let now = new Date(Date.now());
    let nick = saveInput.value;
    saveInput.value = '';
    let date = `${now.getFullYear()}-${now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)}-${now.getDate()}`;
    let time = `${now.getUTCHours() < 9 ? '0' + now.getUTCHours() : now.getUTCHours()}:${now.getUTCMinutes() < 9 ? '0' + now.getUTCMinutes() : now.getUTCMinutes()}`;
    let obj = {
      nickname: nick,
      date: date,
      time: time,
      score: SCORE
    };
    // let request = new XMLHttpRequest();
    // request.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //     console.log(request.response);
    //   }
    // };
    // request.open("POST", '/append.php?data=1,2,3,4', true);
    // request.setRequestHeader("Access-Control-Allow-Origin", "*");
    // request.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // request.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
    // request.send();

    $.ajax({
      data: 'data=' + JSON.stringify(obj),
      url: 'append.php',
      method: 'POST', // or GET
      success: function(msg) {
        alert(msg);
      }
    });


    //console.log(Papa.unparse({data: [nick, SCORE, date, time]}));


  }
});

// function to process the results from .csv -----------------------------------
let completeFn = function(results) {
  let data = results.data;
  data.sort(function(a, b) {
    return b.score - a.score;
  });
  let innerHTML = `
    <tr>
      <td>Nickname</td>
      <td>Score</td>
      <td>Date</td>
      <td>Time</td>
    </tr>`;
  for (let i = 0; i < data.length; i++) {
    innerHTML += `
      <tr>
        <td>${data[i].nickname}</td>
        <td>${data[i].score}</td>
        <td>${data[i].date}</td>
        <td>${data[i].time}</td>
      </tr>`;
  }
  table.innerHTML = innerHTML;
}

// the config object for csv parsing -------------------------------------------
let config = {
  delimiter: ',',
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: completeFn
};

// making the xhr request ------------------------------------------------------
let request = new XMLHttpRequest();
request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    Papa.parse(request.response, config);
  }
};
request.open("GET", '/data/hs.csv', true);
request.send();
