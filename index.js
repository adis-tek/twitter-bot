//connect to twitter
require('dotenv').config();
const Twitter = require('twitter');
const Sheet = require('./sheet');

(async function () {

  const client = new Twitter({
    consumer_key: process.env.KEY,
    consumer_secret: process.env.KEY_SECRET,
    access_token_key: process.env.TOKEN,
    access_token_secret: process.env.TOKEN_SECRET
  });
  //pull next tweet out of spreadsheet
  const sheet = new Sheet();
  await sheet.load();
  const quotes = await sheet.getRows();
  const status = quotes[0].quote;

  //send tweet
  client.post('statuses/update', { status }, function (error, tweet, response) {
    if (error) throw error;
    console.log(tweet);  // Tweet body.
  });

  //remove quote from spreadsheet
  await quotes[0].delete();
  console.log('tweeted', quotes[0].quote);
})()
