//POZOR! npm install readline

const { Console } = require("console");
const crypto = require("crypto");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const FgYellow = "\x1b[33m"; //žlutá barva textu
const FgBgReset = "\x1b[0m"; // reset barev

var string = "";
var key = "";
var algorithm = "aes192";

start();

function start() {
  rl.question("New Text: ", (text) => {
    string = text;
    rl.question("New Key: ", (text) => {
      key = text; //d5db740ea091c09f642e02bfae9e578dL
      process.stdout.write("\u001b[H\u001b[2J\u001b[3J");
      encrypt(string, key, algorithm);
    });
  });
}

//zašifrovat
function encrypt(string, key, algorithm) {
  const cipher = crypto.createCipher(algorithm, key);
  var encrypted = cipher.update(string, "utf8", "hex");
  encrypted = encrypted + cipher.final("hex");
  console.log(FgYellow + "Safe: " + FgBgReset + encrypted);
  decrypt(encrypted, key, algorithm);
}

//odšifrovat
function decrypt(encrypted, key, algorithm) {
  const decipher = crypto.createDecipher(algorithm, key);
  var decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted = decrypted + decipher.final("utf8");
  console.log(FgYellow + "Text: " + FgBgReset + decrypted);
  console.log(FgYellow + "Key: " + FgBgReset + key);
  console.log(" ")
  console.log(" ")
  console.log(" ")
  console.log(" ")
  start();
}

