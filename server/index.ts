import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

const server = http.createServer(app);

const width = 54
const height = 82
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

function Create2DArray(rows,cols) {
  var x = new Array(rows)
  for (var i = 0; i < rows; i++) {
    x[i] = new Array(cols)
    for (var j=0; j < cols; j++)
        x[i][j] = 0
  }
  return x
}

function diagonal(x,y,rx,ry)
{
    return 0.1*Math.sqrt(Math.pow(Math.abs(x-rx),2)+Math.pow(Math.abs(y-ry),2))
} 
const positionMap = {
    "94:0c:6d:b4:63:81": { x: 0, y: 0 },
    "94:0c:6d:b4:63:82": { x: width, y: height },
    "64:66:b3:90:5b:e8": { x: width, y: 0 },
    "64:66:b3:90:5b:e9": { x: 0, y: height }
}

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        const data = JSON.parse(message)
        const actual = data.filter(a => Object.keys(positionMap).indexOf(a.BSSID) != -1)
        let distances = actual.map(a => {
            let { frequency, level, BSSID, SSID } = a
            return { SSID: SSID, BSSID: BSSID, d: Math.pow(10, (27.55 - (20 * Math.log(frequency)/Math.log(10)) + Math.abs(level)) / 20.0) * 100 }
        })
        distances.forEach(d => console.log(JSON.stringify(d)))

       /*  let home = Create2DArray(width,height)
        for(let i=0;i<width;i++)
            for(let j=0;j<height;j++){
                if(diagonal(i,j,positionMap["02:9f:c2:21:89:ee"].x,positionMap["02:9f:c2:21:89:ee"].y)) home[i][j]+=1
                if(diagonal(i,j,positionMap["02:9f:c2:22:89:ee"].x,positionMap["02:9f:c2:22:89:ee"].y)) home[i][j]+=1
                if(diagonal(i,j,positionMap["72:e7:2c:aa:0e:b5"].x,positionMap["02:9f:c2:22:89:ee"].y)) home[i][j]+=1
                if(diagonal(i,j,positionMap["00:00:00:00:00:00"].x,positionMap["00:00:00:00:00:00"].y)) home[i][j]+=1
            } */
        
    });
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});