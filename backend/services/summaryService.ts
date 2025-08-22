import { SummaryObject } from '../models/summaryObject.js'
import { getBucket } from './googleCloud.js'
import { getSummaryWithTitle } from './summarizer.js'
import path from 'path';

// Pdf parse bug workaround
import {createRequire} from 'module';
import { retrieveDocument, retrieveDocuments } from './firebase.js';
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");


async function extractTextFromDoc(pdfBuffer : Buffer) : Promise<string> {
    const data = await pdfParse(pdfBuffer)
    return data.text;
}

function createUniqueFilenameUrl(filename : string) : string {
    const parsed = path.parse(filename);
    const uniqueFilename = `${parsed.name}-${Date.now()}${parsed.ext}`
    const encoded = encodeURIComponent(uniqueFilename)
    return encoded;
}

async function uploadDocument(document : Buffer, filename : string) : Promise<string> {
    return new Promise((resolve, reject) => {
        const uniqueFilename = createUniqueFilenameUrl(filename)
        const bucket = getBucket()
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

function separateTitleText(text: string) : { title : string, summary : string } {
    const split = text.trim().split('\n');
    if(split.length < 2)
        throw Error("There was an error generating a title for this document.");
    const title = split[0];
    const summary = split.slice(1).join('\n').trim();
    return {
        title: title,
        summary: summary
    }
}

export async function constructSummaryObject(pdfBuffer : Buffer, filename : string, userId : string) : Promise<SummaryObject> {
    const text = await extractTextFromDoc(pdfBuffer);
    const url = await uploadDocument(pdfBuffer, filename); 
    const summaryWithTile = await getSummaryWithTitle(text);
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

export async function getSummaryObject(docId : string) : Promise<SummaryObject> {
    const doc = await retrieveDocument(docId);
    return doc;
}

export async function getSummaryObjects(userId) : Promise<SummaryObject[]> {
    const docs = await retrieveDocuments(userId);
    return docs;
}