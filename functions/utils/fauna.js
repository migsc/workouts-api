/* Import faunaDB sdk */
const faunadb = require("faunadb");

const q = faunadb.query;

function getFaunaClient() {
  return new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
}

module.exports = { q, getFaunaClient };
