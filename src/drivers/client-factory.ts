import { Client } from "./client";
import { ElasticSearchClient } from "./elasticsearch-client"
import { CreateElasticsearchClientOptions } from './client-options';

export class ClientFactory {

  create(options: CreateElasticsearchClientOptions): Client {
    switch (options.driver) {
      case 'es6':
      case 'es7':
        return new ElasticSearchClient(options);
      default:
        throw new Error('不支持的客户端类型')
    }
  }
}