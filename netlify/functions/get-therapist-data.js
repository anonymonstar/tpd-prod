exports.handler = async function(event, context) {
  const WEBFLOW_API_KEY = 'fe828a50fc10216bfe01f9b84d4c20ce97c6f12522a52062d1a046606696b82e';
  const COLLECTION_ID = '67056c01ed98800faf1fa5db';

  try {
    const fetch = (await import('node-fetch')).default;

    const response = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?limit=100`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_KEY}`,
        'accept-version': '1.0.0'
      }
    });

    const data = await response.json();
    
    // Log the response data
    console.log('Webflow API Response:', JSON.stringify(data));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',  
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', 
      },
      body: JSON.stringify({ error: 'Error fetching data from Webflow' }),
    };
  }
};
