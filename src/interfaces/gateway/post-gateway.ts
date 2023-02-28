import { Post } from "../../domain/entities/post";
import { HttpResponse } from "../../infra/protocols/http";


export abstract class PostGatewayInterface {
 abstract createPost(post: Post): Promise<HttpResponse> 
 abstract getPosts(): Promise<HttpResponse> 
}