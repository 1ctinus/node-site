const express = require("express")                     // express
const app = express()                                   // express
const fs = require("fs")                                // file system
const path = require("path")                           // add static
const pug = require("pug")                             // pug for... pug
const { exec } = require("child_process")             // for neofetch
const favicon = require("serve-favicon")
var multer = require("multer")
var upload = multer()            // favicon
const port = 8000
const hostname = "localhost"
const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 2 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  keyGenerator: function (req) {
    return req.headers["cf-connecting-ip"] || req.ip
  }
})

app.use(express.json({ limit: "1kb" }))

// for parsing application/xwww-
app.use(express.urlencoded({ limit: "1kb", extended: true }))
//form-urlencoded
// for parsing multipart/form-data
app.use(upload.array())
app.use(express.static("public"))
app.use(favicon(__dirname + "/static/favicon.ico"))
app.set("view engine", "pug")

app.post("/request", limiter, function (req, res) {
  req.body.time = new Date()
  var site = JSON.parse(fs.readFileSync("data/form.json"))
  site["notes"].push(req.body)
  site["notes"]
  fs.writeFileSync("data/form.json", JSON.stringify(site))
  console.log(req.body)
  res.send("recieved your request!")
})

app.get("/neofetch", function (req, res) {

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
app.get("/changelog", function (req, res) {

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

app.use(express.static(path.join(__dirname, "static"), { redirect: false }))

app.get("/", function (req, res) {
  res.render("templates/template.pug", { file: pug.renderFile("views/pages/index.pug"), style: "/css/index.css" })
})

// rendering for most files
app.use(require("./pages.js"))
app.listen(port, hostname, () => {

  console.log(`Site now running at ${port}`)
})
