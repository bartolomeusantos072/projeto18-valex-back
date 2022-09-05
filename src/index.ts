import express, { json } from "express";
import cors from 'cors';
import "express-async-errors";
import router from "./routers/index";
import errorHandlerMiddleWare from "./middlewares/errorHandlerMiddleWare";
import dotenv from "dotenv";
dotenv.config();


const server = express();
server.use(json(),
    cors(),
    router,
    errorHandlerMiddleWare
);

const port: number = Number(process.env.PORT) || 4000;


server.listen(port, () => {
    console.log(`Server up and running on port ${port}`)
});