
export type CreateElasticsearchClientOptions = {
  driver: 'es6' | 'es7';
  host: string
  index: string
  type: string
  key: string
  username?: string
  password?: string
}