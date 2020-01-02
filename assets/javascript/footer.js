
let footer = document.createElement('footer');
footer.classList.add("footer");
footer.innerHTML = "Copyright <span class='footer__year'></span>Jen's Pizza.  All rights reserved.";
document.getElementsByClassName("body-wrapper")[0].appendChild(footer);

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
document.getElementsByClassName("footer__year")[0].innerHTML = "&copy; " + currentYear + " ";
         