const fastify = require('fastify')({
    logger: true
})

fastify.register(require("fastify-mongodb"), {
  forceClose: true,
  url: "mongodb://root:password@localhost:27017/wikidoc?authSource=admin",
})
fastify.register(require("./routes/document"))

fastify.get("/", function (req, reply) {
    reply.send({
        message: "Hello! Nothing here sorry! :)"
    });
});

// Run the server!
const run = async () => {
    try {
        await fastify.listen(3000, '0.0.0.0', function (err, address) {
            if (err) {
                fastify.log.error(err)
                process.exit(1)
            }
            // Server is now listening on ${address}
        })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
run()