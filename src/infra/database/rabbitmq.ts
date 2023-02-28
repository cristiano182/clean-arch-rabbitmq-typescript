import {connect, Connection, Channel} from 'amqplib'

export class RabbmitMQHelper {
  static connection: Connection;
  static channel: Channel;

  static async getClient(): Promise<Channel> {
    if (!this.connection) {
      this.connection = await connect('amqp://username:password@rabbitmq:5672')
      this.channel = await this.connection.createChannel()
      await this.channel.assertQueue('myQueue')
    }
    return this.channel;
  }
}