
let http = require('http');
let fs = require("fs");
let url = require("url");

http.createServer(function (request, response) {

    let pathName = url.parse(request.url).pathname;
    let directories = pathName.split('/');
    let fileType = pathName.split('.').pop();

    console.log("request.url " + request.url + " request.method " + request.method);
    console.log("pathName " + pathName + " directories " + directories + " fileType " + fileType);


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
                sendFormEmail(body);
            });
        }
        sendFileContent(response, "contact-us.html", "text/html");
    } else if (request.url === "/assets/css/main-styles.css") {
        sendFileContent(response, request.url.toString().substring(1), "text/css");
    } else if (request.url === "/assets/css/print-styles.css") {
        sendFileContent(response, request.url.toString().substring(1), "text/css");
    } else if (request.url === "/assets/javascript/nav-menu.js") {
        sendFileContent(response, request.url.toString().substring(1), "text/javascript");
    } else if (request.url === "/assets/javascript/footer.js") {
        sendFileContent(response, request.url.toString().substring(1), "text/javascript");
    }else if (directories[2]) {
        switch (fileType) {
            case "jpg":
                contentType = 'image/jpg';
                break;
            case "png":
                contentType = 'image/png';
                break;
        }
        sendFileContent(response, request.url.toString().substring(1), contentType);
    } else {
        console.log("Request URL: " + request.url);
        response.end();
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

function sendFormEmail(body) {
    let nodemailer = require("nodemailer");
    let queryString = require("queryString");

    let jsonData = queryString.parse(body);

    let userName = jsonData.userName;
    let userSubject = jsonData.userSubject;
    let userEmail = jsonData.userEmail;
    let userPhone = jsonData.userPhone;
    let userComments = jsonData.userComments;


    let senderEmail = userEmail;
    let destinationEmail = "contact@jenspizza.com";


    let emailTransport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '',
            pass: ''
        }
    });

    const message = {
        from: '' + userName + " at " + userEmail,
        to: '' + destinationEmail,
        subject: '' + userSubject,
        text: 'From: ' + userName + " Phone: " + userPhone + ". Message: " + userComments
    };

    emailTransport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}
