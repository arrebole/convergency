import { Adapter, config } from './configure';
import { KafkaConsumerTaskBuilder } from './kafka';
import { ClientFactory } from './drivers/client-factory';
import { ConsumerEachMessagePayload } from 'kafkajs';
import { MaxwellMessage } from './message';
import { Client } from './drivers/client';
import { Logger } from './logger';


// 通过 adapters 构建客户端
function createAllClients(adapters: Adapter[]) {
  const clients = new Map<string, Client>();
  for (const adapter of adapters) {
    clients.set(
      makeClientKey(adapter),
      new ClientFactory().create(adapter.endpoint),
    );
  }
  return clients;
}

function makeClientKey(params: { database: string, table: string }) {
  return `${params.database}-${params.table}`;
}

async function main() {

  const logger = new Logger();
  const clients = createAllClients(config.adapters);

  // 处理 maxwell 的信息
  const messageHandler = async (payload: ConsumerEachMessagePayload) => {
    try {

      // json 序列化
      const content: MaxwellMessage = JSON.parse(
        payload.message.value?.toString() as string,
      );

      // 获取客户端
      const client = clients.get(makeClientKey(content));
      if (!client) {
        throw new Error(`客户端不存在 [${makeClientKey(content)}]`);
      }

      // 通过操作对数据进行同步
      switch (content.type) {
        case 'insert':
          await client.create(content.data);
          break;
        case 'update':
          await client.update(content.data);
          break
        case 'delete':
          await client.delete(content.data);
          break;
      }

      // 打印日志
      logger.log(
        '[%s] [%s/%s] [%s]',
        content.type,
        content.database,
        content.table,
        content.data,
      )

    } catch (e) {
      logger.error('[error] %o', e.message);
    }
  }

  new KafkaConsumerTaskBuilder()
    .setClientId(config.kafka.clientId)
    .setBrokers(config.kafka.brokers)
    .setGroupId(config.kafka.groupId)
    .subscribe(config.kafka.topic)
    .setEachMessageHandler(messageHandler)
    .build();
}

main();
