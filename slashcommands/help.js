const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config.json');  

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('ヘルプメッセージを表示します。'),

    async execute(interaction) {
        try {
            const helpEmbed = new EmbedBuilder()
                .setColor('Green')  
                .setTitle('ヘルプメッセージ')
                .setDescription('このボットの使い方です')
                .addFields(
                    { 
                        name: 'BOTに必要な権限', 
                        value: `以下の権限が必要です\n- チャンネルを見る\n- メッセージを送信\n- メッセージ履歴を見る\n- チャンネル管理`
                    },
                    { 
                        name: `AIチャンネルについて`, 
                        value: `\`${config.aiChannelName}\` チャンネルでは、メッセージを送信するとAIが返信します。`
                    },
                    { 
                        name: '/ping', 
                        value: 'BOTの応答速度を表示します。'
                    },
                    { 
                        name: '/help', 
                        value: 'この埋め込みを表示します。'
                    },
                    { 
                        name: '/ai', 
                        value: 'AIチャット用のチャンネルを作成します。'
                    }
                )
                .setFooter({ text: `${interaction.client.user.username} | help`, iconURL: interaction.client.user.avatarURL() })
                .setTimestamp();  

            await interaction.reply({ embeds: [helpEmbed] });

        } catch (error) {
            console.error('✗ [help] エラーが発生しました:', error);
            await interaction.reply({
                content: '✗ エラーが発生しました。もう一度お試しください',
                ephemeral: true
            });
        }
    },
};

