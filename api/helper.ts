import {AxiosResponse} from 'axios';

export class helper {

  static slackOut(list: AxiosResponse<any>) {
    var incidentsString = new String();
    var counter = 1;
    const slackCodeBlock = "```";
    for (let item of list.data) {
      incidentsString +=
        `${counter++}. NAME:${item.name}, ID:${item.id}, STATUS:${item.status}\n`;
    }
    incidentsString = slackCodeBlock+incidentsString+slackCodeBlock;
    return incidentsString.toString();
  }

  static helpMessage(msg: string) {
    const slackCodeBlock = "```";
    return slackCodeBlock + msg + slackCodeBlock;
  }

}