import { google } from 'googleapis';
import keys from '../../../../credentials.json';

async function handlerGetSheet(req, res) {
  console.log("method ", req)
  // Initialize the Google Sheets API client
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  const sheets = google.sheets({ version: 'v4', auth: client });

  // Handle the GET request
  if (req.method === 'GET') {
  const { spreadsheetId, range } = req.query;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    res.status(200).json(response.data.values);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
  // Handle the POST request
  else if (req.method === 'POST') {
  const { spreadsheetId, range, values } = req.body;

  try {
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Handle other methods
else {
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

}

export  { handlerGetSheet }