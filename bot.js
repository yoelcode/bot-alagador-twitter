console.log("Bot ready!");
console.log();

var Twit = require("twit");
var config = require("./config");

console.log(config);
console.log();

var T = new Twit(config);

var stream = T.stream('statuses/filter', { track: '@BotAlagador' });

// Now looking for tweet events
// See: https://dev.twitter.com/streaming/userstreams
stream.on('tweet', tweetEvent);

// Here a tweet event is triggered!
function tweetEvent(tweet) {

  // If we wanted to write a file out
  // to look more closely at the data
  // var fs = require('fs');
  // var json = JSON.stringify(tweet,null,2);
  // fs.writeFile("tweet.json", json, output);

  // Who is this in reply to?
  var reply_to = tweet.in_reply_to_screen_name;

  // Who is the author of the tweet?
  var author = tweet.user.screen_name;
  // What is the text?
  var txt = tweet.text;
  // If we want the conversation thread
  var id = tweet.id_str;
  console.log(id);
  // Ok, if this was in reply to me
  // Tweets by me show up here too
  console.log(reply_to);
  // Get rid of the @ mention
  txt = txt.replace(/@BotAlagador/g,'');

  // Start a reply back to the sender
  var replyText = '@'+author +' Eres una persona maravillosa brillas más que los dientes del knekro. ' + '@'+reply_to;

  // Post that tweet
  T.post('statuses/update', { status: replyText, in_reply_to_status_id: id, username: author}, tweeted);

  // Make sure it worked!
  function tweeted(err, reply) {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Tweeted: ' + reply.text);
    }
  }
}