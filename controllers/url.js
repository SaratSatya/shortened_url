const {nanoid} = require('nanoid');
const URL = require('../models/url.js');

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: 'url is required' });
  }

  // Check if this URL already exists
  const existing = await URL.findOne({ redirectURL: body.url });//doubt-1
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

async function handleRedirectShortenUrlToOriginalWebiste(req,res){
  const shortId=req.params.shortId;
  const entry = await URL.findOneAndUpdate({shortId},//doubt-2
  {
    $push:{
      visitHistory:{timestamp:Date.now()},//doubt-3
    }
  })
  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req,res){
  const shortId=req.params.shortId;
  const result=await URL.findOne({shortId});
  return res.json({
    totalClicks:result.visitHistory.length,
    analytics:result.visitHistory})
}

module.exports={
    handleGenerateNewShortURL,
    handleRedirectShortenUrlToOriginalWebiste,
    handleGetAnalytics
}
