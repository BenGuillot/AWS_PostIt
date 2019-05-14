var btn;

//initialise une table de la taille de la fenêtre (moins un espace pour les options)
function initWindow(){
  var section = document.querySelector("#scriptab");
  //section.innerHTML='';
  var window = document.createElement("table");
  //window.innerHTML='';
  window.className="window";
  section.appendChild(window);
  btn = document.querySelector('.window');
}
initWindow();

//ajoute un post it aux coordonnées du double clic 
function addPostIt(event){
  console.log("x : "+ event.clientX+" y : "+ event.clientY);
  var element = document.querySelector("#templateAndOption");
  var form = document.createElement("form"); form.innerHTML=''; form.method="POST"; form.action="/ajouter";
  var data = document.createElement("input");
  data.innerHTML='';
  data.type = "text"; data.placeholder ="add a post it"; data.name="data";
  var date = document.createElement("input")
  date.innerHTML='';
  date.type = "date"; date.name="date";
  var px = document.createElement("input");
  px.innerHTML='';
  px.type = "text"; px.value=event.clientX; px.name="px";
  var py = document.createElement("input");
  py.innerHTML='';
  py.type = "text"; py.value=event.clientY; py.name="py";
  var butt = document.createElement("button");
  butt.innerHTML='';
  butt.type = "submit"; butt.value="send !";
         
  form.appendChild(data); form.appendChild(date); form.appendChild(px); form.appendChild(py); form.appendChild(butt);
  element.appendChild(form);        
}

function action(event){
  alert("creation de post-it!:");
  addPostIt(event);
}

btn.addEventListener('dblclick',action);