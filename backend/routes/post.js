import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../model/post.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_COLUD_NAME,
    api_key: process.env.CLOUDINARY_PAI_KEY,
    api_secret: process.env.CLOUDINARY_PAI_SECRET
})

const router = express.Router();
router.route('/').get( async (reg, res) => {
    try{
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts});
    } catch(err){
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'Something went wrong with fetching the posts'
            })
    }
});

router.route('/').post(async(req, res) => {
    try{
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await Post.create({
            name, 
            prompt,
            photo: photoUrl.url
        });
        res.status(200).json({ success: true, data: newPost});
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Unable to create the post'
        })
    }
})
export default router;