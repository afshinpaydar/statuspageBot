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

  static slackOut(item: AxiosResponse<any>) {
    var incidentsString = new String();
    const slackCodeBlock = "```";
    incidentsString +=
        `NAME:${item.data.name}, ID:${item.data.id}, STATUS:${item.data.status}\n`;
    incidentsString = slackCodeBlock+incidentsString+slackCodeBlock;

    return incidentsString.toString();
  }

  static isEmpty(obj: AxiosResponse<any>) {
    if(obj.data.length === 0) {
      return true;
    }
    return false;
  }

  static templateBody(templateList: AxiosResponse<any>, templateId: string):JSON {
    var templateString = <JSON> {};
    for (let template of templateList.data) {
      if (template.id === templateId){
        templateString = <JSON><unknown>{
          'title': template.title,
          'body': template.body
        };
        break;
      }
    }

    return templateString
  }

}