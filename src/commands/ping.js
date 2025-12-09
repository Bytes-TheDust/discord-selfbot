// src/commands/ping.js
module.exports = {
    name: "ping",
    description: "Responds with pong.",
    async execute(msg, args, client, replyOptions = {}) {
        try {await msg.react("✅");} 
        catch (err) {console.error("Reaction Error:", err);}

        await msg.reply({
            content: "pong",
            ...replyOptions
        });
    }
};
