const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const apiKey = process.env.REACT_APP_DATA_INSIGHTS_API_KEY;
  const response = await fetch('https://api.datainsights.com/reports', {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });
  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
