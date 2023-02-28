import { Post } from "../entities/post";
import { CreatePostApplicationInterface } from "../../interfaces/application/create-post";
import { PostGatewayInterface } from "../../interfaces/gateway/post-gateway";
import { HttpResponse } from "../../infra/protocols/http";



export class CreatePostApplication implements CreatePostApplicationInterface {

    constructor (private postGateway: PostGatewayInterface){}
    
    async execute(post: Post): Promise<HttpResponse> {
        return this.postGateway.createPost(post)
    }

}