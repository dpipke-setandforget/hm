import { google } from 'googleapis';
import keys from '../../../../credentials.json';
import { Readable } from 'stream';

// Function to convert base64 string to a stream
const base64ToStream = (base64str) => {
  const buffer = Buffer.from(base64str, 'base64');
  const stream = new Readable({
    read() {} // Implement the read method to avoid errors
  });
  stream.push(buffer);
  stream.push(null); // Indicates the end of the stream
  return stream;
};

async function POST(req, res) {
  // Initialize Google Auth client with Drive scope
  const data = await req.json()
  const client = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null,
    process.env.PRIVATE_KEY,
    ['https://www.googleapis.com/auth/drive.file']
  );

  // Initialize Google Drive client
  const drive = google.drive({ version: 'v3', auth: client });

  const fileMetadata = {
    name: data.invoiceNr, // Provide a name for the uploaded file
    // Optionally specify a folder ID to upload to a specific folder
    parents: ['1Fxcyp5eMk1bHv4ezWbR_zVg0SwhvgAm2']
  };

  const fileStream = base64ToStream(data.file);

  const media = {
    mimeType: 'image/jpeg',
    body: fileStream, // Use the stream as the body for the upload
  };

  try {
    // Upload file to Google Drive
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id' // Return only the file ID
    });

    return Response.json(file);
  } catch (error) {
    console.error('Error uploading file to Drive:', error.message);
    return Response.json({ error: error.message });
  }
  
  }
  
  export  { POST }