import { app } from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import os from "os"
import cluster from "cluster"
import { creatorDetails,logWorkersTableDB ,getMemoryUsage,getCpuUsage} from "./arts/Ascii.js"
dotenv.config({
    path: "./.env"
})


const numCPUs = os.cpus().length;

const connectionInstance = await connectDB()

if (cluster.isMaster) {
    console.log("\x1b[34m%s\x1b[0m",`\nMaster process with PID: '${process.pid}' is running.`);
    creatorDetails()
    // console.log("\n+-----------+---------+-------+");
    // console.log("| Worker ID | PID     | Status|");
    // console.log("+-----------+---------+-------+");
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
        // process.stdout.write('Logging without newline...');
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log("\x1b[31m%s\x1b[0m",`worker ${worker.process.pid} died`);
        const newWorker = cluster.fork()
        console.log("\x1b[32m%s\x1b[0m",`Starting a new worker with PID ${newWorker.process.pid}`);
    })
    console.log("\x1b[36m%s\x1b[0m",`\n 👉 All Information about the new worker and process is available. ❤️ ╭❤️～`);
    
    
    console.log("\x1b[35m%s\x1b[0m","\n+-----------+---------+-------+-----------+----------+------+--------------------------------------------+--------------+---------+-------+--------+");
    console.log("| Worker ID | PID     | Status| DB Status | Listning | PORT | \t \t\tHOST \t\t\t | \tOS\t| Uptime  | CPU   | Memory |");
    console.log("\x1b[35m%s\x1b[0m","+-----------+---------+-------+-----------+----------+------+--------------------------------------------+--------------+---------+-------+--------+");
    
} else {
    if (connectionInstance) {
        const port = process.env.PORT || 5000
        app.listen(port, () => {
            const workerId = cluster.worker.id;
            const dbStatus = "Connected";
            const dbHost = connectionInstance?.connection.host;
            const uptime = Math.floor(os.uptime()%60)         
            logWorkersTableDB(workerId, process.pid, port, dbStatus, dbHost,os.type(),`${uptime}s`,getCpuUsage(workerId),getMemoryUsage(workerId));
        })
        if (cluster.isWorker) {
            process.on('SIGTERM', () => {
                console.log("\x1b[31m%s\x1b[0m",`Worker ${process.pid} shutting down...`);
                server.close(() => {
                    process.exit();
                });
            });
        }
    }
    
}

// connectDB().then((connectionInstance) => {
//     // console.log(`Database Connected By Worker with PID: ${process.pid} || Hosted: ${connectionInstance.connection.host}`)

    
// }).catch((err) => {
//     console.log(`Mongodb connection failed:${err}`)
// })
