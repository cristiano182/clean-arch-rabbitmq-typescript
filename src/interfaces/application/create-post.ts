import { Post } from "../../domain/entities/post";
import { HttpResponse } from "../../infra/protocols/http";


export abstract class CreatePostApplicationInterface {
  abstract execute(post: Post): Promise<HttpResponse>;
}