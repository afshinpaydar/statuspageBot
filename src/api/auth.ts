
import { KnownEventFromType } from '@slack/bolt';

export class auth {

  static authorize(message: KnownEventFromType<"message">):boolean {
    const userId = JSON.parse(JSON.stringify(message))['user'];
    const channelId = JSON.parse(JSON.stringify(message))['channel'];
    
    if (userId === "U020GLSDS15" && channelId === "C02HQHK12L9" ){
      return true;
    }
    return false;
  }

}