import { randomUUID } from "crypto";
import { Post } from "../domain/entities/post";
import { RabbmitMQHelper } from '../infra/database/rabbitmq';
import { HttpResponse, notFound, success } from '../infra/protocols/http';
import { PostGatewayInterface } from "../interfaces/gateway/post-gateway";


export class PostGatewayRabbitMQ  implements PostGatewayInterface {

    async createPost(post: Post): Promise<HttpResponse> {
        const rabbitClient = await RabbmitMQHelper.getClient();
        const id =   randomUUID()
        const payload = { 
            id,
           ...post
        }
       await new Promise<void>((resolve) => {
        try {
            rabbitClient.sendToQueue('myQueue', Buffer.from(JSON.stringify(payload)))
            resolve()
        } catch (error) {
            return notFound('post not found');
        }
       })
       return success(payload);
      }

      async getPosts(): Promise<HttpResponse> {
        const rabbitClient = await RabbmitMQHelper.getClient();
   
        const message =  await rabbitClient.consume('myQueue', (msg: any) => {
            console.log(msg.content)

          })
            console.log(message)
       
       return success(message);
      }
 
}