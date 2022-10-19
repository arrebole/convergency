import * as assert from 'assert';
import { Kafka, Consumer, ConsumerSubscribeTopics, ConsumerEachMessagePayload } from 'kafkajs';

export class KafkaConsumerTaskBuilder {
  private clientId: string
  private brokers: string[]
  private groupId: string
  private subscribeTopics: string[]
  private eachMessageHandler: any;

  setClientId(clientId: string) {
    this.clientId = clientId;
    return this;
  }

  setBrokers(brokers: string[]) {
    this.brokers = brokers;
    return this;
  }

  setGroupId(groupId: string) {
    this.groupId = groupId;
    return this;
  }

  subscribe(topic: string) {
    this.subscribeTopics = [topic];
    return this;
  }

  setEachMessageHandler(fn: (payload: ConsumerEachMessagePayload) => any) {
    this.eachMessageHandler = fn;
    return this;
  }

  async build() {

    const kafka = new Kafka({
      clientId: this.clientId,
      brokers: this.brokers,
    });

    const consumer = kafka.consumer({
      groupId: this.groupId,
    });

    await consumer.connect();

    await consumer.subscribe({
      topics: this.subscribeTopics,
      fromBeginning: false,
    });

    await consumer.run({
      eachMessage: this.eachMessageHandler,
    });

    return consumer;
  }
}