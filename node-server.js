
let http = require('http');
let fs = require("fs");
let url = require("url");

let user = '';
let pass = '';

let validationMessage = "<span class='no-display validation-response'></span>";

http.createServer(function (request, response) {

    let pathName = url.parse(request.url).pathname;
    let directories = pathName.split('/');
    let fileType = pathName.split('.').pop();

     console.log("request.url " + request.url + " request.method " + request.method);
    // console.log("pathName " + pathName + " directories " + directories + " fileType " + fileType);


    if (request.url === "/") {
        sendFileContent(response, "index.html", "text/html");
    } else if (request.url === "/index") {
        sendFileContent(response, "index.html", "text/html");
    } else if (request.url === "/about-us") {
        sendFileContent(response, "about-us.html", "text/html");
    } else if (request.url === "/the-pizzas") {
        sendFileContent(response, "the-pizzas.html", "text/html");
    } else if (request.url === "/contact-us") {
        if (request.method === "POST") {
            let info = url.parse(request.url, true);
           // console.dir(info);
            let body = "";
            request.on("data", function (data) {
                body += data;
               // console.log("partial body " + body);
            });
            request.on("end", function (data) {
                console.log(" body " + body);
                sendContactEmail(body);
            });
        }
        sendFileContent(response, "contact-us.html", "text/html");
    } else if (request.url === "/subscribe") {
        if (request.method === "POST") {
            let info = url.parse(request.url, true);
           // console.dir(info);
            let body = "";
            request.on("data", function (data) {
                body += data;
               // console.log("partial body " + body);
            });
            request.on("end", function (data) {
                console.log(" body " + body);
                sendSubscribeEmail(body);
                sendFileContent(response, "subscribe.html", "text/html");
            });  
        } else {
             sendFileContent(response, "subscribe.html", "text/html");
        }
       
    } else {
        switch (fileType) {
            case "css":
                contentType = 'text/css';
                break;
            case "js":
                contentType = 'text/javascript';
                break;
            case "jpg":
                contentType = 'image/jpg';
                break;
            case "png":
                contentType = 'image/png';
                break;
            case "ico":
                contentType = 'image/x-icon';
                break;
            case "x-icon":
                contentType = 'image/x-icon';
                break;
            default:
                console.log("Request URL: " + request.url);
                response.end();
        }
        sendFileContent(response, request.url.toString().substring(1), contentType);
    }

}).listen(3000);

function sendFileContent(response, fileName, contentType) {

    fs.readFile(fileName, function (err, data) {
        if (err) {
            response.writeHead(404);
            response.write("File not found.");
        } else {
            response.writeHead(200, {'Content-Type': contentType});           
            response.write(data);          
            if (fileName === "contact-us.html" || fileName === "subscribe.html") {
                 response.write(validationMessage);
            }
        }
        response.end();
    });
}

function sendContactEmail(body) {
    let nodemailer = require("nodemailer");

    let bodyText = "" + body;
    let userName = bodyText.substring(8, bodyText.search("userEmail"));
    let userEmail = bodyText.substring(bodyText.search("userEmail") + 9, bodyText.search("userPhone"));
    let userPhone = bodyText.substring(bodyText.search("userPhone") + 9, bodyText.search("userSubject"));
    let userSubject = bodyText.substring(bodyText.search("userSubject") + 11, bodyText.search("userComments"));
    let userComments =  bodyText.substring(bodyText.search("userComments") + 12, bodyText.length);

    let destinationEmail = "contact@jenspizza.com";

    console.log("bodyText " + bodyText);
   
   
    let emailTransport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '' + user,
            pass: '' + pass
        }
    });

    const message = {
        from: '' + userName + " at " + userEmail,
        to: '' + destinationEmail,
        subject: '' + userSubject,
        html: "<strong>From: </strong>" + userName + "<br />" +
                "<strong>Email: </strong>" + userEmail + "<br />" +
                "<strong>Phone: </strong>" + userPhone + "<br />" +
                "<strong>Subject: </strong>" + userSubject + "<br />" +
                "<br />" +
                "<strong>Message: </strong>" + userComments
    };

    let validForm = true;
   
    let userNameValid = true;
    if (userName.trim().length < 1) {
        userNameValid = false;
    }
    if (userNameValid === false){
        validForm = false; 
    }
    
    
    let userEmailValid = true;
    if (userEmail.trim().length < 5) {
        userEmailValid = false;
    }
    if (userEmailValid === false){
        validForm = false; 
    }
    
    
    let userCommentsValid = true;
    if (userComments.trim().length < 1) {
        userCommentsValid = false;
    }
    if (userCommentsValid === false){
        validForm = false; 
    }
    
    console.log("Sending userName: " + userName + " userEmail: " + userEmail + " userPhone: " + userPhone + " userSubject: " + userSubject + " userComments: " + userComments + " validForm "+ validForm);
    if (validForm) {
        emailTransport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err);
                validationMessage = "<span class='no-display validation-response'>Form did not submit.  Please try again</span>";
            } else {
                console.log(info);
                validationMessage = "<span class='no-display validation-response'>Success!  Form transmitted.</span>";
            }
        });
    } else {
        validationMessage = "<span class='no-display validation-response'>Please fill all required (**) input fields in the proper format.</span>";
    }
    console.log("validationMessage " + validationMessage);
}


function sendSubscribeEmail(body) {
    
    let nodemailer = require("nodemailer");
    let queryString = require("queryString");

    let bodyText = "" + body;
    let userName = bodyText.substring(13, bodyText.search("subscribeEmail"));
    let userEmail = bodyText.substring(bodyText.search("subscribeEmail") + 14, bodyText.length);

    let destinationEmail = "contact@jenspizza.com";
    let emailSubject = "Subscribe!";

    let emailTransport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '' + user,
            pass: '' + pass
        }
    });

    const message = {    
        from: '' + userName + " at " + userEmail,
        to: '' + destinationEmail,
        subject: emailSubject,
        html: "<strong>From: </strong>" + userName + "<br />" +
                "<strong>Email: </strong>" + userEmail + "<br />" +
                "<strong>Subject: </strong>" + emailSubject + "<br />" +
                "<br />" +
                "<strong>Message: </strong> Please subscribe this visitor for emails about store events and specials."
    };


    let validForm = true;


    let userNameValid = true;
    if (userName.trim() === "" || userName.trim().length < 1) {
        userNameValid = false;
    }
    if (userNameValid === false) {
        validForm = false;
    }


    let userEmailValid = true;
    if (userEmail.trim() === "" || userEmail.trim().length < 5) {
        userEmailValid = false;
    }
    if (userEmailValid === false) {
        validForm = false;
    }

    console.log("Sending userName: " + userName + " userEmail: " + userEmail + "validForm "+ validForm);

    if (validForm) {
        emailTransport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err);
                validationMessage = "<span class='no-display validation-response'>Form did not submit.  Please try again</span>";
            } else {
                console.log(info);
                validationMessage = "<span class='no-display validation-response'>Success!  You have been subscribed.  Thank you for subscribing with us!</span>";
            }
        });
    } else {
        validationMessage = "<span class='no-display validation-response'>Please fill all required (**) input fields in the proper format.</span>";
    }
    console.log("validationMessage " + validationMessage);
}