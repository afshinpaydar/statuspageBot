import { App, LogLevel } from '@slack/bolt';
import * as dotenv from "dotenv";
dotenv.config({ path:'/.env' });
import {TemplateAPI,IncidentsAPI} from './api';
import axios from 'axios';

const PORT = 3000;
dotenv.config();

const API_KEY = process.env.API_KEY;
const PAGE_ID = process.env.PAGE_ID;

const apiClient = axios.create({
  baseURL: `https://api.statuspage.io/v1/pages/${PAGE_ID}`,
  headers : {'Authorization': `OAuth ${API_KEY}`}
});


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.APP_TOKEN,
  logLevel: LogLevel.ERROR,
  socketMode:true
});

const incidentapi = new IncidentsAPI(apiClient);

app.message("getall", async ({ say }) => {
  try {
     say("List of all incidents:");
     say(await incidentapi.getAll());
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

app.message("getunresolved", async ({ say }) => {
  try {
    say("List of unresolved incidents:");
    say(await incidentapi.getUnresolved() );
  } catch (error) {
    console.error(error);
  }
});

app.message("createincident", async ({ message, say }) => {
  const incidentName = JSON.parse(JSON.stringify(message))['text'].split(' ')[1];
  const incidentText = JSON.parse(JSON.stringify(message))['text'].split(' ').slice(1).join(' ');
  try {
    say(await incidentapi.
      createIncident(incidentName, incidentText));
  } catch (error) {
    console.error(error);
  }
});

app.message("updateincident", async ({ message, say }) => {
  const incidentId = JSON.parse(JSON.stringify(message))['text'].split(' ')[1];
  const incidentStatus = JSON.parse(JSON.stringify(message))['text'].split(' ')[2];
  try {
    say(await incidentapi.
      updateIncident(incidentId, incidentStatus));
  } catch (error) {
    console.error(error);
  }
});


//  app.event('message', async ({ message }) => {
//    console.log(JSON.parse(JSON.stringify(message))['text'].split(' ')[1]);
//  });

app.message("help", async ({ say }) => {
  try {
    say(incidentapi.helpMessage());
  } catch (error) {
    console.log("err")
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT) || PORT);
  console.log(`⚡️ Bolt app is running on port ${PORT}`);
})();
