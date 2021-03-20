const pug = require("pug")
const Router = require("express").Router()                      // express                               // express                        // pug for... pug
const { exec } = require("child_process")             // for neofetc
const rateLimit = require("express-rate-limit")

const fs = require("fs")                                // file system
const limiter = rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 2 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  keyGenerator: function (req) {
    return req.headers["cf-connecting-ip"] || req.ip
  }
})
Router.post("/request", limiter, function (req, res) {
  req.body.time = new Date()
  var site = JSON.parse(fs.readFileSync("data/form.json"))
  site["notes"].push(req.body)
  site["notes"]
  fs.writeFileSync("data/form.json", JSON.stringify(site))
  console.log(req.body)
  res.send("recieved your request!")
})

Router.get("/neofetch", function (req, res) {

  exec("neofetch --stdout | sed \"s/\\:/\\:\\<\\/span\\>/g; s/\\-\\$/\\-\\<\\/span\\>/g; s/\\$/\\<br\\>\\<span style=color:#f43e5c\\;\\>/g;  s/- /-\\<\\/span\\>/g;\"", (error, stdout, stderr) => {

    if (error) {
      res.status(500).send(error)
      return
    }

    if (stderr) {
      res.status(500).send(stderr)
      return
    }
    res.render("templates/neofetch", { fetch: stdout })
  })
})
Router.get("/changelog", function (req, res) {

  exec("git log | grep  --color=never -e \"    \" -e Date", (error, stdout, stderr) => {

    if (error) {
      res.status(500).send(error)
      return
    }

    if (stderr) {
      res.status(500).send(stderr)
      return
    }
    res.render("templates/changelog", { git: stdout })
  })
})
Router.get("/", function (req, res) {
  res.render("templates/template.pug", { file: pug.renderFile("views/pages/index.pug"), style: "/css/index.css" })
})
module.exports = Router