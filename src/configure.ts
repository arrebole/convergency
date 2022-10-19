import configloader from 'config';

type Config = {
  kafka: Kafka;
  adapters: Adapter[];
}

type Adapter = {
  host: string
  database: string;
  table: string;
  endpoint: Endpoint;
}

type Endpoint = {
  driver: 'es6' | 'es7';
  index: string;
  type: string;
  host: string;
  key: string
  username?: string
  password?: string
}

type Kafka = {
  clientId: string
  groupId: string;
  topic: string;
  brokers: string[];
}

export const config: Config = {
  kafka: configloader.get('kafka'),
  adapters: configloader.get('adapters'),
}
