import {ExpressServer} from "./restapi/ExpressServer";
import config from "config";

const port: number = config.get<number>("express.server.port");

ExpressServer.instance()
    .then(app => app.listen(port, () => console.log(`Express server listening on port ${port}`)));
