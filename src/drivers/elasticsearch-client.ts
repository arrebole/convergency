import axios from 'axios';
import { AxiosInstance } from 'axios';
import { Client } from './client';
import { CreateElasticsearchClientOptions } from './client-options';

export class ElasticSearchClient implements Client {
  constructor(
    private readonly options: CreateElasticsearchClientOptions
  ) {
    this.httpService = axios.create({
      baseURL: `http://${options.host}/${this.options.index}/${this.options.type}`,
    });
  }

  private httpService: AxiosInstance;

  create(data: any): Promise<void> {
    return this.httpService.put(`/${data[this.options.key]}`, data);
  }

  update(data: any): Promise<void> {
    return this.httpService.put(`/${data[this.options.key]}`, data);
  }

  delete(data: any): Promise<void> {
    return this.httpService.delete(`/${data[this.options.key]}`);
  }
}