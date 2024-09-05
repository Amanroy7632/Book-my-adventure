const cluster = require('cluster');
const http = require('http');
const os = require('os');

// Get the number of available CPU cores
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  // Fork workers based on the number of CPUs
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for dying workers and restart them
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Starting a new worker');
    cluster.fork();
  });

} else {
  // Workers can share the same TCP connection in this case (same HTTP server)
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from Worker ${process.pid}\n`);
  }).listen(8000);

  console.log(`Worker process ${process.pid} started`);
}
