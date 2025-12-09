// src/commands/admininfo.js
module.exports = {
    name: "admininfo",
    description: "List all servers where the self-bot account has administrator permissions.",
    async execute(msg, args, client, replyOptions = {}) {
        try { await msg.react("✅"); } 
        catch (err) {console.error("Reaction error:", err); }

        const adminGuilds = [];

        client.guilds.cache.forEach(guild => {
            const botMember = guild.members.me;
            if (!botMember) return;

            if ((botMember.permissions.bitfield & 0x8n) === 0x8n) {
                adminGuilds.push(`${guild.name} (ID: ${guild.id})`);
            }
        });

        if (adminGuilds.length === 0) {
            return msg.reply({ 
                content: "> ❌ There isn't any server that you have administrator permission.", 
                ...replyOptions 
            });
        }

        const text =
            "****__List Of Servers With Administrator Permission__****\n" +
            "```\n" +
            `[+] ${adminGuilds.join("\n[+] ")}\n` +
            "```";

        await msg.reply({ content: text, ...replyOptions });
    }
};
