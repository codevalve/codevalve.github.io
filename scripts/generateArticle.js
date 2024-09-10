const fs = require('fs');
const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Store your API key in GitHub secrets
const filePath = process.argv[2]; // File path passed from GitHub Action

// Load the file content
let fileContent = fs.readFileSync(filePath, 'utf8');

// Extract the instructions from the file (customize as needed)
const instructions = fileContent.match(/instructions:(.*)/)[1].trim();

// Call OpenAI API to generate the article
async function generateArticle() {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4', // or whatever model you're using
        messages: [
          {
            role: 'system',
            content: 'Generate an article based on the following instructions.',
          },
          { role: 'user', content: instructions },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract the generated content
    const generatedContent = response.data.choices[0].message.content;

    // Replace the content in the original file
    const newContent = fileContent.replace(
      /instructions:(.*)/,
      generatedContent
    );
    fs.writeFileSync(filePath, newContent, 'utf8');

    console.log('Article successfully generated and file updated.');
  } catch (error) {
    console.error('Error generating article:', error);
  }
}

generateArticle();
