"use strict"
const express = require("express")                     // express
const app = express()                                   // express                          // pug for... pug
const favicon = require("serve-favicon")
var multer = require("multer")
var upload = multer()            // favicon
const port = 8000
const hostname = "localhost"

app.use(express.json({ limit: "1kb" }))

// for parsing application/xwww-
app.use(express.urlencoded({ limit: "1kb", extended: false /*i set it to true before*/ }))
//form-urlencoded
// for parsing multipart/form-data
app.use(upload.array())
app.use(express.static("public"))
app.use(favicon(__dirname + "/../static/favicon.ico"))
app.set("view engine", "pug")

app.use(require("./router.js"))
app.use(express.static("static", { redirect: false }))
app.use(function(req, res, next){
  req.url.match(/\/.*\/$/) ?
    res.redirect(301, (req.url).substring(0, (req.url).length - 1))
    :
    next()
})
// rendering for most files
app.use(require("./pages.js"))
app.listen(port, hostname, () => {

  console.log(`Site now running at ${port}`)
})
