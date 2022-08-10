import AWS from "aws-sdk";
import { promises } from 'fs';
const fs = promises

const ep = new AWS.Endpoint("http://107.189.13.101:8333");

AWS.config.update({
  endpoint: ep,
  accessKeyId: "myAccessKey",
  secretAccessKey: "mySecretAccessKey",
  s3ForcePathStyle: true
});
const s3 = new AWS.S3();

export async function uploadFile(file, name, type) {
    console.log("/api upload to bucket")
    console.log(`size: ${file.length} ; name: ${name} ; type: ${type}`)

    await fs.writeFile('files/file', file, {encoding: 'base64'})

    try {
        var params = {
         Bucket: 'vifz',
         Key: name,
         Body: await fs.readFile('files/file'),
         "Content-Type": type
        };
        let uploadResult = await s3.upload(params).promise()
        console.log(uploadResult)
        return { location: uploadResult.Location }
    } catch(err) {
        console.log("bucket error: ",err)
        return -1
    }

}
