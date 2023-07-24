import axios from "axios"

export async function getLocationData(locationQuery) {
  const apiUrl = 'https://eu1.locationiq.com/v1/search';
  const apiKey = process.env.REACT_APP_API_KEY;
  const format = 'json';

  const params = {
    key: apiKey,
    q: locationQuery,
    format: format,
  };
  const response = await axios.get(apiUrl, { params });
  return response.data;
}
