let uploadBtn = document.querySelector(`#uploadBtn`);
let config = {
  delimiter: ',',
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: function(results) {
    console.log(results);
  }
};

request = new XMLHttpRequest();
request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    Papa.parse(request.response, config);
  }
};
request.open("GET", '../data/hs.csv', true);
request.send();
