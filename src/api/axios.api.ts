import axios, { AxiosInstance } from "axios";

export abstract class AxiosApi {
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  async get(endpoint: string, params = {}, headers = {}) {
    try {
      const response = await this.axiosInstance.get(endpoint, {
        params,
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
