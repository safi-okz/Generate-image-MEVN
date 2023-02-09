import { surpriseMePrompts } from './constant.js';
import FileSaver from 'file-saver'

export function getRandomPrompts(prompt){
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompts = surpriseMePrompts[randomIndex];
    if(randomPrompts === prompt) return getRandomPrompts(prompt);
    return randomPrompts;
}

export async function downloadImage(_id, photo){
        FileSaver.saveAs(photo, `download-${_id}.jpg`);
}