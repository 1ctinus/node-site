const Router = require("express").Router()               // Express
const fs = require("fs")                                // File System
const YAML = require("yaml")                           // Data
const pug = require("pug")                            // Templating

// const CleanCSS = require("clean-css")              // CSS Compression
var redirectdata = YAML.parse(fs.readFileSync("data/redirects.yaml", "utf8"))

function title(url) {
  const titleFile = YAML.parse(fs.readFileSync("data/titles.yaml", "utf8"))
  return (titleFile[url]) ? titleFile[url] : url + " - 1ctinus.me"
}
Router.use(function (req, res, next) {
  redirectdata[req.url] ? 
    res.redirect(301, redirectdata[req.url])
    : next()
})
Router.use(function (req, res, next) {
  fs.existsSync(`views/pages/archive${req.url}.pug`) ?
    res.redirect(301, "archive" + req.url) :
    next()
})
function defaultRender(
  res, object = {
    "file": pug.renderFile("views/pages/index.pug"),
    "style": "data:text/css,h1{font-size: 200px;}",
    "yaml": undefined, "title": "1ctinus.me",
    "input": undefined
  }) {
  res.render("templates/template.pug", {
    file: pug.renderFile(
      object.file, {
        yaml: object.yaml,
        input: object.input
      }),
    style: object.style,
    title: object.title
  })
}
Router.get("/oc|/shots", function (req, res) {
  let files = fs.readdirSync(`../files${req.url}`).reverse()
  defaultRender(res, {
    "file": `views/templates${req.url}.pug`,
    "input": files, style: `/css${req.url}.css`
  })
})
Router.get("/devs", function (req, res){
  var files = fs.readdirSync("../files/devs/")
  /* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
  let chosenFile = files[Math.floor(Math.random() * files.length)] 
  res.send(defaultRender(res, {
    "file": `views/templates${req.url}.pug`,
    "input": chosenFile,
    style: `/css${req.url}.css`
  }))
})
Router.use(function (req, res, next) {
  if (req.url == "/") req.url = "/index" 
  if (fs.existsSync(`views/pages${req.url}.pug`)) {
    var parsedFile = fs.existsSync(`data${req.url}.yaml`) ?
      JSON.stringify(YAML.parse(fs.readFileSync(`data${req.url}.yaml`, "utf8"))): "" 

    defaultRender(res, {
      "file": `views/pages${req.url}.pug`,
      "yaml": parsedFile, "style": `/css${req.url}.css`,
      "title": title(req.url.substring(1))
    })
  } else {
    next()
  }
})
Router.use(function (req, res){
  res.status(404).send(
    fs.readFileSync("static/404.html", "utf8")
  )
})
module.exports = Router