// src/commands/help.js
const config = require("../../config/config.json");
module.exports = {
    name: "help",
    description: "Show available commands",
    async execute(msg, args, client, replyOptions = {}) {
        try { await msg.react("✅"); } catch {}

        const prefix = config.prefix;
        const helpText = 
            "## ****__Thanks For Using My Bot!__****\n" +
            "> -# Originally Coded By BytesTheDust\n" +
            "**__[Github](https://github.com/Bytes-TheDust)__**\n" + 
            "****__Command Info__****\n" + 
            "```\n" + 
            `[+] ${prefix}help : Shows help\n` +
            `[+] ${prefix}ping : Pong\n` +
            `[+] ${prefix}send <message> [count] : Send message (max 10)\n` +
            `[+] ${prefix}purge <number> : Delete Recent messages (max 20)\n` +
            `[+] ${prefix}admininfo : List Servers With Admin-permission\n` +
            `[+] ${prefix}ipinfo <ip> : Show IP-info And Save To DB\n` +
            `[+] ${prefix}reactall <user-ID> [True/False] : Auto-Reaction Enable/Disable\n` +
            `[+] ${prefix}reactall <init> : Kills All Auto-Reaction\n` +
            `[+] ${prefix}autoreply <user-ID> <content> <reply> : Auto-Reply Enable/Disable\n` +
            `[+] ${prefix}autoreply <init> : Kills All Auto-Reply\n` +
            `[+] ${prefix}userinfo <user-ID> : Shows User-Info\n` +
            `[+] ${prefix}btcprice : Shows Current Crypto Price.\n` +
            `[+] ${prefix}fl00d <message> : Floods Channel With message.\n` +
            `[+] ${prefix}fl00d stop : Stops Current Flood.\n` +
            "```";

        await msg.reply({ content: helpText, ...replyOptions });
    }
};
