import type {AxiosInstance} from 'axios';

export class TemplateAPI {
  private readonly apiClient: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

    /**
   * Get a list of the 50 most recent incidents. This includes all unresolved
   * incidents as described above, as well as those in the *Resolved* and *Postmortem* state.
   */
     public async getAll(): Promise<any> {
      const endpoint = 'incident_templates';
      const {data} = await this.apiClient.get(endpoint);
      return data;
    }
}
