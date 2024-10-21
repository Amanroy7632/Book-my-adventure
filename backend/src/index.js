import { app, server, io } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import os from "os";
import cluster from "cluster";
import {
  creatorDetails,
  logWorkersTableDB,
  getMemoryUsage,
  getCpuUsage,
} from "./arts/Ascii.js";
dotenv.config({
  path: "./.env",
});

const numCPUs = os.cpus().length;

const connectionInstance = await connectDB();

if (cluster.isMaster) {
  console.log(
    "\x1b[34m%s\x1b[0m",
    `\nMaster process with PID: '${process.pid}' is running.`
  );
  creatorDetails();
  // console.log("\n+-----------+---------+-------+");
  // console.log("| Worker ID | PID     | Status|");
  // console.log("+-----------+---------+-------+");
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
    // process.stdout.write('Logging without newline...');
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log("\x1b[31m%s\x1b[0m", `worker ${worker.process.pid} died`);
    const newWorker = cluster.fork();
    console.log(
      "\x1b[32m%s\x1b[0m",
      `Starting a new worker with PID ${newWorker.process.pid}`
    );
  });
  console.log(
    "\x1b[36m%s\x1b[0m",
    `\n 👉 All Information about the new worker and process is available. ❤️ ╭❤️～`
  );

  console.log(
    "\x1b[35m%s\x1b[0m",
    "\n+-----------+---------+-------+-----------+----------+------+--------------------------------------------+--------------+---------+-------+--------+"
  );
  console.log(
    "| Worker ID | PID     | Status| DB Status | Listning | PORT | \t \t\tHOST \t\t\t | \tOS\t| Uptime  | CPU   | Memory |"
  );
  console.log(
    "\x1b[35m%s\x1b[0m",
    "+-----------+---------+-------+-----------+----------+------+--------------------------------------------+--------------+---------+-------+--------+"
  );
} else {
  if (connectionInstance) {
    // const userLocations = {};

    // io.on('connection', (socket) => {
    //   // console.log(socket.data);

    //   console.log('A user connected: ' + socket.id);
    //   socket.on("registerBus",(data)=>{
    //     console.log(data);

    //   })
    //   // Listen for location updates from the client
    //   socket.on('location', (locationData) => {
    //     console.log('Location data received from ' + socket.id + ':', locationData);

    //     // Store the location data for the user
    //     userLocations[socket.id] = locationData;

    //     // Broadcast the location data to all other connected clients
    //     socket.broadcast.emit('locationUpdate', {
    //       id: socket.id,
    //       latitude: locationData.latitude,
    //       longitude: locationData.longitude,

    //     });
    //     console.log(userLocations);
    //   });

    //   // When a user disconnects, remove their location
    //   socket.on('disconnect', () => {
    //     console.log('A user disconnected: ' + socket.id);
    //     delete userLocations[socket.id]; // Remove the user from the locations

    //     // Optionally, broadcast the disconnection
    //     socket.broadcast.emit('userDisconnected', socket.id);
    //   });
    // });

    // const userLocations = {}; // Store user locations
    // const buses = {}; // Store registered buses

    // io.on('connection', (socket) => {
    //   console.log('A user connected: ' + socket.id);

    //   // Listen for bus registration from the client
    //   socket.on("registerBus", (data) => {
    //     console.log('Bus registered:', data);

    //     // Store the bus data in the buses object
    //     buses[socket.id] = data; // Use socket.id as a key to associate bus data with the user

    //     // Send the bus data back to the client that just connected
    //     socket.emit("busData", {
    //       id: data.id,
    //       busNumber: data.busNumber,
    //       locationName: data.locationName,
    //     });
    //   });

    //   // Listen for location updates from the client
    //   socket.on('location', (locationData) => {
    //     console.log('Location data received from ' + socket.id + ':', locationData);

    //     // Store the location data for the user
    //     userLocations[socket.id] = locationData;

    //     // Broadcast the location data to all other connected clients
    //     socket.broadcast.emit('locationUpdate', {
    //       id: socket.id,
    //       latitude: locationData.latitude,
    //       longitude: locationData.longitude,
    //     });
    //     console.log(userLocations);
    //   });

    //   // When a user disconnects, remove their location and bus data
    //   socket.on('disconnect', () => {
    //     console.log('A user disconnected: ' + socket.id);
    //     delete userLocations[socket.id]; // Remove the user from the locations
    //     delete buses[socket.id]; // Remove the bus data

    //     // Optionally, broadcast the disconnection
    //     socket.broadcast.emit('userDisconnected', socket.id);
    //   });
    // });
    const userLocations = {}; // Store user locations
    const buses = {}; // Store registered buses

    io.on('connection', (socket) => {
      console.log('A user connected: ' + socket.id);

      // Listen for bus registration from the client
      socket.on("registerBus", (data) => {
        console.log('Bus registered:', data);

        // Store the bus data in the buses object
        buses[socket.id] = data; // Use socket.id as a key to associate bus data with the user

        // Send the bus data back to the client that just connected
        socket.emit("busRegistered", {
          id: data.id,
          busNumber: data.busNumber,
          locationName: data.locationName,
        });

        console.log("Bus registered with details:", buses[socket.id]);
      });

      // Listen for location updates from the client
      socket.on('location', (locationData) => {
        console.log('Location data received from ' + socket.id + ':', locationData);

        // Store the location data for the user
        userLocations[socket.id] = locationData;

        // Check if the bus is registered before broadcasting the location
        const bus = buses[socket.id];

        if (bus) {
          // Broadcast the location data with bus details to all other connected clients
          socket.broadcast.emit('locationUpdate', {
            id: socket.id,
            busId: bus.id, // Add bus ID to the broadcast
            busNumber: bus.busNumber, // Add bus number to the broadcast
            locationName: bus.locationName, // Bus location name
            latitude: locationData.latitude,
            longitude: locationData.longitude,
          });
        } else {
          console.log("Bus not registered for socket ID:", socket.id);
        }
        console.log("Current user locations:", userLocations);
      });

      // When a user disconnects, remove their location and bus data
      socket.on('disconnect', () => {
        console.log('A user disconnected: ' + socket.id);
        delete userLocations[socket.id]; // Remove the user from the locations
        delete buses[socket.id]; // Remove the bus data

        // Optionally, broadcast the disconnection
        socket.broadcast.emit('userDisconnected', socket.id);
      });
    });

    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      const workerId = cluster.worker.id;
      const dbStatus = connectionInstance ? "Connected" : "Disconnected";
      const dbHost = connectionInstance?.connection.host;
      const uptime = Math.floor(os.uptime() % 60);
      logWorkersTableDB(
        workerId,
        process.pid,
        port,
        dbStatus,
        dbHost,
        os.type(),
        `${uptime}s`,
        getCpuUsage(workerId),
        getMemoryUsage(workerId)
      );
    });
    if (cluster.isWorker) {
      process.on("SIGTERM", () => {
        console.log(
          "\x1b[31m%s\x1b[0m",
          `Worker ${process.pid} shutting down...`
        );
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
