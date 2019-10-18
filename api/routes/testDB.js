// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// // Variable to be sent to Frontend with Database status
// let databaseConnection = "Waiting for Database response...";
// router.get("/", function(req, res, next) {
//     // res.send(databaseConnection);
//     getResults(res);
// });
// router.get("/twoResults", function(req, res, next) {
//     // res.send(databaseConnection);
//     getTwoResults(res);
// });
// // Connecting to MongoDB
// mongoose.connect("mongodb://mongodb:27017/test");
// // If there is a connection error send an error message
// mongoose.connection.on("error", error => {
//     console.log("Database connection error:", error);
//     databaseConnection = "Error connecting to Database";
// });
// // If connected to MongoDB send a success message
// mongoose.connection.once("open", () => {
//     console.log("Connected to Database!");
//     databaseConnection = "Connected to Database";
// });
// var eventSchema = new mongoose.Schema({
//     name: String,
//     title: String,
//     nextEvent: String,
//     location: {
//         name: String,
//         city: String,
//         provState: String,
//         country: String
//     },
//     when: {
//         timeZone: String,
//         year: String,
//         month: String,
//         monthString: String,
//         day: String,
//         weekDay: String,
//         hour: String,
//         minute: String,
//         AMPM: String
//     },
//     fightCard: Array
//
// });
//
// var Events = mongoose.model('events', eventSchema);
//
// function addSampleData() {
//     var ufc241 = new Events ({
//         name: 'UFC 241',
//         title: 'CORMIER VS MIOCIC II',
//         when: {
//             timeZone: 'EST',
//             year: '2019',
//             month: 'August',
//             day: '17',
//             weekDay: 'Sat',
//             hour: '10',
//             minute: '00',
//             AMPM: 'PM'
//         },
//         location: {
//             name: 'Honda Center',
//             city: 'Anaheim',
//             provState: 'California',
//             country: 'United States'
//         }
//     });
//     var ufc242 = new Events ({
//         name: 'UFC 242',
//         title: 'NURMAGOMEDOV VS POIRIER',
//         when: {
//             timeZone: 'EST',
//             year: '2019',
//             month: 'September',
//             day: '07',
//             weekDay: 'Sat',
//             hour: '08',
//             minute: '00',
//             AMPM: 'PM'
//         },
//         location: {
//             name: 'du Arena',
//             city: 'Abu Dhabi',
//             provState: 'Abu Dhabi',
//             country: 'United Arab Emirates'
//         }
//     });
//     var bellator225 = new Events ({
//         name: 'Bellator 225',
//         title: 'MITRIONE VS KHARITONOV II',
//         when: {
//             timeZone: 'EST',
//             year: '2019',
//             month: 'August',
//             day: '24',
//             weekDay: 'Sat',
//             hour: '08',
//             minute: '00',
//             AMPM: 'PM'
//         },
//         location: {
//             name: 'Webster Bank Arena',
//             city: 'Bridgeport',
//             provState: 'Connecticut',
//             country: 'United States'
//         }
//     });
//     var bellator226 = new Events ({
//         name: 'Bellator 225',
//         title: 'BADER VS KONGO',
//         when: {
//             timeZone: 'EST',
//             year: '2019',
//             month: 'September',
//             day: '07',
//             weekDay: 'Sat',
//             hour: '08',
//             minute: '00',
//             AMPM: 'PM'
//         },
//         location: {
//             name: 'SAP Center',
//             city: 'Bridgeport',
//             provState: 'Connecticut',
//             country: 'United States'
//         }
//     });
//     var pfl6 = new Events ({
//         name: 'PFL 6',
//         title: 'TILLER VS GOLTSOV',
//         when: {
//             timeZone: 'EST',
//             year: '2019',
//             month: 'August',
//             day: '08',
//             weekDay: 'Thu',
//             hour: '08',
//             minute: '00',
//             AMPM: 'PM'
//         },
//         location: {
//             name: 'Ocean Resort Casino',
//             city: 'Atlantic City',
//             provState: 'New Jersey',
//             country: 'United States'
//         }
//     });
//     var pfl7 = new Events ({
//         name: 'PFL 7',
//         title: 'TBA VS TBA',
//         when: {
//             timeZone: 'EST',
//             year: '2019',
//             month: 'October',
//             day: '11',
//             weekDay: 'Fri',
//             hour: '08',
//             minute: '00',
//             AMPM: 'PM'
//         },
//         location: {
//             name: 'Mandalay Bay Events Center',
//             city: 'Las Vegas',
//             provState: 'Nevada',
//             country: 'United States'
//         }
//     });
//     // Saving it to the database.
//     pfl7.save(function (err) {if (err) console.log ('Error on save!')});
//     ufc242.save(function (err) {if (err) console.log ('Error on save!')});
//     bellator226.save(function (err) {if (err) console.log ('Error on save!')});
//     bellator225.save(function (err) {if (err) console.log ('Error on save!')});
//     ufc241.save(function (err) {if (err) console.log ('Error on save!')});
//     pfl6.save(function (err) {if (err) console.log ('Error on save!')});
// }
//
// addSampleData();
//
// function getResults(res) {
//     Events.find({}).sort( { 'when.year': 1, 'when.month': 1, 'when.day': 1, 'when.hour': 1 } ).exec(function(err, results) {
//         if (!err) {
//             // console.log(results);
//             res.send({express: results});
//         } else {
//             // error handling
//         };
//     });
// }
// function getTwoResults(res) {
//     Events.find({}).sort( { 'when.year': 1, 'when.month': 1, 'when.day': 1, 'when.hour': 1 } ).limit(2).exec(function(err, results) {
//         if (!err) {
//             // console.log(results);
//             res.send({express: results});
//         } else {
//             // error handling
//         };
//     });
// }
//
// module.exports = router;
