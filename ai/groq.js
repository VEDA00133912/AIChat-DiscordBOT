const { generateAIResponse } = require('./response');
const statusCodes = require('./statuscode');
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function handleAIResponse(message, prompt) {
  try {
    await message.channel.sendTyping();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { firstPart, secondPart } = await generateAIResponse(prompt, groq);

    await message.reply({
      content: firstPart,
      allowedMentions: { repliedUser: false }, 
    });

    if (secondPart) {
      await message.followUp({
        content: secondPart,
        allowedMentions: { repliedUser: false }, 
      });
    }
  } catch (error) {
    // エラーハンドリング
    let errorMessage = '✗ 予期しないエラーが発生しました。再試行してください。';
    if (error instanceof Groq.APIError) {
      console.error('✗ APIエラー:', error.status, error.name);
      const statusCode = error.status || error.name;
      errorMessage = `✗ APIエラーが発生しました: ${statusCodes[statusCode] || '不明なエラー'}`;
    } else {
      console.error('✗ 予期しないエラー:', error);
    }
    await message.reply({
      content: errorMessage,
      allowedMentions: { repliedUser: false }, 
    });
  }
}

module.exports = { handleAIResponse };
