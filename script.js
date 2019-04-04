var lettre = "coucou";
var btn;

//initialise une table de la taille de la fenêtre 
function initWindow(){
  var section = document.querySelector("#scriptab");
  section.innerHTML='';
  var window = document.createElement("table");
  window.innerHTML='';
  window.className="window";
  section.appendChild(window);
  btn = document.querySelector('.window');
}
initWindow();

//ajoute un post it aux coordonnées du double clic 
function addPostIt(event){
  console.log("x : "+ event.clientX+" y : "+ event.clientY);
  var element = document.querySelector(".window");
  //element.innerHTML = '';
  var table = document.createElement("table");
  table.innerHTML='';
  table.style.top = event.clientY + 'px';
  table.style.left = event.clientX + 'px';
  table.className="postIt";
  for(i = 0; i < 2; i++){
    var tr = document.createElement("tr");
    tr.innerHTML = '';
    table.appendChild(tr);
    var td = document.createElement("td");
    var textarea = document.createElement("textarea")
    table.appendChild(textarea);
    table.appendChild(td);
  }
  element.appendChild(table);        
}

function action(event){
  addPostIt(event);
}

btn.addEventListener('dblclick',action);


