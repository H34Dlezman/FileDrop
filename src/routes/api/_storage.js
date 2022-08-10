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
         Key: await generateFileKey(name),
         Body: await fs.readFile('files/file'),
         "Content-Type": type
        };
        let uploadResult = await s3.upload(params).promise() //deleteObject key bucket
        console.log(uploadResult)
        return { location: uploadResult.Location }
    } catch(err) {
        console.log("bucket error: ",err)
        return -1
    }

}

export async function deleteFile(key) {
    try {
        var params = {
         Bucket: 'vifz',
         Key: key
        };
        let deleteResult = await s3.deleteObject(params).promise()
        console.log(deleteResult)
        return deleteResult
    } catch(err) {  //CHECK FOR SERVER/CONNECTION ERROR !!!!!!!!!!!!
        console.log("bucket error: ",err)
        return -1
    }
}

export async function generateFileKey(name){
    try {
        var params = {
         Bucket: 'vifz',
         Key: name
        };
        let getResult = await s3.getObject(params).promise()
        console.log(getResult)
        var extension = ""
        if (name.indexOf(".")) extension = name.slice(name.lastIndexOf("."))
        return await generateFileKey(Array(10).fill().map(()=>((Math.random()*36)|0).toString(36)).join('')+extension)
    } catch(err) {  //CHECK FOR SERVER/CONNECTION ERROR !!!!!!!!!!!!
        console.log("bucket error: ",err)
        return name
    }
}