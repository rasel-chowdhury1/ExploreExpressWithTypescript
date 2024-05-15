// const express = require('express')
import express, { NextFunction, Request, Response } from 'express';
const app = express()

//Parsers
app.use(express.json())
app.use(express.text())

//Router
const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/user", userRouter);
app.use("/course", courseRouter);

userRouter.post("/create_user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  
  res.send({
    success: true,
    message: "successfully created",
    body: user
  })
})

courseRouter.post("/create_course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);

  res.send({
    success: true,
    message: "Successfully created",
    data: {course}
  })
})


//middelware
const logger = (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.url, req.method, req.hostname);
   next()
}
app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello Developers world of bangladesh!')
})

app.get('/users', (req: Request, res: Response, next: NextFunction) => {
  try{
    //  res.send(email)
  }catch(err){
      next(err)
  }
})

app.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: 'Successfully recive data'
  })
})

// any route not match then res this error
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "page not found"
  })
})


//global error handler
app.use((error: any, req:Request, res: Response, next: NextFunction) => {
   if(error){
    res.status(400).json({
      success: false,
      error: "Something went error"
    })
   }
})

export default app;