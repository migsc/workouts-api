function postHandler(func) {
  return async (event, context) => {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 500,
        body: "Only POST is allowed",
      };
    }

    return func(event, context);
  };
}

module.exports = { postHandler };
