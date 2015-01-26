var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/main', function(req, res){

  var url = 'http://www.oceanofm.com/blog/frontpage/';
  var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
  }

  request({url:url, headers:headers}, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var posts = [];
      var title, section, link, description;

      $('.teaser-item').each(function(){
        console.log($(this).html());

        var data = $(this);
        title = data.find("h1.pos-title").children().first().text();
        section = data.find("p.pos-meta").children().first().attr('href');
        link = data.find("a.jp-download").attr('href');
        description = data.find("div.pos-content").children().first().text().trim();

        posts.push({title:title, section:section, link:link, description:description})
      })

      res.send(posts);
    }
  })
})

var server = app.listen('8081')

console.log('Server started on port 8081');

exports = module.exports = app;
