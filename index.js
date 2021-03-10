const express = require('express')
const fs = require('fs')
const path = require('path');
const pug = require('pug');
const app = express()
const port = 80
const hostname = '0.0.0.0'
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'html')));
app.use('/img', express.static(path.join(__dirname, 'img')))
app.get('/', function (req, res){
    res.send(pug.renderFile('pug/index.pug'))
})
app.get('/*', function (req, res) {
    if (fs.existsSync('pug/' + req.params[0] + '.pug')) {
        res.send("<link href='" + req.params[0] + ".css' rel='stylesheet'>" + pug.renderFile('pug/' + req.params[0] + '.pug'))
    }
    else {
        res.send(
            fs.readFileSync('html/404.html', 'utf8')
        )
    }
})
app.listen(port, hostname, () => {

    console.log(`Example app listening at http://localhost:${port}`)
})
