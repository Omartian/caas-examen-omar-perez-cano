const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const { parse } = require('querystring');
const fetch = require('node-fetch');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
        console.log(parse(body));
        data = parse(body);
        console.log(parse(data.text));

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: data
        }
        
        const res = await fetch('https://paas-examen-omar-perez-cano.us-south.cf.appdomain.cloud/get-tone', options);
        

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
    });
    }
    else {
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