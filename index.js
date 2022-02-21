var express = require("express");
var app = express();
const port = 3000;
var bodyParser = require('body-parser');  
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

app.get("/", function(req, res) {

    res.sendFile("index.html");
});

app.post("/process_post",function(req,res){
    const HDWallet = require('ethereum-hdwallet')
const mnemonic = req.body.seed;
const hdwallet = HDWallet.fromMnemonic(mnemonic)
var publickey=`0x${hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`;
var privatekey=hdwallet.derive(`m/44'/60'/0'/0/0`).getPublicKey().toString('hex');

console.log(publickey);
console.log(privatekey);
res.send(`<h2> Public key:- </h2> ${publickey} <h2> Private key :- </h2> ${privatekey} <br>`);
})

app.listen(port, () => {
    console.log("Listening at http://localhost:3000");
});