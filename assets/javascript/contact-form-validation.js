/* JavaScript Contact Form Validation. */

let clickedSubmit = false;

function validateContactForm() {
 
    if (clickedSubmit) {
        let userName = document.forms["contactForm"]["userName"].value.trim();
        let userEmail = document.forms["contactForm"]["userEmail"].value.trim();
        let userPhone = document.forms["contactForm"]["userPhone"].value.trim();
        let userSubject = document.forms["contactForm"]["userSubject"].value.trim();
        let userComments = document.forms["contactForm"]["userComments"].value.trim();
        let validContactForm = true;

        let atPosition = userEmail.indexOf("@");
        let dotPosition = userEmail.lastIndexOf(".");
        let lastEmailCharacter = userEmail.length - 1;

        let validName = true;
        if (userName === null || userName === "" || userName.length < 1) {
            validName = false;
        }

        if (validName) {
            document.forms["contactForm"]["userName"].classList.remove("required-field-needed");
        } else if (validName === false) {
            validContactForm = false;
            document.forms["contactForm"]["userName"].classList.add("required-field-needed");
        }


        /* If the @ position is at the start (or less) position of value 0,  validContactForm = false. */
        /* There must be at least 1 character after the @ position and the last dot position. */
        /* There must be at least two characters after the last "." symbol.  */
        let validEmail = true;
        if (userEmail === null || userEmail === "") {
            validEmail = false;
        } else if (atPosition <= 0) {
            validEmail = false;
        } else if (atPosition + 1 >= dotPosition) {
            validEmail = false;
        } else if (dotPosition + 1 >= lastEmailCharacter) {
            validEmail = false;
        }

        if (validEmail) {
            document.forms["contactForm"]["userEmail"].classList.remove("required-field-needed");
        } else if (validEmail === false) {
            validContactForm = false;
            document.forms["contactForm"]["userEmail"].classList.add("required-field-needed");
        }


        let validComments = true;
        if (userComments === null || userComments === "") {
            validComments = false;
        }

        if (validComments) {
            document.forms["contactForm"]["userComments"].classList.remove("required-field-needed");
        } else if (validComments === false) {
            validContactForm = false;
            document.forms["contactForm"]["userComments"].classList.add("required-field-needed");
        }


        if (validContactForm === false) {
            document.getElementsByClassName("javascript-validation-results-contact-us")[0].classList.add("show");
            document.getElementsByClassName("javascript-validation-results-contact-us")[0].innerHTML = "Please fill all required fields in the correct format.";
            return false;
        } else if (validContactForm) {
            document.getElementsByClassName("javascript-validation-results-contact-us")[0].classList.remove("show");
            document.getElementsByClassName("javascript-validation-results-contact-us")[0].innerHTML = "";
            return true;
        }
    } else {
        return false;
    }
}

function setClickedSubmitTrue() {
    let elementWithFocus = document.activeElement;
    if (contactButton === elementWithFocus) {
        clickedSubmit = true;
    }
}

let contactButton = document.getElementById("submitContactUs");
contactButton.addEventListener("click", setClickedSubmitTrue, "false");
contactButton.addEventListener("click", validateContactForm, "false");


let userName = document.getElementById("userName");
userName.addEventListener("change", validateContactForm, "false");

let userEmail = document.getElementById("userEmail");
userEmail.addEventListener("change", validateContactForm, "false");

let userPhone = document.getElementById("userPhone");
userPhone.addEventListener("change", validateContactForm, "false");

let userSubject = document.getElementById("userSubject");
userSubject.addEventListener("change", validateContactForm, "false");

let userComments = document.getElementById("userComments");
userComments.addEventListener("change", validateContactForm, "false");
