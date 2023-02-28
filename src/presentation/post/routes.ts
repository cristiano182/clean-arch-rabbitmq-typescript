import express from 'express'
import { Request, Response } from 'express'
import { CreatePostApplication } from '../../domain/application/create-post'
import { GetPostsApplication } from '../../domain/application/get-post'
import { PostGateway } from '../../gateway/post-gateway'
import { PostGatewayRabbitMQ } from '../../gateway/post-rabbitmq-gateway'
import { CreatePostApplicationInterface } from '../../interfaces/application/create-post'
import { GetPostsApplicationInterface } from '../../interfaces/application/get-post'
import { PostGatewayInterface } from '../../interfaces/gateway/post-gateway'


export default function PostRouter() {
const postGateway: PostGatewayInterface = new PostGateway()
const postGatewayRabbitMQ: PostGatewayInterface = new PostGatewayRabbitMQ()

const createPostApplication: CreatePostApplicationInterface = new CreatePostApplication(postGateway)
const getPostsApplication: GetPostsApplicationInterface = new GetPostsApplication(postGateway)


const createPostApplicationRabbitmq: CreatePostApplicationInterface = new CreatePostApplication(postGatewayRabbitMQ)
const getPostsApplicationRabbitmq: GetPostsApplicationInterface = new GetPostsApplication(postGatewayRabbitMQ)


const router = express.Router()

    router.get('/', async (req: Request, res: Response) => {
        const post =  await getPostsApplication.execute()
        return res.status(post.statusCode).json(post.body);
    })

    router.post('/', async (req: Request, res: Response) => {
        const post = await createPostApplication.execute(req.body);
          return res.status(post.statusCode).json(post.body);
    })


    router.get('/rabbitmq', async (req: Request, res: Response) => {
        const post =  await getPostsApplicationRabbitmq.execute()
        return res.status(post.statusCode).json(post.body);
    })

    router.post('/rabbitmq', async (req: Request, res: Response) => {
        const post = await createPostApplicationRabbitmq.execute(req.body);
          return res.status(post.statusCode).json(post.body);
    })

    return router
}