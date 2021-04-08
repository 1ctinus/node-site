const Router = require("express").Router()               // Express
const fs = require("fs")                                // File System
const YAML = require("yaml")                           // Data
const pug = require("pug")                            // Templating
const useragent = require("useragent")               // Anti IE Jazz
const { minify } = require("terser")                // JS Compression
const CleanCSS = require("clean-css")              // CSS Compression
var redirectdata = YAML.parse(fs.readFileSync("data/redirects.yaml", "utf8"))

function title(url){
  const titleFile = YAML.parse(fs.readFileSync( "data/titles.yaml", "utf8"))
  return (titleFile[url]) ? titleFile[url]:url + " - 1ctinus.me"
}
Router.get("*", function (req, res) {
  function defaultRender (
    object = {
      "file":pug.renderFile("views/pages/index.pug"),
      "style": "data:text/css,h1{font-size: 200px;}",
      "yaml": undefined, "title": "1ctinus.me"
    }){
    res.render("templates/template.pug", {
      file: pug.renderFile(
        object.file, {
          yaml: object.yaml,
        }),
      style: object.style,
      title: object.title
    })
  }
  // IE checking
  let agent = useragent.lookup(req.headers["user-agent"])
  // No fun for you if you use IE. 
  if (agent.family == "IE") {
    res.send("IE is not supported on this site, is outdated, and sucks. Please use Chromium/Firefox based browsers. Thanks.")
  } else {
    // Redirect if no slash at the end
    if (req.url.endsWith("/")) {
      if (req.url == "/") {
        defaultRender({
          "file": "views/pages/index.pug",
          "style": "/css/index.css",
          "title": "1ctinus' very cool webzone on the internets"})
      }
      else {
        res.redirect(301, (req.url).substring(0, (req.url).length - 1))
      }
    }
    // checking redirect YAML
    else if (redirectdata[req.url]) {
      res.redirect(301, redirectdata[req.url])
    }
    else if (fs.existsSync("views" + req.url)) {
      // Sends compressed Javascript
      let code = fs.readFileSync(`views${req.url}`, "utf8")
      if ((req.url).endsWith(".js")) {
        res.setHeader("content-type", "text/javascript")
        minify(code)
          .then(minified => {
            res.send(minified.code)
          })
          .catch(err => console.log(err))
      }
      // sends compressed CSS, even though i should probably learn SCSS some day.
      else if ((req.url).endsWith(".css")) {
        res.setHeader("content-type", "text/css")
        res.send(new CleanCSS().minify(code).styles)
      }
    }
    // Now we get to Pug, main page
    else if (fs.existsSync(`views/pages${req.url}.pug`)) {

      if (fs.existsSync(`data${req.url}.yaml`)) {
        const file = fs.readFileSync(`data${req.url}.yaml`, "utf8")
        var parsedFile = JSON.stringify(YAML.parse(file))
      } else {
        // eslint-disable-next-line no-redeclare
        var parsedFile = ""
        // messy way of not sending anything if there is no YAML.
      }
      defaultRender({
        "file": `views/pages${req.url}.pug`,
        "yaml": parsedFile, "style": `/css${req.url}.css`,
        "title": title(req.url.substring(1))
      })
    }
    else {
      res.status(404).send(
        fs.readFileSync("static/404.html", "utf8")
      )
    }
  }
})
module.exports = Router