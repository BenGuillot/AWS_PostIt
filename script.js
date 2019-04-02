
var postit = Array(2);
for(var i = 0; i < 2; i++){
	postit[i] = 0;
}

function affichePostIt(){
  var element = document.querySelector("#scriptab");
  element.innerHTML = '';
  var table = document.createElement("table");
  table.innerHTML = '';
  for(i = 0; i < 2; i++){
    var tr = document.createElement("tr");
    tr.innerHTML = '';
    table.appendChild(tr);
    var td = document.createElement("td");
    table.appendChild(td);
  }
  element.appendChild(table);             // Append <button> to <body
}

affichePostIt();
console.log(post-it);