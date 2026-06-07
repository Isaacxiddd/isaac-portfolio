export default async function handler(req, res) {
  try {
    const response = await fetch('https://neocities.org/api/info?sitename=formulafacilutn');
    if (!response.ok) {
      throw new Error(`Neocities API responded with ${response.status}`);
    }
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    console.error('Neocities proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch Neocities info' });
  }
}
