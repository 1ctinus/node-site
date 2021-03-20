const express = require("express")                     // express
const app = express()                                   // express
const path = require("path")                           // add static                             // pug for... pug
const favicon = require("serve-favicon")
var multer = require("multer")
var upload = multer()            // favicon
const port = 8000
const hostname = "localhost"

app.use(express.json({ limit: "1kb" }))

// for parsing application/xwww-
app.use(express.urlencoded({ limit: "1kb", extended: true }))
//form-urlencoded
// for parsing multipart/form-data
app.use(upload.array())
app.use(express.static("public"))
app.use(favicon(__dirname + "/../static/favicon.ico"))
app.set("view engine", "pug")

app.use(require("./router.js"))
app.use(express.static(path.join(__dirname, "../static"), { redirect: false }))

// rendering for most files
app.use(require("./pages.js"))
app.listen(port, hostname, () => {

  console.log(`Site now running at ${port}`)
})
