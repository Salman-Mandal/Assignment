const http = require("http");


const PORT = 5000;
const host = "localhost";

const server = http.createServer((req, res) => {

    if (req.url === "/home") {
        return res.end("<h1> This is home page <h1/>")
    }
    else if (req.url === "/about") {
        return res.end("<h1> This is about page <h1/>")
    }
    else {
        return res.end("<h1>404  page not found  <h1/>")
    }
});

server.listen(PORT, host, () => {
    console.log(`Hello World !! , Server is running on http://${host}:${PORT}`)
})