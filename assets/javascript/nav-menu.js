
let navMenu = document.createElement('div');
navMenu.innerHTML = '<nav class="nav"><div>' +
        ' <ul> ' +
        ' <li><a href="/index">Home</a></li>' +
        ' <li><a href="/about-us">About Us</a></li>' +
        ' <li><a href="/the-pizzas">The Pizzas</a></li>' +
        ' <li><a href="/contact-us">Contact Us</a></li>' +
        ' </ul> ' +
        ' </div>' +
        ' </nav>';
document.getElementsByClassName("body-wrapper")[0].appendChild(navMenu);
