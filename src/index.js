// src/index.js
const { Client, Permissions } = require("discord.js-selfbot-v13");
const fs = require("fs");
const path = require("path");
const commandHandler = require("./handlers/commandHandler");
const client = new Client();
client.Permissions = Permissions;

const config = require("../config/config.json");
const prefix = config.prefix;

const commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, "./commands")).filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
    try {
        if (msg.author.id !== client.user.id) return;

        if (msg.content.startsWith(prefix)) {
            await commandHandler(msg, client, { allowedMentions: { repliedUser: false } });
            return;
        }
        
        // reactall
        if (client.reactMap && client.reactMap.size > 0) {
            for (const [userId, emoji] of client.reactMap.entries()) {
                if (msg.author.id === userId) {
                    try {
                        await msg.react(emoji);
                    } catch (err) {
                        console.error(`Failed to react to ${userId}:`, err);
                    }
                }
            }
        }

        // autoreply
        const autoreplyCommand = commands.get("autoreply");
        if (autoreplyCommand && typeof autoreplyCommand.checkAndReply === "function") {
            await autoreplyCommand.checkAndReply(msg, client, { allowedMentions: { repliedUser: false } });
        }
    } catch (err) {
        console.error("Failed to process message:", err);
    }
});

client.login(config.token);
