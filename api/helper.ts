import {AxiosResponse} from 'axios';

export class helper {

  static slackOutList(list: AxiosResponse<any>) {
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

  static slackOut(item: AxiosResponse<any>) {
    var incidentsString = new String();
    const slackCodeBlock = "```";
    incidentsString +=
        `NAME:${item.data.name}, ID:${item.data.id}, STATUS:${item.data.status}\n`;
    incidentsString = slackCodeBlock+incidentsString+slackCodeBlock;
    return incidentsString.toString();
  }
}