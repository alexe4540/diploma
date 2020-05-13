function openPage(pageName,elmnt,color) {
    let tabcontent, tablinks;
    tabcontent = document.querySelectorAll(".tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.querySelectorAll(".tablink");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.querySelector(`#${pageName}`).style.display = "block";
    elmnt.style.backgroundColor = color;
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.querySelector("#defaultOpen").click();