import { Storage } from '@google-cloud/storage'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gc = new Storage({
    keyFilename: path.join(__dirname, "../clouddocsumm-2ca4aacfeb94.json"),
    projectId: 'clouddocsumm'
})
const bucket = gc.bucket('cloud-doc-summ-bucket');

export const getBucket = () => bucket