import * as bodyParser from "body-parser";
const path = require('path');
import * as express from "express";
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');
import { TaskService } from "./service/task.service";

class App {

    public express: express.Application;
    public taskServices: TaskService;
    private mode: String;

    /* Swagger files start */
    private swaggerFile: any = (process.cwd()+"/swagger/swagger.json");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);
    /* Swagger files end */


    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.mode = "demo";
        this.taskServices = new TaskService();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(path.join(__dirname, '../ui/build')));
    }

    private routes(): void {

        this.express.post("/api/get-card-number", async (req, res) => {
            console.log(req.body);
            if(this.mode === "demo")
                res.json(await this.taskServices.getRandomCardNumber(req.body.name));
            else if(this.mode === "live")
                res.json(await this.taskServices.getCardNumber(req.body.name));
            
        });

        this.express.post("/api/set-mode", (req, res) => {
            console.log(req.body);
            this.mode = req.body.mode;
            res.json({error: false, mode: this.mode});
        });

        this.express.get("/api/get-mode", (req, res) => {
            console.log(req.body);
            res.json({error: false, mode: this.mode});
        });

        this.express.get("/", (req, res, next) => {
            res.sendFile(path.join(__dirname, '../ui/build/index.html'));
        });

        // swagger docs
        this.express.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("404: Not Found");
        });
    }
}

export default new App().express;