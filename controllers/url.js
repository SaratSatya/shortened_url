const { nanoId } = require('nanoid');
const URL = require('../models/url.js');

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: 'url is required' });
  }

  // Check if this URL already exists
  const existing = await URL.findOne({ redirectURL: body.url });
  if (existing) {
    return res.json({ id: existing.shortId, message: "Already exists" });
  }

  // Create a new one if not found
  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: []
  });

  return res.json({ id: shortId, message: "New short URL created" });
}

module.exports={
    handleGenerateNewShortURL,
}
