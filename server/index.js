"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var WebSocket = require("ws");
var app = express();
var server = http.createServer(app);
var modifier = 0.4;
var threshold = 2;
//var width = 54;
//var height = 82;

//let home = Create2DArray(width,height)

//Audio
var sys = require('sys')
var exec = require('child_process').exec;
var child;

//initialize the WebSocket server instance
var wss = new WebSocket.Server({ server: server });


function Create2DArray(rows, cols) {
    var x = new Array(rows);
    for (var i = 0; i < rows; i++) {
        x[i] = new Array(cols);
        for (var j = 0; j < cols; j++)
            x[i][j] = 0;
    }
    return x;
}
function diagonal(x, y, rx, ry) {
    return 0.1 * Math.sqrt(Math.pow(Math.abs(x - rx), 2) + Math.pow(Math.abs(y - ry), 2));
}

function check(x,y,sx,sy){
     var count = 0
     for(var i=x;i<x+sx;i++){
         for(var j=y;j<y+sy;j++){
             if(home[i][j]==2) count+=1
         }
     }
     return count
}

var positionMap = {
	//wpisac adres swojego routera (potrzebne sa 2 routery)
	//do obliczen uzywane sa dwa pierwsze
	//dane x,y mozna zmyslic - byly brane pod uwage przy pierwszym podejsciu do problemu
	//d zawsze ustawiamy na 0

  //  "b4:2a:0e:55:61:80": { x: 36, y: 78, d: 0 }, //vectra
    "28:27:bf:24:00:e5": { x: 26, y: 3, d: 0 },//Karol
    //"2e:bb:58:06:92:58": { x: 2, y: 45, d: 0 },//hall 2nd
    "10:92:66:c8:39:02": { x: 2, y: 45, d: 0 },//hall
   // "2e:bb:58:06:92:58": { x: 40, y: 27 , d: 0}//kitchen
};

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        var data = JSON.parse(message);
        var actual = data.filter(function (a) { return Object.keys(positionMap).indexOf(a.BSSID) != -1; });
        var distances = actual.map(function (a) {
            var frequency = a.frequency, level = a.level, BSSID = a.BSSID, SSID = a.SSID;
            return { SSID: SSID, BSSID: BSSID,level: level, d: Math.pow(10, (27.55 - (20 * Math.log(frequency) / Math.log(10)) + Math.min(Math.abs(level),100)) / 20.0)*modifier};
        });
        actual.forEach(function(d) {
            d.d = Math.pow(10, (27.55 - (20 * Math.log(d.frequency) / Math.log(10)) + Math.abs(d.level)) / 20.0)
        })

    /*
    *   Setting audio balance depending on signal level.
    *   For difference of levels about 2dBm both speakers are playing
    *   cause user is around the bondary between routers.
    */
        if(distances[0].level - distances[1].level <= threshold && (distances[0].level - distances[1].level >= 0)){
            function puts(error, stdout, stderr) { sys.puts(stdout) }
            exec("amixer -D pulse sset Master 100%,100%", puts);
        } else if (distances[0].level - distances[1].level >= -threshold && (distances[0].level - distances[1].level <= 0)){
            function puts(error, stdout, stderr) { sys.puts(stdout) }
            exec("amixer -D pulse sset Master 100%,100%", puts)
        } else if (distances[0].level - distances[1].level > threshold){
            function puts(error, stdout, stderr) { sys.puts(stdout) }
            exec("amixer -D pulse sset Master 0%,100%", puts)
        } else if (distances[0].level - distances[1].level < -threshold){
            function puts(error, stdout, stderr) { sys.puts(stdout) }
            exec("amixer -D pulse sset Master 100%,0%", puts)
        }

        distances.forEach(function (d) { return console.log(JSON.stringify("SSID: "+ d.SSID + "    level: " + d.level)); });
       
        /*
        *   Second version algorithm (giving wrong result) with
        *   mapping whole flat and find intersection areas between
        *   circles around routers/access points of radius depending
        *   on signal level.
        */
      /* console.log(distances)
         for(let i=0;i<width;i++)
             for(let j=0;j<height;j++){
              //   if(diagonal(i,j,positionMap["b4:2a:0e:55:61:80"].x,positionMap["b4:2a:0e:55:61:80"].y)<=distances[0].d) home[i][j]+=1
                 if(diagonal(i,j,positionMap["28:27:bf:24:00:e5"].x,positionMap["28:27:bf:24:00:e5"].y)<=distances[0].d) home[i][j]+=1
                 if(diagonal(i,j,positionMap["2e:bb:58:06:92:58"].x,positionMap["2e:bb:58:06:92:58"].y)<=distances[1].d) home[i][j]+=1
               //  if(diagonal(i,j,positionMap["2e:bb:58:06:92:58"].x,positionMap["2e:bb:58:06:92:58"].y)<=distances[3].d) home[i][j]+=1
             }
       new Promise((success,fail)=> {
        var rooms = {
            "Karol":{cnt: 0, idx: 1},
            "Aga":{cnt: 0, idx: 2},
            "Hall":{cnt: 0, idx: 3},
            "Bathroom":{cnt: 0, idx: 4},
            "Kitchen":{cnt: 0, idx: 5},
        }
        rooms["Karol"].cnt = check(14,0,40,25)
        rooms["Hall"].cnt = check(0,25,32,20)
        rooms["Bathroom"].cnt = check(0,0,14,25)
        rooms["Kitchen"].cnt = check(22,25,32,20)
        rooms["Aga"].cnt = check(0,50,22,32)+check(22,45,32,37)

            for(var j=0; j<height; j++) {
                home[i][j]=0
            }
        }
        console.log(rooms)
        success();
    })
    .catch((e)=>{console.log(e)})*/
    });
});
//start our server
server.listen(process.env.PORT || 8999, function () {
    console.log("Server started on port " + server.address().port + " :)");
});
