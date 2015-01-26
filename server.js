var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/main', function(req, res){
  var url = 'http://www.oceanofm.com/blog/frontpage/';

  request({ url:url, headers:{'User-Agent': 'aenavcam scrapper/0.0.1'}}, function(error, response, html){
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

        posts.push({
          title:title
        , section:section
        , link:link
        , description:description
        });

      });

      res.send(posts);
    }
  })
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
