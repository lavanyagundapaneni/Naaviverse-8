import axios from 'axios';
import * as jose from 'jose';
import { predefinedToast } from './toast';
import AWS from 'aws-sdk';

const secret = 'uyrw7826^&(896GYUFWE&*#GBjkbuaf'; // secret not to be disclosed anywhere.
const emailDev = 'pavithran@inr.group'; // email of the developer.

function renameFile(originalFile, newName) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
}

const signJwt = async (fileName, emailDev, secret) => {
  try {
    const jwts = await new jose.SignJWT({ name: fileName, email: emailDev })
      .setProtectedHeader({ alg: 'HS512' })
      .setIssuer('gxjwtenchs512')
      .setExpirationTime('10m')
      .sign(new TextEncoder().encode(secret));
    return jwts;
  } catch (error) {
    console.log(error, 'kjbedkjwebdw');
  }
};



AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

// Create an S3 instance
const s3 = new AWS.S3();

export const uploadImageFunc = async (e, setImage, setLoading) => {
  setLoading(true);

  const file = e.target.files[0];
  if (!file) {
    setLoading(false);
    return;
  }

  const timestamp = new Date().getTime();
  const fileName = `${timestamp}-${file.name}`;
  const folderPath = `partner-profile-pics/`; // You can change this to your desired folder

  const params = {
    Bucket: 'naaviprofileuploads', // Replace with your S3 bucket name
    Key: `${folderPath}${fileName}`,
    Body: file,
    ContentType: file.type,
  };

  try {
    const result = await s3.upload(params).promise();
    console.log('File uploaded successfully:', result);

    setImage(result.Location); // Store the S3 file URL
    setLoading(false);
    return result.Location;
  } catch (error) {
    console.error('Error uploading file:', error);
    setLoading(false);
  }
};
