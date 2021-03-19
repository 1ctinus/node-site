const express = require("express")                      // express
const app = express()                                   // express
const fs = require("fs")                                // file system
const path = require("path")                           // add static
const pug = require("pug")                             // pug for... pug
const { exec } = require("child_process")             // for neofetch
const favicon = require("serve-favicon")
var multer = require("multer")
var upload = multer()            // favicon
const YAML = require("yaml")
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
app.get("/changeloggit", function (req, res) {

  exec("git log | grep  --color=never -e \"    \" -e Date", (error, stdout, stderr) => {

    if (error) {
      res.status(500).send(error)
      return
    }

    if (stderr) {
      res.status(500).send(stderr)
      return
    }
    res.render("changelog.pug", { git: stdout })
  })
})

app.use(express.static(path.join(__dirname, "static"), { redirect: false }))

app.get("/", function (req, res) {
  res.render("templates/template.pug", { file: pug.renderFile("pages/index.pug"), style: "/css/index.css" })
})
// rendering for most files
app.get("*", function (req, res) {
  // Redirect if no slash at the end
  if (req.url.endsWith("/")) {
    res.redirect(301, (req.url).substring(0, (req.url).length - 1))
  }

  // Normal response goes here
  else if (fs.existsSync("views/pages" + req.url + ".pug")) {
    const file = fs.readFileSync(`data${req.url}.yaml`, "utf8")
    const parsedFile = JSON.stringify(YAML.parse(file))
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
  }
})

app.listen(port, hostname, () => {

  console.log(`Site now running at ${port}`)
})
