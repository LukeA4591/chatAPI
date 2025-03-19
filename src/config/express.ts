import express from "express";
import bodyParser from "body-parser"

export default()=>{
    const app=express();
    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
        res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
        next();
    });
    app.use(bodyParser.json());
    require('../app/routes/user.server.routes.js')(app);
    return app;
};