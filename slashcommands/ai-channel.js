const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const config = require('../config.json');  

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ai')
        .setDescription('AIチャット用のテキストチャンネルを作成します'),
  
    async execute(interaction) {
        try {
            const aiChannelName = config.aiChannelName;
            const existingChannel = interaction.guild.channels.cache.find(
                (channel) => channel.name === aiChannelName && channel.type === ChannelType.GuildText
            );

            if (existingChannel) {
                return interaction.reply({
                    content: `すでにチャンネルが存在します: <#${existingChannel.id}>\n使い方は/helpを見てください`,
                });
            }

            const botPermissions = interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels);
            const userPermissions = interaction.guild.members.cache.get(interaction.user.id).permissions.has(PermissionFlagsBits.ManageChannels);

            if (!botPermissions && !userPermissions) {
                return interaction.reply({
                    content: 'BOTとユーザーのチャンネル作成権限がありません。',
                    ephemeral: true,
                });
            }

            if (!botPermissions) {
                return interaction.reply({
                    content: 'BOT のチャンネル作成権限がありません。',
                    ephemeral: true,
                });
            }

            if (!userPermissions) {
                return interaction.reply({
                    content: 'ユーザー のチャンネル作成権限がありません。',
                    ephemeral: true,
                });
            }

            const channelOptions = {
                name: aiChannelName,
                type: ChannelType.GuildText,
                topic: `${interaction.client.user}のAIチャット機能を使えるチャンネルです`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,  
                        allow: [
                            PermissionFlagsBits.SendMessages, 
                            PermissionFlagsBits.ViewChannel, 
                            PermissionFlagsBits.ReadMessageHistory,  
                        ],
                    },
                ],
            };

            const newChannel = await interaction.guild.channels.create(channelOptions);

            await interaction.reply({
                content: `チャンネルを作成しました: <#${newChannel.id}>\n使い方は/helpを見てください`,
            });

        } catch (error) {
            console.error('✗ [ai] エラーが発生しました:', error);
            await interaction.reply({
                content: '✗ AIチャットチャンネルの作成中にエラーが発生しました。もう一度試してください',
                ephemeral: true,  
            });
        }
    },
};
