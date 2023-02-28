import { GetPostsApplicationInterface } from "../../interfaces/application/get-post";
import { PostGatewayInterface } from "../../interfaces/gateway/post-gateway";
import { HttpResponse } from "../../infra/protocols/http";

export class  GetPostsApplication implements GetPostsApplicationInterface {
    postGateway: PostGatewayInterface
    constructor(postGateway: PostGatewayInterface) {
        this.postGateway = postGateway
    }

    async execute(): Promise<HttpResponse> {
        return await this.postGateway.getPosts()
    }
    
}