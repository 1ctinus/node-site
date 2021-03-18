const YAML = require("yaml")
const fs = require("fs")   
const file = fs.readFileSync("data/test.yaml", "utf8")
console.log(YAML.parse(file))