const Router = require("express").Router() 
const fs = require("fs")                                // file system
const YAML = require("yaml")                           // add static
const pug = require("pug")  
const { minify } = require("terser")
var CleanCSS = require("clean-css")
Router.get("*", function (req, res) {
  // Redirect if no slash at the end
  if (req.url.endsWith("/")) {
    res.redirect(301, (req.url).substring(0, (req.url).length - 1))
  }

  else if (fs.existsSync("views" + req.url) && (req.url).endsWith(".js")) {
    res.setHeader("content-type", "text/javascript")
    let code = fs.readFileSync(`views${req.url}`, "utf8")
    minify(code)
      .then(minified => {
        //console.log(minified)
        res.send(minified.code)
      })
      .catch(err => console.log(err))
  }
  else if (fs.existsSync("views" + req.url) && (req.url).endsWith(".css")) {
    let code = fs.readFileSync(`views${req.url}`, "utf8")
    res.setHeader("content-type", "text/css")
    res.send(new CleanCSS().minify(code).styles)
  }
  // Normal response goes here
  else if (fs.existsSync("views/pages" + req.url + ".pug")) {
    if (fs.existsSync(`data${req.url}.yaml`)) {
      const file = fs.readFileSync(`data${req.url}.yaml`, "utf8")
      var parsedFile = JSON.stringify(YAML.parse(file))
    } else {
      // eslint-disable-next-line no-redeclare
      var parsedFile = ""
    }
    // normal rendering
    res.render("templates/template.pug", { 
      file: pug.renderFile(
        `views/pages${req.url}.pug`, { 
          yaml: parsedFile,
        }),
      style: `css${req.url}.css`,
    })
  }
  else {
    res.status(200).send(
      fs.readFileSync("static/404.html", "utf8")
    )
  }})
module.exports = Router