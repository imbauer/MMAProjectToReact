var express = require('express');
var mongodb = require('../db');
var router = express.Router();
var request = require('request');

//SETUP GET FIGHTER DATA DONT REPEAT
router.get('/fighter/data/:fighterName', function(req, res) {
    var fighter = req.params.fighterName.replace(/\s/g, '\%20').replace(/\+/g, '\%2B');
    fightersWiki.getFighterWikiData(fighter)
        .then(fighterData => {
            console.log('------------------------- fighterData -------------------------');
            console.log(fighterData);
            console.log('-------------------------------------------------------------------------------');
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/loadAllFightersFromEvents', function(req, res) {
    mongodb.getAllFightersFromEvents()  // Returns a Promise!
        .then(fighters => {
            console.log('------------------------- Get All Fighters (List) -------------------------');
            console.log(fighters);
            console.log('-------------------------------------------------------------------------------');

            getNextFighter(fighters, fighters[0]);


        })
        .catch(err => {
            console.log(err);
        })
});

function getNextFighter(fighters, fighter) {

    fightersWiki.getFighterWikiData(fighter)
        .then(fighterData => {
            console.log('------------------------- fighterData [' + fighters.indexOf(fighter) + '] -------------------------');
            // console.log(fighterData);
            mongodb.addFighter(fighterData);
            console.log('-------------------------------------------------------------------------------');
            // console.log(fighters.indexOf(fighter));
            // console.log(fighters[fighters.indexOf(fighter) + 1]);
            if ((fighters.indexOf(fighter) + 1 !== -1 || fighters.indexOf(fighter) + 1 !== 0) && fighters.indexOf(fighter) < 30) {
                getNextFighter(fighters, fighters[fighters.indexOf(fighter) + 1]);
            }
        })
        .catch(err => {
            console.log(err);
        })

}

module.exports = router;
