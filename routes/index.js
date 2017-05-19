/*jslint node: true */
"use strict";

var express = require('express');
var httpProxy = require('http-proxy');
var http = require('http');
var rp = require('request-promise');
var swat_proxy = require('swat-proxy');
var fs = require('fs');
var router = express.Router();
var request = require('request-json');
var path = require('path');

var utils = require('../helpers/tools');
var pv = require('../helpers/api_caller');

var client = request.createClient('http://www.plainview.io/');

var supportedDomainsUrls = [];

var overlay = fs.readFileSync('routes/overlay.js', 'utf8');
var tooltip = fs.readFileSync('routes/tooltip.js', 'utf8');

client.get('supported_websites/', function(err, res, supportedWebsites) {
    supportedWebsites.forEach(function(website){
        supportedDomainsUrls.push(website.site_url);
    });
});

router.get('/', function(req, res){
  console.log('123123123');
  res.sendFile('index.html');
});

router.post('/', function(req, res){
  var hi = '"'+req.url+'"';
  swat_proxy.proxyMultiple(supportedDomainsUrls, {
      selector: 'head',
      manipulation: swat_proxy.Manipulations.APPEND,
      content: '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">',
      matchType: 'domain'
  });

  swat_proxy.proxyMultiple(supportedDomainsUrls, {
      selector: 'body',
      manipulation: swat_proxy.Manipulations.APPEND,
      content: overlay,
      matchType: 'domain'
  });

  swat_proxy.proxyMultiple(supportedDomainsUrls, {
      selector: 'body',
      manipulation: swat_proxy.Manipulations.APPEND,
      content: tooltip,
      matchType: 'domain'
  });

  // swat_proxy.proxyMultiple(supportedDomainsUrls, {
  //     selector: 'body',
  //     manipulation: swat_proxy.Manipulations.APPEND,
  //     content: "<script>alert("+hi+")</script>",
  //     matchType: 'domain'
  // });
	swat_proxy.deliverWebpage({}, res, req.body.url);
});

router.get('/statusCode/:url', function(req, res){
	var url = req.body.url;
	//finds the http status code of a webpage
	req.params.url = decodeURI(req.params.url);

	try {
		req.param.url = utils.formatUrl(req.param.url);
	} catch (err) {
		res.send("Invalid url");
	}
	utils.getStatusCode(req.params.url)
	.then(function(statusCode){
		res.send(statusCode);
	}).catch(function(err){
		utils.errorHandler(err);
		res.send("Internal server error");
	});
});

router.get('/a/:archiveId', function(req, res){
	//gets a short url for an archive id
  pv.findArchiveById(req.params.id)
  .then(function(response){
    res.send(response);
  })
});

router.post('/articles', function(req, res){
  pv.createArticle(req.body.url)
  .then(function(article){
    swat_proxy.deliverWebpage({}, res, article.url);
  });
})

router.post('/archives', function(req, res){
  pv.createArchive(req.body.url, req.body.quote)
  .then(function(response){
    swat_proxy.deliverWebpage({}, res, response.article.url);
  });
})

router.get('/http://*', function(req, res) {
	//gets the instanced use of a url if redirected from a short url
	//gets all the uses of the url if not redirected from a short url
	try {
		req.params[0] = utils.formatUrl(req.params[0]);
	} catch (err) {
		res.send("Invalid url");
	}
	if (req.archive){
		res.render('url', {archive: req.archive});
	} else {
		pv.findByUrl(req.params[0])
		.then(function(usages){
			res.render('urlUsage', {usages: usages});
		});
	}
});

router.get('/', function(req, res) {
	res.send("It is working!");
});

module.exports = router;
