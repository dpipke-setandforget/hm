import { google } from 'googleapis';
import keys from '../../../../credentials.json';

async function GET(req, res) {
  // Initialize the Google Sheets API client
  const client = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null,
    process.env.PRIVATE_KEY,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  const sheets = google.sheets({ version: 'v4', auth: client });

  // Handle the GET request
  if (req.method === 'GET') {
    const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
    const range = req.nextUrl.searchParams.get('range');
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return Response.json(response.data.values);
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
}

async function POST(req, res) {
  // Initialize the Google Sheets API client
  const data = await req.json();
  
  const client = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null,
    process.env.PRIVATE_KEY,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  const sheets = google.sheets({ version: 'v4', auth: client });

  // Handle the POST request
    const spreadsheetId = data.spreadsheetId; 
    const range = data.range; 
    const values = data.values; 

    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW', // Or 'USER_ENTERED'
        insertDataOption: 'INSERT_ROWS', // Optional
        resource: {
          values: values, // 2D array of values to append
        },
      });

      // Respond with the appended values or some success message
      return  Response.json(response.data);
    } catch (error) {
      // Handle errors, such as invalid spreadsheetId or range, or API errors
      return  Response.json({ error: error.message });
    }

}

export  { GET, POST }