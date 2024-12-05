const { handleAIResponse } = require('../ai/groq');
const { ChannelType, PermissionFlagsBits, Events } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    const targetChannel = config.aiChannelName;

    if (message.author.bot) return;

    if (message.channel.name === targetChannel && message.channel.type === ChannelType.GuildText) {
      if (!message.guild.members.me.permissionsIn(message.channel).has(PermissionFlagsBits.SendMessages)) {
        return;
      }

      await handleAIResponse(message, message.content);
    }
  },
};
