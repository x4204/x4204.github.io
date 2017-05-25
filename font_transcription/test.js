var btn       = document.getElementById("showImage");
var input     = document.getElementById("inputText");
var container = document.getElementById("container");
var size      = 35;
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
  animateButton();
  removeContainerChildren();
  if(input.value != "")
  {
    var words = input.value.trim().split(" ");
    for (var i=0; i<words.length; i++)
    {
      if(i+2 <= words.length) words[i] += " ";
      insertTranscrWord(words[i]);
    }
    animateContainer();
  }
  else {
    container.style.visibility = "hidden";
  }
}

function insertTranscrWord(w)
{
  var span = document.createElement("span");

  for(var i=0; i<w.length; i++)
  {
    var aCode = "a".charCodeAt(0);
    var zCode = "z".charCodeAt(0);
    var charCode = w[i].toLowerCase().charCodeAt(0);

    if((charCode >= aCode && charCode <= zCode) || charCode - aCode == -65)
    {
      charCode = charCode - aCode;
      var element = document.createElement("img");

      element.src = images[charCode];
      if(charCode == -65) element.src = images[26];
      if(charCode == 18 || charCode == 20) { // for the S or U
        element.width  = size / 1.7;
        element.height = size;
      }
      else if(charCode == 22 || charCode == 24) { // for the W or Y
        element.width  = size / 1.45;
        element.height = size;
      }
      else {
        element.width  = size;
        element.height = size;
      }
      element.style.paddingTop = "5px";
      element.style.paddingLeft = "5px";
      span.appendChild(element);
    }
    container.appendChild(span);
    }
}

function removeContainerChildren()
{
  while(container.firstChild)
    container.removeChild(container.firstChild);
}

function animateContainer()
{
  container.style.visibility = "visible";
  var anim = container.animate(
  [
    { height: 0 },
    { height: '60%'}
  ],
  {
      duration: 400,
      iterations: 1,
      easing: 'ease-out'
  }
  );
}

function animateButton()
{
    var anim = btn.animate(
    [
      { width: '20%', height: '40px', backgroundColor: '#7eb282', marginLeft: '40%', marginTop: '20px', borderRadius: '10px' },
      { width: '21%', height: '44px', backgroundColor: '#417746', marginLeft: '39.5%', marginTop: '18px', borderRadius: '0px'  },
      { width: '20%', height: '40px', backgroundColor: '#7eb282', marginLeft: '40%', marginTop: '20px', borderRadius: '10px'  }
    ],
    {
      duration: 400,
      iterations: 1,
      easing: 'ease-out'
    }
    );
}
