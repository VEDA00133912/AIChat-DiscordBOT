const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('BOTの応答速度を表示'),
    
    async execute(interaction, client) {
        try {
            const ping = client.ws.ping;  
            await interaction.reply(`🏓 **\`${ping}\`** ms`);
        } catch (error) {
            console.error('[ping]エラー:', error);
            await interaction.reply({
                content: 'エラーが発生しました。後でもう一度試してください',
                ephemeral: true, 
            });
        }
    },
};
