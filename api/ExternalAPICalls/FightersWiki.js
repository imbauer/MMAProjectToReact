var express = require('express');
var router = express.Router();
var request = require('request');
var processFighters = require('../processing/ProcessFighters');

router.get('/fighter/data/:fighterName', function(req, res, next) {

    var fighterName = req.params.fighterName;
    var url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&utf8=true&titles="
    + encodeURIComponent(fighterName).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');

    request(url, function (err, response, body) {
        if(err){
            console.log(err + ' ERR: Stopped at ---> ' + url);
        } else {
            var fighter = processFighters.processFighter(body, fighterName);
            res.send(fighter);
            return fighter;
        }
    });

});



function getFighterWikiData(fighter) {

    return new Promise((resolve, reject) => {

        var URI = encodeURIComponent(fighter).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');
        var url = 'http://192.168.99.100:9000/fightersWiki/fighter/data/' + URI;
        request(url, function (err, response, body) {
            if(err){
                console.log(err + ' ERR: Stopped at ---> ' + url);
            } else {
                if (body === 'Error') {
                    console.log('Yup, now youre gonna have to call the other possibilities');
                    url = url + ' (fighter)';
                    request(url, function (err, response, body) {
                        if(err){
                            console.log(err + ' ERR: Stopped at ---> ' + url);
                        } else {
                            if (body === 'Error') {
                                url = url.replace(/(\s\(.*)|(%20\(.*)/g, '') + ' (MMA)';
                                console.log('Yup, now youre gonna have to call the other possibilities (fighter layer)');
                                request(url, function (err, response, body) {
                                    if(err){
                                        console.log(err + ' ERR: Stopped at ---> ' + url);
                                    } else {
                                        if (body === 'Error') {
                                            url = url.replace(/(\s\(.*)|(%20\(.*)/g, '') + ' (grappler)';
                                            console.log('Yup, now youre gonna have to call the other possibilities (MMA layer)');
                                            request(url, function (err, response, body) {
                                                if(err){
                                                    console.log(err + ' ERR: Stopped at ---> ' + url);
                                                } else {
                                                    if (body === 'Error') {
                                                        url = url.replace(/(\s\(.*)|(%20\(.*)/g, '') + ' (wrestler)';
                                                        console.log('Yup, now youre gonna have to call the other possibilities (wrestler layer)');
                                                        request(url, function (err, response, body) {
                                                            if(err){
                                                                console.log(err + ' ERR: Stopped at ---> ' + url);
                                                            } else {
                                                                if (body === 'Error') {
                                                                    url = url.replace(/(\s\(.*)|(%20\(.*)/g, '') + ' (kickboxer)';
                                                                    console.log('Yup, now youre gonna have to call the other possibilities (kickboxer layer)');
                                                                    request(url, function (err, response, body) {
                                                                        if(err){
                                                                            console.log(err + ' ERR: Stopped at ---> ' + url);
                                                                        } else {
                                                                            if (body === 'Error') {
                                                                                console.log('This guy is a can and doesnt have a WIKIPEDIA page');
                                                                                return resolve();
                                                                            }
                                                                            else {
                                                                                var data = JSON.parse(body);
                                                                                return resolve(data);
                                                                                // mongodb.addFighter(data);
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                                else {
                                                                    var data = JSON.parse(body);
                                                                    return resolve(data);
                                                                    // mongodb.addFighter(data);
                                                                }
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        var data = JSON.parse(body);
                                                        return resolve(data);
                                                        // mongodb.addFighter(data);
                                                    }
                                                }
                                            });
                                        }
                                        else {
                                            var data = JSON.parse(body);
                                            return resolve(data);
                                            // mongodb.addFighter(data);
                                        }
                                    }
                                });
                            }
                            else {
                                var data = JSON.parse(body);
                                return resolve(data);
                                // mongodb.addFighter(data);
                            }
                        }
                    });
                }
                else {
                    var data = JSON.parse(body);
                    return resolve(data);
                    // mongodb.addFighter(data);
                }
            }
        });

    });

}

module.exports = router;
