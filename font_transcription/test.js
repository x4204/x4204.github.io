var btn       = document.getElementById("showImage");
var input     = document.getElementById("inputText");
var container = document.getElementById("container");
var size      = 50;
var images    = [
    "ch/A.png", "ch/B.png", "ch/C.png", "ch/D.png",  // 0-3
    "ch/E.png", "ch/F.png", "ch/G.png", "ch/H.png",  // 4-7
    "ch/I.png", "ch/J.png", "ch/K.png", "ch/L.png",  // 8-11
    "ch/M.png", "ch/N.png", "ch/O.png", "ch/P.png",  // 12-15
    "ch/Q.png", "ch/R.png", "ch/S.png", "ch/T.png",  // 16-19
    "ch/U.png", "ch/V.png", "ch/W.png", "ch/X.png",  // 20-23
    "ch/Y.png", "ch/Z.png", "ch/gap.png"             // 24-26
  ]

btn.addEventListener("click", transCode);

function transCode()
{
  removeContainerChildren();

  for(var i=0; i<input.value.length; i++)
  {
    var charCode = input.value[i].toLowerCase().charCodeAt(0);
    var aCode = "a".charCodeAt(0);
    var zCode = "z".charCodeAt(0);
    if((charCode >= aCode && charCode <= zCode) || charCode - aCode == -65)
    {
      var index = charCode - aCode;
      insertImageOnIndex(index);
    }
  }
}

function insertImageOnIndex(i)
{
  var element = document.createElement("img");

  if(i == -65) element.src ="ch/gap.png";
  else element.src = images[i];
  if(i == 18 || i == 20) { // for the S or U
    element.width  = size / 1.7;
    element.height = size;
  }
  else if(i == 22 || i == 24) { // for the W or Y
    element.width  = size / 1.45;
    element.height = size;
  }
  else {
    element.width  = size;
    element.height = size;
  }
  element.style.paddingTop = "5px";
  element.style.paddingLeft = "5px";
  container.appendChild(element);
}

function removeContainerChildren()
{
  while(container.firstChild)
    container.removeChild(container.firstChild);
}
