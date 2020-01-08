
let footer = document.createElement('footer');
footer.classList.add("footer");
footer.innerHTML = '<div class="footer__copyright">' +
        'Copyright <span class="footer__year"></span>Jen\'s Pizza.  All rights reserved.' +
        '<div class="footer__subscribe-container">' +
        '<a href="/subscribe"><h3 class="footer__subheading">Subscribe Here!</h3></a>' +
        '</div>' +
        '</div>';
document.getElementsByClassName("body-wrapper")[0].appendChild(footer);

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
document.getElementsByClassName("footer__year")[0].innerHTML = "&copy; " + currentYear + " ";
         