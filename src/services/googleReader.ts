
import { ICsvReader } from './interfaces/ICsvReader'
import * as fs from 'fs'
import readline from 'readline'
import { google } from 'googleapis'
export class GoogleReader implements ICsvReader {

  private SCOPES: string[] = ['https://www.googleapis.com/auth/drive.readonly'];
  private TOKEN_PATH: string = 'token.json'

  public readFile = async <T>(filepath, parserFn, lookupData?): Promise<any> => {
    var tokenPath = this.TOKEN_PATH;
    return new Promise(function(resolve, reject) { 
      fs.readFile('credentials.json', 'utf8', (err, content) => {
      if (err) reject(err);

      authorize(JSON.parse(content), listFiles, tokenPath).then((response) => {
        resolve(response)
      })
    });

    async function authorize(credentials, callback, tokenpath) {
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
        return new Promise(function(presolve, preject) { 
        fs.readFile(tokenpath, (err, token: any) => {
        if (err) return preject(getAccessToken(oAuth2Client, callback));
        oAuth2Client.setCredentials(JSON.parse(token));
        
        callback(oAuth2Client).then((response) => {
          presolve(response)
        });
      });
    })
    }

    function getAccessToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: this.SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error('Error retrieving access token', err);
          oAuth2Client.setCredentials(token);
          fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', this.TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    }

    async function listFiles(auth) {
      var sheets = google.sheets('v4');
      var fileId = ;
      var request = {
        spreadsheetId: fileId,
        range: filepath,
        auth: auth,
      };
      return new Promise(function(presolve, preject) { 
        sheets.spreadsheets.values.get(request, function (err, response) {
        if (err) {
          preject(err)
        }
        presolve(response.data.values)
      });
    })
    }
  })
}
}