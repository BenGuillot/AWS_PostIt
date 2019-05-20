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

//récuppère la date courante;
function getDate(){
  let localdate = new Date();
  let month = localdate.getMonth()+1;
  let str = localdate.getFullYear()+"-"+month+"-"+localdate.getDate();
  console.log(str);
  return str;
}
//ajoute un post it aux coordonnées du double clic 
function addPostIt(event){
  let localdate = new Date();
  let str = getDate();
  console.log("x : "+ event.clientX+" y : "+ event.clientY);
  var element = document.querySelector(".templateAndOption");
  var span = document.createElement("div"); span.className="PostItForm";
  var form = document.createElement("form"); form.innerHTML=''; form.method="POST"; form.action="/ajouter";
  var table = document.createElement("table"); table.innerHTML='';
  var trData = document.createElement("tr"); trData.innerHTML='';
  var tdData = document.createElement("td"); tdData.innerHTML='';
  var trDate = document.createElement("tr"); trDate.innerHTML='';
  var tdDate = document.createElement("td"); tdDate.innerHTML='';
  var trpx = document.createElement("tr"); trpx.innerHTML='';
  var tdpx = document.createElement("td"); tdpx.innerHTML='';
  var trpy = document.createElement("tr"); trpy.innerHTML='';
  var tdpy = document.createElement("td"); tdpy.innerHTML='';
  var trbutt = document.createElement("tr"); trbutt.innerHTML='';
  var tdbutt = document.createElement("td"); tdbutt.innerHTML='';
  var data = document.createElement("input");
  data.innerHTML='';
  data.type = "text"; data.placeholder ="add a post it"; data.name="data";data.required="true";
  var date = document.createElement("input")
  date.innerHTML='';
  date.type = "hidden"; date.name="date"; date.value=str;
  var px = document.createElement("input");
  px.innerHTML='';
  px.type = "hidden"; px.value=event.clientX; px.name="px";
  var py = document.createElement("input");
  py.innerHTML='';
  py.type = "hidden"; py.value=event.clientY; py.name="py";
  var butt = document.createElement("button");
  butt.innerHTML='';
  butt.type = "submit"; butt.value="send !"; butt.textContent="Post it !";
  
  tdData.appendChild(data); tdDate.appendChild(date); tdpx.appendChild(px); tdpy.appendChild(py); tdbutt.appendChild(butt);
  trData.appendChild(tdData);trDate.appendChild(tdDate);trpx.appendChild(tdpx);trpy.appendChild(tdpy);trbutt.appendChild(tdbutt);
  table.appendChild(trData);table.appendChild(trDate);table.appendChild(trpx);table.appendChild(trpy);table.appendChild(trbutt);
  form.appendChild(table);
  span.appendChild(form);
  element.appendChild(span);        
}

function action(event){
  alert("creation de post-it!:");
  addPostIt(event);
}

btn.addEventListener('dblclick',action);


