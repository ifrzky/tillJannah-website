const fs = require("fs-extra");
const crypto = require("crypto");

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

function readFileTxt(file) {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(file, "utf8");
    const array = data.toString().split("\n");
    const random = array[Math.floor(Math.random() * array.length)];
    resolve(random.replace("\r", ""));
  });
}

function readFileJson(file) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.parse(fs.readFileSync(file));
    const index = Math.floor(Math.random() * jsonData.length);
    const random = jsonData[index];
    resolve(random);
  });
}

module.exports = { readFileTxt, readFileJson, generateAuthToken };
