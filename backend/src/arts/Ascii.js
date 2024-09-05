import os from "os";
function logWorkersTable(worker) {
  console.log(
    `| ${worker.id.toString().padEnd(9)} | ${worker.process.pid
      .toString()
      .padEnd(7)} | ${worker.isDead() ? "Dead" : "Alive"} |`
  );
  console.log("+-----------------------------+");
  workerInfo.push({
    id: worker.id,
    processId: worker.process.pid,
    status: worker.isDead() ? "Dead" : "Alive",
  });
}
function logWorkersTableDB(
  workerId,
  pid,
  port,
  dbStatus,
  host,
  osName = "",
  uptime = "",
  cpu = "",
  memoryUsages = ""
) {
  console.log(
    "\x1b[32m%s\x1b[0m",
    `| ${workerId.toString().padEnd(9)} | ${pid
      .toString()
      .padEnd(7)} | ${"Alive".padEnd(3)} | ${dbStatus.padEnd(
      6
    )} | ${"Yes".padEnd(8)} | ${port
      .toString()
      .padEnd(
        5
      )}| ${host} |  ${osName}  | ${uptime}\t  | ${cpu} | ${memoryUsages}  |`
  );
  console.log(
    "\x1b[35m%s\x1b[0m",
    "+-----------+---------+-------+-----------+----------+------+--------------------------------------------+--------------+---------+-------+--------+"
  );
}
function creatorDetails() {
  console.log(
    "\x1b[33m%s\x1b[0m",
    "\t\t\t+--------------------🚀--------------------+"
  );
  console.log(
    "\x1b[34m%s\x1b[0m",
    `\t\t\t| CREDIT & AUTHOR: Mr. AMAN KUMAR YADAV    |\n\t\t\t| Email \t : yadavaman7632@gmail.com |`
  );
  console.log(
    "\x1b[34m%s\x1b[0m",
    `\t\t\t| GITHUB\t : @amanroy7632.           |`
  );
  console.log(
    "\x1b[33m%s\x1b[0m",
    "\t\t\t+------------------------------------------+"
  );
}
const cpus = os.cpus();
function getCpuUsage(workerId) {
  const times = cpus[workerId - 1].times;
  const total = Object.values(times).reduce((acc, tv) => acc + tv, 0);
  const usage = ((total - times.idle) / total) * 100;
  return `${usage.toFixed(2)}%`;
}
function getMemoryUsage(workerId) {
  const times = cpus[workerId - 1].times;
  const total = Object.values(times).reduce((acc, time) => acc + time, 0);
  const usage = ((total - times.idle) / total) * 100;
  return `${((times.user / total) * 100).toFixed(2)}%`;
}
const asciiArt = `
AAAAA    M     M      AAAAA   N    N     Y     Y   AAAAA   DDDDD    AAAAA   V     V
A     A   MM   MM     A     A  NN   N      Y   Y   A     A  D    D  A     A  V     V
A       A  M M M M    A       A N N  N       Y Y   A       A D     D A       A V   V
AAAAAAAAA  M  M  M    AAAAAAAAA N  N N        Y    AAAAAAAAA D     D AAAAAAAAA  V V
A       A  M     M    A       A N   NN        Y    A       A D    D  A       A   V
A       A  M     M    A       A N    N        Y    A       A DDDDD   A       A   V
`;
export {
  logWorkersTable,
  logWorkersTableDB,
  creatorDetails,
  asciiArt,
  getCpuUsage,
  getMemoryUsage,
};
