"use strict"
const Router = require("express").Router()                      // express                               // express                        // pug for... pug
const { exec } = require("child_process")             // for neofetc
const rateLimit = require("express-rate-limit")
const CleanCSS = require("clean-css")              // CSS Compression
const fs = require("fs")                                // file system
const { minify } = require("terser")                // JS Compression
const useragent = require("useragent")               // Anti IE Jazz
const IE = function(req, res, next) {
  let agent = useragent.lookup(req.headers["user-agent"])
  // No fun for you if you use IE. 
  agent.family == "IE" ?
    res.send("IE is not supported on this site, is outdated, and sucks. Please use Chromium/Firefox based browsers. Thanks.")
    : next()
}
Router.use(IE)

const limiter = rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 2 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  keyGenerator: function(req) {
    return req.headers["cf-connecting-ip"] || req.ip
  }
})
Router.post("/request", limiter, function(req, res) {
  req.body.time = new Date().toISOString().replace(/.......Z$/, "").replace( "T", " ")
  var site = JSON.parse(fs.readFileSync("data/form.json"))
  site["notes"].push(req.body)
  site["notes"]
  fs.writeFileSync("data/form.json", JSON.stringify(site))
  console.log(req.body)
  res.send("recieved your request!")
})

Router.get("/neofetch", function(req, res) {

  exec("neofetch --stdout | sed \"s/\\:/\\:\\<\\/span\\>/g; s/\\-\\$/\\-\\<\\/span\\>/g; s/\\$/\\<br\\>\\<span style=color:#f43e5c\\;\\>/g;  s/- /-\\<\\/span\\>/g;\"", (error, stdout, stderr) => {

    if (error) return res.status(500).send(error)
    if (stderr) return res.status(500).send(stderr)
    res.render("templates/neofetch", { fetch: stdout })
  })
})
Router.get("/css/*.css", function(req,res){
  res.setHeader("content-type", "text/css")
  res.send(new CleanCSS().minify(fs.readFileSync(`views${req.url}`, "utf8")).styles)
})
Router.get("/js/*.js", function(req, res){
  res.setHeader("content-type", "text/javascript")
  let code = fs.readFileSync(`views${req.url}`, "utf8")
  minify(code)
    .then(({code}) => res.send(code))
    .catch(console.error)
})
module.exports = Router