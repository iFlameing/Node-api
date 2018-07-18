const http = require("http")
const app  = require("./app")

const server = http.createServer(app)

server.on('listening',function(){
    console.log('ok, server is running');
});

server.listen(3000,function(){
    console.log("server is started at 3000")
})