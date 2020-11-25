/* Import faunaDB sdk */
const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = (event, context) => {
  console.log("Function `workout-read-all` invoked");
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_workouts"))))
    .then((response) => {
      const workoutRefs = response.data;
      console.log("Workout refs", workoutRefs);
      console.log(`${workoutRefs.length} workouts found`);
      // create new query out of workout refs. http://bit.ly/2LG3MLg
      const getAllWorkoutDataQuery = workoutRefs.map((ref) => {
        return q.Get(ref);
      });
      // then query the refs
      return client.query(getAllWorkoutDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret),
        };
      });
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
