
let http = require('http');
let fs = require("fs");
let url = require("url");

let user = '';
let pass = '';

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
            console.dir(info);

            let body = "";
            request.on("data", function (data) {
                body += data;
                console.log("partial body " + body);
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
            console.dir(info);

            let body = "";
            request.on("data", function (data) {
                body += data;
                console.log("partial body " + body);
            });
            request.on("end", function (data) {
                console.log(" body " + body);
                sendSubscribeEmail(body);
            });
        }
        sendFileContent(response, "subscribe.html", "text/html");
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
                contentType = 'image/png';
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
        }
        response.end();
    });
}

function sendContactEmail(body) {
    let nodemailer = require("nodemailer");
    let queryString = require("queryString");

    let jsonData = queryString.parse(body);

    let userName = jsonData.userName;
    let userSubject = jsonData.userSubject;
    let userEmail = jsonData.userEmail;
    let userPhone = jsonData.userPhone;
    let userComments = jsonData.userComments;

    let destinationEmail = "contact@jenspizza.com";


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

    emailTransport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}


function sendSubscribeEmail(body) {
    let nodemailer = require("nodemailer");
    let queryString = require("queryString");

    let jsonData = queryString.parse(body);

    let userName = jsonData.subscribeName;
    let userEmail = jsonData.subscribeEmail;

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

    emailTransport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}