import axios, { AxiosInstance } from "axios";

export abstract class AxiosApi {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    private readonly apiKey: string,
    private readonly baseUrl: string,
    private readonly host?: string
  ) {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "X-RapidAPI-Key": this.apiKey,
        "X-RapidAPI-Host": this.host || undefined,
      },
    });
  }

  async get(endpoint: string, params = {}) {
    try {
      const response = await this.axiosInstance.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
