// commandHandler.js
const fs = require("fs");
const path = require("path");

const commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, "../commands")).filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.set(command.name, command);
}

module.exports = async (msg, client, replyOptions = {}) => {
    const prefix = require("../../config/config.json").prefix;
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(msg, args, client, replyOptions);
    } catch (err) {
        console.error(err);
        await msg.reply({
            content: "❌ An error occurred while executing the command.",
            allowedMentions: { repliedUser: false }
        });
    }
};
