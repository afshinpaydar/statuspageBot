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

app.message("getall", async ({ message, say }) => {
  try {
     say("List of all incidents:");
     say(await incidentapi.getAll());
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

app.message("getunresolved", async ({ message, say }) => {
  try {
    say("List of unresolved incidents:");
    say(await incidentapi.getUnresolved() );
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

app.message("createincident", async ({ message, say, event, payload }) => {
  try {
    //say(await incidentapi.createIncident("test1", "investigating", "test1" ));
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});


 app.event('test', async ({ event, context }) => {
  console.log(event);
 });

app.message("message", async ({ message, say }) => {
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
