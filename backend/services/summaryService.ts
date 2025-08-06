import { SummaryObject } from '../models/summaryObject.js'
import { Storage } from '@google-cloud/storage'
import path from 'path';
import { fileURLToPath } from 'url';

// Pdf parse bug workaround
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gc = new Storage({
    keyFilename: path.join(__dirname, "../clouddocsumm-2ca4aacfeb94.json"),
    projectId: 'clouddocsumm'
})
const bucket = gc.bucket('cloud-doc-summ-bucket');

async function extractTextFromDoc(pdfBuffer : Buffer) : Promise<string> {
    const data = await pdfParse(pdfBuffer)
    return data.text;
}

function createUniqueFilename(filename : string) : string {
    const parsed = path.parse(filename);
    const uniqueFilename = `${parsed.name}-${Date.now()}${parsed.ext}`
    return uniqueFilename;
}

async function uploadDocument(document : Buffer, filename : string) : Promise<string> {
    return new Promise((resolve, reject) => {
        const uniqueFilename = createUniqueFilename(filename)
        const file = bucket.file(uniqueFilename);
        const stream = file.createWriteStream({
            resumable: false,
            public: true // make file public for now
        });

        stream.on('error', (err) => {
            reject(err);
        });

        stream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueFilename}`;
            resolve(publicUrl);
        });

        stream.end(document);
    });
}

// TODO: request to vertex ai
function summarizeWithTitle(text: string) : string {
    return text.slice(0,Math.min(100,text.length));
}

function separateTitleText(text: string) : { title : string, summary : string } {
    const split = text.trim().split('\n');
    if(split.length < 2)
        throw Error("There was an error generating a title for this document.");
    const title = split[0];
    const summary = split.slice(1).join('\n');
    return {
        title: title,
        summary: summary
    }
}

export async function getSummaryObject(pdfBuffer : Buffer, filename : string, userId : number) : Promise<SummaryObject> {
    const text = await extractTextFromDoc(pdfBuffer);
    const url = await uploadDocument(pdfBuffer, filename); // not async on purpose
    const summaryWithTile = summarizeWithTitle(text);
    const { title, summary } = separateTitleText(summaryWithTile);
    const date = Date.now();
    return {
        summary: summary,
        title: title,
        url: url,
        userId: userId,
        dateUnix: date
    }
}