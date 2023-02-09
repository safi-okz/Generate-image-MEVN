import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY
});

const openai = new OpenAIApi(configuration);

const router = express.Router();
router.route('/').get((reg, res) => {
    res.status(200).json({massage: 'Hello from dalle'});
});

router.route('/').post(async (req, res) => {
    try{
        const { prompt } = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '512x512',
            response_format: 'b64_json'
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({
            photo: image
        });
    } catch(err) {
            console.log('image error ', err);
            res.status(500).send(err ? err.response.data.error.massage : "Someting went wrong")
    }
})
export default router;