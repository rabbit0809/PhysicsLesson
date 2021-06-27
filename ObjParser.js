
export default class ObjParser {
  whitespace(ch) {
    return ch == ' ' || ch == '\t';
  }
 
  nextToken() {
    token = '';
    while (this.idx < this.len && whitespace(this.objText[this.idx])) {
      this.idx += 1;
    } 
    while (this.idx < this.len && !whitespace(this.objText[this.idx])) {
      token += this.objText[this.idx];
      this.idx += 1;
    }
    return token;
  }
 
  async parse() {
    console.log("Parsing");
    var xhttp = new XMLHttpRequest();
    var objText = '';
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {  
        objText = xhttp.responseText;
      }
    }
    xhttp.open("GET", this.fileName, true);
    xhttp.send();
    while (objText.length == 0) {
      console.log("Waiting for data");
      await sleep(20);
    }
    console.log("Parsing");
    this.objText = objText;
    this.parse();
    this.idx = 0;
    this.len = this.objText.length;
    while (this.idx < this.len) {
      console.log("Token " + this.nextToken());
    }
  }

  constructor(fileName) {
    this.fileName = fileName;
  }
  
}

