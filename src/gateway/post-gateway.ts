import { randomUUID } from "crypto";
import { Post } from "../domain/entities/post";
import { RedisHelper } from '../infra/database/redis';
import { HttpResponse, notFound, success } from '../infra/protocols/http';
import { PostGatewayInterface } from "../interfaces/gateway/post-gateway";


export class PostGateway  implements PostGatewayInterface {
    async createPost(post: Post): Promise<HttpResponse> {
        const redisClient = await RedisHelper.getClient();
        const id =   randomUUID()
        const payload = { 
            id,
           ...post
        }
       await redisClient.set(id, JSON.stringify(payload));
        const res = await redisClient.get(id);
        if (!res) return notFound('post not found');
        return success(JSON.parse(res));
      }

      async getPosts(): Promise<HttpResponse> {
        const redisClient = await RedisHelper.getClient();
        const keys = await redisClient.keys('*');
        if (!keys) return notFound('post not found');
        const values = await redisClient.mget(keys);
        return success(values);
      }
 
}