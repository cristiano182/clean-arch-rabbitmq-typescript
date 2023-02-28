import { HttpResponse } from "../../infra/protocols/http";


export abstract class GetPostsApplicationInterface { 
   abstract execute(): Promise<HttpResponse>; 
}