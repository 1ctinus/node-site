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
  if (redirectdata[req.url]) {
    res.redirect(301, redirectdata[req.url])
  } else {
    next()
  }
})
Router.use(function (req, res, next) {
  if (fs.existsSync(`views/pages/archive${req.url}.pug`)) {
    res.redirect(301, "archive" + req.url)
  } else {
    next()
  }
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
Router.get("/", function (req, res) {
  defaultRender(res, {
    "file": "views/pages/index.pug",
    "style": "/css/index.css",
    "title": "1ctinus' very cool webzone on the internets"
  })
})
Router.get("/oc|/shots", function (req, res) {
  let files = fs.readdirSync(`../files${req.url}`).reverse()
  res.send(defaultRender(res, {
    "file": `views/templates${req.url}.pug`,
    "input": files, style: `/css${req.url}.css`
  }))
})
Router.use(function (req, res) {
  // checking redirect YAML
  // Now we get to Pug, main page
  if (fs.existsSync(`views/pages${req.url}.pug`)) {
    if (fs.existsSync(`data${req.url}.yaml`)) {
      const file = fs.readFileSync(`data${req.url}.yaml`, "utf8")
      var parsedFile = JSON.stringify(YAML.parse(file))
    } else {
      // eslint-disable-next-line no-redeclare
      var parsedFile = ""
      // messy way of not sending anything if there is no YAML.
    }
    defaultRender(res, {
      "file": `views/pages${req.url}.pug`,
      "yaml": parsedFile, "style": `/css${req.url}.css`,
      "title": title(req.url.substring(1))
    })
  } else {
    res.status(404).send(
      fs.readFileSync("static/404.html", "utf8")
    )
  }
  // }
})
module.exports = Router