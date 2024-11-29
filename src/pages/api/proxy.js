// pages/api/proxy.js
export default async function handler(req, res) {
  const { type, brand, model } = req.query;

  let apiUrl = '';

  // Determine the URL based on the type of request
  if (type === 'make') {
    apiUrl = 'http://91.228.56.250:7246/api/auction/make';
  } else if (type === 'model') {
    if (!brand) {
      res.status(400).json({ error: 'Brand is required for model query' });
      return;
    }
    apiUrl = `http://91.228.56.250:7246/api/auction/model/${brand}`;
  } else {
    res.status(400).json({ error: 'Invalid type parameter' });
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Bot-Token': 'Qi7nffIhoI6sHHzvyXqwRFWExPxKMxL',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
