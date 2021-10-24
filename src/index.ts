import { App, LogLevel } from '@slack/bolt';
import * as dotenv from "dotenv";
dotenv.config({ path:'/.env' });
import {IncidentsAPI} from './api';
import { auth } from './api/auth';
import axios from 'axios';

const PORT = 3000;
dotenv.config();

const API_KEY = process.env.API_KEY;
const PAGE_ID = process.env.PAGE_ID;

const apiClient = axios.create({
  baseURL: `https://api.statuspage.io/v1/pages/${PAGE_ID}`,
  headers : {'Authorization': `OAuth ${API_KEY}`}
});

const unauthorizedMsg = "`You are not authorized or wrong channel!`";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.APP_TOKEN,
  logLevel: LogLevel.ERROR,
  socketMode:true
});

const incidentapi = new IncidentsAPI(apiClient);

app.message("get_all", async ({ message, say }) => {
  try {
    if (auth.authorize(message)) {
      say(await incidentapi.getAll());
    }
    else {
      say(unauthorizedMsg);
    }
  } catch (error) {
    console.error(error);
  }
});

app.message("get_unresolved", async ({ message, say }) => {
  try {
    if (auth.authorize(message)) {
      say(await incidentapi.getUnresolved() );
    }
    else {
      say(unauthorizedMsg);
    }
  } catch (error) {
    console.error(error);
  }
});

app.message("get_templates", async ({ message, say }) => {
  try {
     if (auth.authorize(message)) {
      say(await incidentapi.getTemplates());
    }
    else {
      say(unauthorizedMsg);
    }
  } catch (error) {
    console.error(error);
  }
});

app.message("create_incident", async ({ message, say }) => {
  const incidentName = JSON.parse(JSON.stringify(message))['text'].split(' ')[1];
  const templateId = JSON.parse(JSON.stringify(message))['text'].split(' ')[2];
  try {
      if (auth.authorize(message)) {
        say(await incidentapi.
          createIncident(incidentName, templateId));
      }
      else {
        say(unauthorizedMsg);
      }
  } catch (error) {
    console.error(error);
  }
});

app.message("update_incident", async ({ message, say }) => {
  const incidentId = JSON.parse(JSON.stringify(message))['text'].split(' ')[1];
  const incidentStatus = JSON.parse(JSON.stringify(message))['text'].split(' ')[2];
  try {
      if (auth.authorize(message)) {
        say(await incidentapi.
          updateIncident(incidentId, incidentStatus));
      }
      else {
        say(unauthorizedMsg);
      }
  } catch (error) {
    console.error(error);
  }
});


app.message("help", async ({ message, say }) => {
  try {
    if (auth.authorize(message)) {
      say(incidentapi.helpMessage());
    }
    else {
      say(unauthorizedMsg);
    }
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT) || PORT);
  console.log(`⚡️ Bolt app is running on port ${PORT}`);
})();
