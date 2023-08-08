import axios, { AxiosInstance } from 'axios';

interface Config {
  baseURL: string;
}

export class HTTP {
  private instance: AxiosInstance;

  constructor(config?: Config) {
    this.instance = axios.create(config ? config : { baseURL: 'http://localhost:3000' });
  }

  post(url: string, data: any) {
    return this.instance.post(url, data, { headers: { Accept: 'application/json' } });
  }
}
