import axios, {AxiosInstance, AxiosResponse} from 'axios';
import { helper } from './helper';
import qs from 'qs';


export class IncidentsAPI {
  private readonly apiClient: AxiosInstance;
  //private readonly pageId: string;

  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }
  /**
   * Get a help message to indicate how interact with Slack bot
   */
  helpMessage() {
    const getAll = 'getAll(): Get list of all incidents\n';
    const getUnresolved = 'getUnresolved(): Get a list of unresolved incidents\n';
    const createIncident = 'createIncident(name, status, body): Create an incident\n';
    const updateIncident = 'updateIncident(incidentId, status): Update an incident status (identified -> investigating -> monitoring -> resolved)\n';
    const helpMsg = helper.helpMessage(
      getAll         +
      getUnresolved  +
      createIncident +
      updateIncident);
    return helpMsg;
  }

  /**
   * Get a list of the 50 most recent incidents. This includes all unresolved
   * incidents as described above, as well as those in the *Resolved* and *Postmortem* state.
   */
  public async getAll(): Promise<string> {
    const endpoint = "incidents";
    const incidentsJson = await this.apiClient.get(endpoint);
    return helper.slackOut(incidentsJson);
  }

  /**
   * Get a list of any unresolved incidents. This endpoint will only return
   * incidents in the *Investigating*, *Identified*, or *Monitoring* state.
   */
  public async getUnresolved(): Promise<string> {
    const endpoint = "incidents/unresolved";
    const incidentsJson = await this.apiClient.get(endpoint);
    return helper.slackOut(incidentsJson);
  }

  /**
   * Create a new incident with defined parameters. This endpoint will return
   * id of the new incident
   * incidents status should be one of these values: investigating*, *identified*, *monitoring*
   * *resolved, *scheduled, *in_progress, *verifying or *completed".
   */
  public async createIncident(name: string, status: string, body: string): Promise<string> {
    const endpoint = "incidents";

    var dataString = qs.stringify({
      'incident[name]': name,
      'incident[status]': status,
      'incident[body]': body
    });

    const d = await this.apiClient.post(endpoint, dataString);
    return JSON.stringify(d.data);
  }


  public async updateIncident(incidentId: string, status: string): Promise<string> {
    try {
      const endpoint = `incidents/${incidentId}`;

      var dataString = qs.stringify({
        'incident[status]': status
      });

      const d = await this.apiClient.put(endpoint, dataString);
      return JSON.stringify(d.data);
    }
    catch (error) {
      return "Error!\nUpdate the incident: identified -> investigating -> monitoring -> resolved"
    }
  }
}