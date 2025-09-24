import { Storage } from '@google-cloud/storage'

const gc = new Storage();

const bucketName = process.env.GCS_BUCKET || 'cloud-doc-summ-bucket';
const bucket = gc.bucket(bucketName);

export const getBucket = () => bucket