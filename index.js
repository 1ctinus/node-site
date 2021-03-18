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

app.use(express.json())

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }))
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array())
app.use(express.static("public"))
app.use(favicon(__dirname + "/static/favicon.ico"))
app.set("view engine", "pug")

app.get("/questions", function(req, res) {
  const file = fs.readFileSync("data/test.yaml", "utf8")
  const parsedFile = JSON.stringify(YAML.parse(file))
  res.render("questions-temp", {input: parsedFile})
})
app.post("/request", function(req, res){
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
    res.render("neofetch-temp.pug", { fetch: stdout })
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
// app.get('/testing', function (req, res) {
//     const compiledFunction = pug.compileFile('views/imp.pug');
//     res.send(compiledFunction({
//         name: 'pug'
//       }))
// })
app.use(express.static(path.join(__dirname, "static"), { redirect : false }))

app.get("/", function (req, res) {
  res.render("template.pug", { file: pug.renderFile("views/index.pug"), style: "/css/index.css" })
})

app.get("*", function (req, res) {
  // Redirect if no slash at the end
  if (req.url.endsWith("/")) {
    res.redirect(301, (req.url).substring(0, (req.url).length - 1))
  }

  // Normal response goes here
  else if (fs.existsSync("views" + req.url + ".pug")) {
    // normal rendering
    res.render("template.pug", { file: pug.renderFile(`views${req.url}.pug`), style: `css${req.url}.css` })
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
