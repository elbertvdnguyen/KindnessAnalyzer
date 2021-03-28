// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();

/**
 * TODO(developer): Uncomment the following line to run this code.
 */

// Prepares a document, representing the provided text


async function analysis(text) { 
let document = {
  content: text,
  type: 'PLAIN_TEXT',
}
// Detects the sentiment of the document
let [result] = await client.analyzeSentiment({document});

let sentiment = result.documentSentiment;
console.log('Document sentiment:');
console.log(`  Score: ${sentiment.score}`);
console.log(`  Magnitude: ${sentiment.magnitude}`);

let sentences = result.sentences;
sentences.forEach(sentence => {
  console.log(`Sentence: ${sentence.text.content}`);
  console.log(`  Score: ${sentence.sentiment.score}`);
  console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
});

return result.documentSentiment;
	

}

module.exports = { analysis };
