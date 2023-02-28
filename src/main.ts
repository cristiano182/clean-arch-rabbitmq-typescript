import server from './server'
import PostRouter from './presentation/post/routes'

(async () => {

    server.use("/post", PostRouter())
    server.listen(3000, () => console.log("Running on http://localhost:3000"))

})()