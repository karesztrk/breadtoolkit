// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const ingredients = require('./ingredients.json');

const handler = async (event) => {
  try {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredients),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
