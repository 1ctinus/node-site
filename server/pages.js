const Router = require("express").Router()               // Express
const fs = require("fs")                                // File System
const YAML = require("yaml")                           // Data
const pug = require("pug")                            // Templating
var useragent = require("useragent")                 // Anti IE Jazz
const { minify } = require("terser")                // JS Compression
var CleanCSS = require("clean-css")                // CSS Compression
var redirectdata = YAML.parse(fs.readFileSync("data/redirects.yaml", "utf8"))
Router.get("*", function (req, res) {
  // IE checking
  let agent = useragent.lookup(req.headers["user-agent"])
  // No fun for you if you use IE. 
  if (agent.family == "IE") {
    res.send("IE is not supported on this site, is outdated, and sucks. Please use Chromium/Firefox based browsers. Thanks.")
  } else {
    // Redirect if no slash at the end
    if (req.url.endsWith("/")) {
      if (req.url == "/") {
        res.render("templates/template.pug", { file: pug.renderFile("views/pages/index.pug"), style: "/css/index.css" })
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
            //console.log(minified)
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
      // normal rendering
      res.render("templates/template.pug", {
        file: pug.renderFile(
          `views/pages${req.url}.pug`, {
            yaml: parsedFile,
          }),
        style: `/css${req.url}.css`,
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