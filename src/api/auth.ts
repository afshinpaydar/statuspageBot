import { KnownEventFromType } from '@slack/bolt';

export class auth {

  static authorize(message: KnownEventFromType<"message">):boolean {
    const fs = require('fs');
    const path = require('path');
    const configFile = fs.readFileSync(path.resolve(__dirname, '../config.json'));
    const config = JSON.parse(configFile);

    let channelOk = false;
    let userOk = false;

    const userId = JSON.parse(JSON.stringify(message))['user'];
    const channelId = JSON.parse(JSON.stringify(message))['channel'];

    for (let channel of config.allow_channels) {
      if ( channel === channelId ){
        channelOk = true;
        break;
      }
    }

    for (let user of config.allow_users) {
      if ( user === userId ){
        userOk = true;
        break;
      }
    }

    return channelOk && userOk;
  }

}