"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//Parsers
app.use(express_1.default.json());
app.use(express_1.default.text());
//Router
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use("/user", userRouter);
app.use("/course", courseRouter);
userRouter.post("/create_user", (req, res) => {
    const user = req.body;
    console.log(user);
    res.send({
        success: true,
        message: "successfully created",
        body: user
    });
});
courseRouter.post("/create_course", (req, res) => {
    const course = req.body;
    console.log(course);
    res.send({
        success: true,
        message: "Successfully created",
        data: { course }
    });
});
//middelware
const logger = (req, res, next) => {
    // console.log(req.url, req.method, req.hostname);
    next();
};
app.get('/', logger, (req, res) => {
    res.send('Hello Developers world of bangladesh!');
});
app.get('/users', (req, res, next) => {
    try {
        //  res.send(email)
    }
    catch (err) {
        next(err);
    }
});
app.post('/', (req, res) => {
    console.log(req.body);
    res.json({
        message: 'Successfully recive data'
    });
});
// any route not match then res this error
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        error: "page not found"
    });
});
//global error handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            error: "Something went error"
        });
    }
});
exports.default = app;
