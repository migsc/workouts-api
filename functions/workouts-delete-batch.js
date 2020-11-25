/* Import faunaDB sdk */
const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  const data = JSON.parse(event.body);
  console.log("data", data);
  console.log("Function `workout-delete-batch` invoked", data.ids);
  // construct batch query from IDs
  const deleteAllCompletedWorkoutQuery = data.ids.map((id) => {
    return q.Delete(q.Ref(`classes/workouts/${id}`));
  });
  // Hit fauna with the query to delete the completed items
  return client
    .query(deleteAllCompletedWorkoutQuery)
    .then((response) => {
      console.log("success", response);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
