const express = require('express')
const fs = require('fs')
const path = require('path');
const pug = require('pug');
const app = express()
const port = 8000
const hostname = 'localhost'
const { exec } = require("child_process");
var favicon = require('serve-favicon');
// neofetch --stdout
app.use(favicon(__dirname + '/static/favicon.ico'));
app.get('/neofetch', function (req, res) {

    exec("neofetch --stdout | sed \"s/\\:/\\:\\<\\/span\\>/g; s/\\-\\$/\\-\\<\\/span\\>/g; s/\\$/\\<br\\>\\<span style=color:#2c7f93\\;\\>/g;  s/- /-\\<\\/span\\>/g;\"", (error, stdout, stderr) => {
        // neofetch --stdout | sed \"s/\\:/\\:\\<\\/span\\>/g; s/\\-\\$/\\-\\<\\/span\\>/g; s/\\$/\\<br\\>\\<span style=color:blue\\;\\>/g;  s/- /-\\<\\/span\\>/g;\"
        if (error) {
            res.send(error)
            return;
        }
        if (stderr) {
            res.send(stderr);
            return;
        }
        const compiledFunction = pug.compileFile('pug/neofetch-temp.pug');
        res.send(compiledFunction({
            fetch: stdout
          }))
    });
})
app.get('/testing', function (req, res) {
    const compiledFunction = pug.compileFile('pug/imp.pug');
    res.send(compiledFunction({
        name: 'pug'
      }))
})
// app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'static')));
// app.use('/img', express.static(path.join(__dirname, 'img')))
app.get('/', function (req, res) {
    res.send(pug.renderFile('pug/index.pug'))
})

app.get('/*', function (req, res) {
    if (fs.existsSync('pug/' + req.params[0] + '.pug')) {
        res.send("<!DOCTYPE html><link href='css/" + req.params[0] + ".css' rel='stylesheet'>" + pug.renderFile('pug/' + req.params[0] + '.pug'))
    }
    else {
        res.send(
            fs.readFileSync('static/404.html', 'utf8')
        )
    }
})
app.listen(port, hostname, () => {

    console.log(`Example app listening at http://localhost:${port}`)
})
