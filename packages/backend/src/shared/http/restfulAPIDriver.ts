import { Server } from 'http';
import request from 'supertest';

export class RESTfulAPIDriver {
  constructor(private http: Server) {}

  post(url: string, data: any) {
    return request(this.http).post(url).send(data).set('Accept', 'application/json');
  }
}
