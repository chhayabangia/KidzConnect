console.log('Test script running...');

const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/test',
  method: 'GET'
};

console.log('Making request to http://localhost:5001/test');

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`BODY: ${data}`);
    console.log('Request completed');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();

console.log('Test script finished');
