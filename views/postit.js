/////////////////////////////////////////////////CREATE A NEW POST-IT///////////////////////////////////////////////////////////////////////////
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

//ajoute un post-it aux coordonnées du double clic 
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
  var data = document.createElement("input"); data.innerHTML='';
  data.type = "text"; data.placeholder ="Ajouter un nouveau post-it"; data.name="data";data.required="true";
  var date = document.createElement("input"); date.innerHTML='';
  date.type = "hidden"; date.name="date"; date.value=str;
  var px = document.createElement("input"); px.innerHTML='';
  px.type = "hidden"; px.value=event.clientX; px.name="px";
  var py = document.createElement("input"); py.innerHTML='';
  py.type = "hidden"; py.value=event.clientY; py.name="py";
  
  var trpriv = document.createElement("tr"); trpriv.innerHTML='';
  var tdpriv = document.createElement("td"); tdpriv.innerHTML='';
  var trpub = document.createElement("tr"); trpub.innerHTML='';
  var tdpub = document.createElement("td"); tdpub.innerHTML='';
  
  var priv = document.createElement("input"); priv.innerHTML='';
  priv.type = "radio"; priv.name="protect"; priv.value="prive"; 
  var pub = document.createElement("input"); priv.innerHTML='';
  pub.type = "radio"; pub.name="protect"; pub.value="public"; 
  
  var labpriv = document.createElement("label"); labpriv.innerHTML=''; labpriv.for="prive"; labpriv.textContent="privée";
  var labpub = document.createElement("label"); labpub.innerHTML=''; labpub.for="public"; labpub.textContent="public";
  
  var butt = document.createElement("input"); butt.innerHTML='';
  butt.type = "submit"; butt.value="Poster !"; butt.textContent="Post it !";
  
  tdData.appendChild(data); tdDate.appendChild(date); tdpx.appendChild(px); tdpy.appendChild(py);
  tdbutt.appendChild(butt); tdpriv.appendChild(priv); tdpriv.appendChild(labpriv); tdpub.appendChild(pub); tdpub.appendChild(labpub);
  
  trData.appendChild(tdData);trDate.appendChild(tdDate);trpx.appendChild(tdpx);trpy.appendChild(tdpy);trbutt.appendChild(tdbutt);
  trpriv.appendChild(tdpriv); trpub.appendChild(tdpub);
  table.appendChild(trData);table.appendChild(trDate);table.appendChild(trpx);table.appendChild(trpy);table.appendChild(trbutt); table.appendChild(trpriv); table.appendChild(trpub);
  form.appendChild(table);
  span.appendChild(form);
  element.appendChild(span);        
}

function action(event){
  alert("creation de post-it!:");
  addPostIt(event);
}
btn.addEventListener('dbclick',action);
////////////////////////////////////////////////ZOOM SUR LE POST-IT (ne fonctionne pas)////////////////////////////////////////////////////////
let scale = 1;
const el = document.querySelector('#scriptab');
function zoom(event) {
  event.preventDefault();

  scale += event.deltaY * -0.001;

  // Restrict scale
  scale = Math.min(Math.max(.125, scale), 4);

  // Apply scale transform
  el.style.transform = `scale(${scale})`;
}

el.addEventListener('wheel', zoom);
////////////////////////////////////////////////SUPPRESSION D'UN POST-IT///////////////////////////////////////////////////////////////////////
function supp(data){
    let m = document.querySelector('#del'+data);
    let c = confirm("certain ? t'es vraiment sûr ? REALLY ??");
    if(c == true){
      var button = document.createElement("input");
      button.innerHTML='';
      button.type = "submit"; button.value="bye little one"; button.textContent="Supprimer";
      m.appendChild(button);
    }
}
////////////////////////////////////////////////MODIFICATION D'UN POST-IT///////////////////////////////////////////////////////////////////////
function modif(data){
  console.log(data);
  let m = document.querySelector('#up'+data);
  var input = document.createElement("input"); input.innerHTML = '';
  input.type="text"; input.required="true"; input.name="data";
  var submit = document.createElement("input"); input.innerHTML = '';
  submit.type = "submit"; submit.value="send !"; 
  m.appendChild(input);
  m.appendChild(submit);
}