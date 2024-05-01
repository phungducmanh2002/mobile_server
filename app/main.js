const { GetEnvValueByKey } = require("../Project/project.utils");
const app = require("./app");
const http = require("http");
const server = http.createServer(app);

const ENVIROMENT = GetEnvValueByKey("ENVIROMENT");
const PORT = GetEnvValueByKey("PORT") || 3000;

server.listen(PORT, () => {
  console.log(
    `-----------------------------------\n:\tProject started: \n:\t\tEnviroment: ${ENVIROMENT} \n:\t\tPort: ${PORT}\n-----------------------------------\n`
  );
});
