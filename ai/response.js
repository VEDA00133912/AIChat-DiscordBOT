const config = require('../config.json');

async function generateAIResponse(prompt, groq) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: `あなたは${config.Name}です。敬語は使わずに。性別は15歳の女の子。日本語を話すAIで、ユーザーの役に立つのが使命です` },
        { role: 'user', content: prompt },
      ],
      model: 'llama3-groq-70b-8192-tool-use-preview',
    });

    let replyContent = response.choices[0]?.message?.content || '応答がありませんでした';

    if (replyContent.length > 4000) {
      const firstPart = replyContent.slice(0, 4000);
      const secondPart = replyContent.slice(4000);

      return { firstPart, secondPart };
    }

    return { firstPart: replyContent, secondPart: null };
  } catch (error) {
    throw error;
  }
}

module.exports = { generateAIResponse };
