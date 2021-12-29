sw = require("stopword")
const ObjectID = require("mongodb").ObjectID

async function getDocuments(req, reply) {
    const wordSearches = req.params.word
    const nonStopWords = removeStopWords(wordSearches)

    const documents = this.mongo.db.collection("documents")
    const resultMatched = await documents
      .find({
        $or: [
          { title: { $regex: nonStopWords, $options: "$i" } },
          { body: { $regex: nonStopWords, $options: "$i" } }
        ],
      })
      .toArray()

    const tags = getTags(resultMatched)
    const resultRelated = await Promise.all(
      tags.map(async (tag) => {
        return await documents
          .find({ tags: { $regex: tag.toString(), $options: "$i" } })
          .toArray()
      })
    )

    reply.send({
      matchedDocuments: resultMatched,
      relatedDocuments: resultRelated,
    })
}

async function getSlugDocuments(req, reply) {
  const wordSearches = req.params.slugWord;
  const slugWords = removeSlugs(wordSearches)

  const documents = this.mongo.db.collection("documents");
  const resultMatched = await documents
    .find({
      $or: [
        { title: { $regex: slugWords, $options: "$i" } },
        { body: { $regex: slugWords, $options: "$i" } },
      ],
    })
    .toArray();

  const tags = getTags(resultMatched);
  const resultRelated = await Promise.all(
    tags.map(async (tag) => {
      return await documents
        .find({ tags: { $regex: tag.toString(), $options: "$i" } })
        .toArray();
    })
  );

  reply.send({
    matchedDocuments: resultMatched,
    relatedDocuments: resultRelated,
  });
}

async function addDocument(req, reply) {
    const documents = this.mongo.db.collection("documents")
    const body = req.body
    const result = await documents.insertOne(body)

    reply.code(201).send(result)
}

function removeStopWords(words) {
    return sw.removeStopwords(words.split(" ")).join("")
}

function getTags(resultMatched) {
  const tags = []
  resultMatched.forEach(el => {
    el.tags.forEach(tag => {
      tags.push(tag)
    })
  })

  const uniqueTags = tags.filter((el, idx) => {
    return tags.indexOf(el) === idx
  })

  return uniqueTags
}

function removeSlugs(words) {
  let slug = sw.removeStopwords(words.split("-")).join("")
  // no numbers
  slug = slug.replace(/[0-9]/g, "");

  return slug;
}

module.exports = {
  getSlugDocuments,
  getDocuments,
  addDocument,
};