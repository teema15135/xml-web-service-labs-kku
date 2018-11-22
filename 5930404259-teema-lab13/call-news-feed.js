var express = require('express')
var app = express()
var xml2js = require('xml2js')
var request = require('request')
var parser = new xml2js.Parser()

var l_port = 8080

var newsObj
var newsXml
var url = 'http://www.bangkokbiznews.com/rss/feed/technology.xml'

request.get(url, (err, res, body) => {
    if(err)
        return console.dir(err)
    parser.parseString(body, function (err, result) {
        newsObj = result
        newsXml = simplifyToXML(newsObj)
        console.log('Request loaded')
    })
})

app.get('/', function(req, res) {
    res.set('Content-Type', 'text/xml;charset=utf-8')
    res.send(newsXml)
})

var server = app.listen(l_port, function() {
    console.log('Listening at port ' + l_port)
})

function simplifyToXML(obj) {
    var result = '<?xml version="1.0" encoding="UTF-8"?>'
    result += '<news>'
    result +=   '<channel_title>'
    result +=       obj.rss.channel[0].title
    result +=   '</channel_title>'
    obj.rss.channel[0].item.forEach(element => {
        result +=   '<item>'
        result +=       '<title>'
        result +=           element.title
        result +=       '</title>'
        result +=       '<link>'
        result +=           element.link
        result +=       '</link>'
        result +=   '</item>'
    });
    result += '</news>'
    return result
}
/*  <news>
        <channel_title></channel_title>
        <item>
            <title></title>
            <link></link>
        </item>
    </news> */