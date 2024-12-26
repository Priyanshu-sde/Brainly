import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middlewares";

const app = express();
app.use(express.json());


app.post("/api/v1/signup", async(req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({
            username: username,
            password: password
        })


        res.json({
            message : "User signed up"
        })
    } catch(e){
        res.status(411).json({
            message: "User already exists"
        })
    }

})

app.post("/api/v1/signin", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })

    if(existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

app.post("/api/v1/content", async (req,res) => {
    const title = req.body.title;
    const link = req.body.link;
    const tags = req.body.tags;
    const userId = req.body.userId;

    try{
        await ContentModel.create({
            //@ts-ignore
            title: title,
            links: link,
            tags:tags
        })
    }catch(e){
        res.status(411).json({
            message: "Failed"
        })
    }

})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
})


app.listen(3000);