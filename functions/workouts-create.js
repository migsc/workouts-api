const { q, getFaunaClient } = require("./utils/fauna");
const { postHandler } = require("./utils/handlers");

const recordDefaults = {
  name: "Untitled",
  sets: [],
};

/* export our lambda function as named "handler" export */
exports.handler = postHandler(async (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = getFaunaClient();
  const data = JSON.parse(event.body);

  // return { statusCode: 200, body: event.httpMethod };

  console.log("Function `workouts-create` invoked", data);
  const record = {
    data: {
      ...recordDefaults,
      data,
    },
  };
  /* construct the fauna query */
  return client
    .query(q.Create(q.Ref("classes/workouts"), record))
    .then((response) => {
      console.log("success", response);
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      console.log("error", error);
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
});
