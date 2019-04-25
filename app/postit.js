var btn;

//initialise une table de la taille de la fenêtre (moins un espace pour les options)
function initWindow(){
  var section = document.querySelector("#scriptab");
  section.innerHTML='';
  var window = document.createElement("table");
  window.innerHTML='';
  window.className="window";
  var opt = document.createElement("table");
  opt.innerHTML='';
  opt.className="opt";
  var addUser = document.createElement("tr");
  addUser.innerHTML=`<a href=\"/signup \"> sign up`;
  opt.appendChild
  opt.appendChild(addUser);
  section.appendChild(opt);
  section.appendChild(window);
  btn = document.querySelector('.window');
}
initWindow();

//ajoute un post it aux coordonnées du double clic 
function addPostIt(event){
  console.log("x : "+ event.clientX+" y : "+ event.clientY);
  var element = document.querySelector(".window");
  //a enlever si on veut affihcer plusieurs post-it
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
  alert("creation de post-it!:");
  addPostIt(event);
}



btn.addEventListener('dblclick',action);