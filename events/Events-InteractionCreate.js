const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            try {
                const command = client.commands.get(interaction.commandName);
                if (!command) return;
                await command.execute(interaction, client);
            } catch (error) {
                console.error('✗ interactionエラー:', error);
                await interaction.reply({
                    content: 'コマンド実行中にエラーが発生しました',
                    ephemeral: true, 
                });
            }
        }
    },
};

