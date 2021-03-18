const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
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
            <form action="/" method="post">
                <input type="text" name="text" /><br />
                <button>Enviar</button>
            </form>
            <p>${text}<p>
            <p>El texto ingresado es ${tone_name} en un ${score * 100}%<p>
        </body>
        </html>
      `);
        });
    } else {
      res.end(`
        <!doctype html>
        <html>
        <body>
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
            score = JSON.parse(data).result.document_tone.tones[0].score;
            tone_name = JSON.parse(data).result.document_tone.tones[0].tone_name;
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


        