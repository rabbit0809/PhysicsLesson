
export default class ObjParser {
  constructor(fileName) {
    var objText;
    var xhttp = new XMLHttpRequest();
    var ready = false;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {  
        objText = xhttp.responseText;
        ready = true;
      }
    }
    xhttp.open("GET", "models/cube.obj", true);
    xhttp.send();
    while (1) {
      if (ready) {
        console.log(objText);
      }
    }
  }
}

