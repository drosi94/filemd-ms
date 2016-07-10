var http = require('http');
var express = require("express");
var path = require("path");
var multer  = require('multer')
var bodyParser = require("body-parser")
var upload = multer({ dest: './uploads/' })

var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

var server = http.createServer(app);


app.get('/', function(req,res) {
  res.status(200).sendFile('index.html', { root: path.join(__dirname, 'client') });
});

app.post('/file/metadata', upload.single('fileUp'), function (req, res) {
  res.send(JSON.stringify({
      fileSize : req.file.size
  }));
});



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("File Metadata Microservice server listening at", addr.address + ":" + addr.port);
});
