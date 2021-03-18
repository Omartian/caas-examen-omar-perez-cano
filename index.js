const http = require('http');

const hostname = '0.0.0.0';
const port = 8081;
const { parse } = require('querystring');
const fetch = require('node-fetch');
let text = "";
let score = 0.0;
let tone_name = "";


const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            res.end(`
        <!doctype html>
        <html>
        <body>
            <h2>Tone Analyzer using IBM Cloud Node app example - Omar Cano </h2>
            <form action="/" method="post">
                <input type="text" name="text" /><br />
                <button>Enviar</button>
            </form>
            <p>${text}</p>
            <p>El texto ingresado ${tone_name} ${score}</p>
        </body>
        </html>
      `);
        });
    } else {
      res.end(`
        <!doctype html>
        <html>
        <body>
        <h2>Tone Analyzer using IBM Cloud Node app example - Omar Cano </h2>
            <form action="/" method="post">
                <input type="text" name="text" /><br />
                <button>Enviar</button>
            </form>
        </body>
        </html>
      `);
    }
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', async () => {
            data = parse(body);
            text = JSON.stringify(data)

            
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: text
        }
        
        fetch('https://paas-examen-omar-perez-cano.us-south.cf.appdomain.cloud/get-tone', options)
        .then(response => response.text())
        .then(data => {
            if (JSON.parse(data).result.document_tone.tones[0] === undefined) {
                score = "";
                tone_name = "no es valido";
            } else {
                score = "en un " + JSON.parse(data).result.document_tone.tones[0].score*100 + "%";
                tone_name = "es " + JSON.parse(data).result.document_tone.tones[0].tone_name;
            };
            callback(parse(body))
        })
        .catch(error => {
            console.error(error);
        });
        
        });
        } else {
            callback(null);
        }
        }


        