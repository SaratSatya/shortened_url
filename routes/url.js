const express =require('express');
const {handleGenerateNewShortURL,handleRedirectShortenUrlToOriginalWebiste,handleGetAnalytics}=require('../controllers/url')

const router=express.Router();

router.post('/',handleGenerateNewShortURL);

router.get('/:shortId',handleRedirectShortenUrlToOriginalWebiste)

router.get('/analytics/:shortId',handleGetAnalytics);

module.exports=router;