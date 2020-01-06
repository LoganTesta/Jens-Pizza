
let footer = document.createElement('footer');
footer.classList.add("footer");
footer.innerHTML = '<div class="footer__copyright">' +
        'Copyright <span class="footer__year"></span>Jen\'s Pizza.  All rights reserved.' +
        '<div class="footer__subscribe-container">' +
        '<h3 class="footer__subheading">Subscribe</h3>' +
        '<form id="subscribeName" action="/subscribe" method="post">' +
        '<div class="input-container">' +
        '<label for="subscribeName">Name</label>' +
        '<input type="text" id="subscribeName" name="subscribeName" />' +
        '</div> ' +
        '<div class="input-container">' +
        '<label for="subscribeEmail">Email</label>' +
        '<input type="email" id="subscribeEmail" name="subscribeEmail" />' +
        '</div> ' +
        '<div class="input-container">' +
        '<button class="submit-button" id="subscribeSubmit" name="subscribeSubmit">Subscribe!</button>' +
        '</div> ' +
        '</form>' +
        '</div>' +
        '</div>';
document.getElementsByClassName("body-wrapper")[0].appendChild(footer);

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
document.getElementsByClassName("footer__year")[0].innerHTML = "&copy; " + currentYear + " ";
         