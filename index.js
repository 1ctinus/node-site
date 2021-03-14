const express = require("express")                      // express
const app = express()                                   // express
const fs = require("fs")                                // file system
const path = require("path")                           // add static
const pug = require("pug")                             // pug for... pug
const { exec } = require("child_process")             // for neofetch
const favicon = require("serve-favicon")               // favicon

const port = 8000
const hostname = "localhost"

app.use(favicon(__dirname + "/static/favicon.ico"))
app.set("view engine", "pug")

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
