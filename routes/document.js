const {
  getSlugDocuments,
  getDocuments,
  addDocument,
} = require("../controllers/document.controller");

async function routes(fastify, options) {
    fastify.get("/:slugWord", getSlugDocuments)
    fastify.get("/search/:word", getDocuments)
    fastify.post("/index", addDocument) 
}

module.exports = routes