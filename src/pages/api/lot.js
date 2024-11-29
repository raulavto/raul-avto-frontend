// pages/api/lot.js
import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;
    console.log(`http://91.228.56.250:7246/api/auction/lot/${id}`);
  try {
    const response = await axios.get(
      `http://91.228.56.250:7246/api/auction/lot/${id}`,
    // 'http://91.228.56.250:7246/api/auction/lot/40390578', 
      {
        headers: {
          accept: 'text/plain',
          'Bot-Token': 'Qi7nffIhoI6sHHzvyXqwRFWExPxKMxL',
        },
        timeout: 30000,
      }
    );

    console.log('Response:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Errorrrrrr fetching data:', error.message);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
}
