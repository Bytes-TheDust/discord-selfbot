// src/commands/serverinfo.js
module.exports = {
    name: "serverinfo",
    description: "Show server info. Use without args for current server or provide a server ID.",
    async execute(msg, args, client, replyOptions = {}) {
        try { await msg.react("✅"); } 
        catch (err) { console.error("Reaction error:", err); }

        let guild;

        if (args[0]) {
            const match = args[0].match(/\d+/);
            if (!match) {
                return msg.reply({ content: `> ❌ Invalid server ID format.`, ...replyOptions });
            }
            const guildId = match[0];
            guild = client.guilds.cache.get(guildId);
            if (!guild) {
                return msg.reply({ content: `> ❌ Could not find server with ID ${guildId}`, ...replyOptions });
            }
        } else {
            guild = msg.guild;
            if (!guild) {
                return msg.reply({ content: "> ❌ This command can only be used in a server or provide a server ID.", ...replyOptions });
            }
        }

        const totalMembers = guild.memberCount;
        const onlineMembers = guild.members.cache.filter(m => m.presence?.status === "online").size;
        const channelsCount = guild.channels.cache.size;
        const rolesCount = guild.roles.cache.size;
        const ownerId = guild.ownerId;

        const infoText = `****__Server Info__****\n` +
            "```\n" +
            `[+] Name: ${guild.name}\n` +
            `[+] ID: ${guild.id}\n` +
            `[+] Owner: ${ownerId}\n` +
            `[+] Total Members: ${totalMembers}\n` +
            `[+] Online Members: ${onlineMembers}\n` +
            `[+] Channels: ${channelsCount}\n` +
            `[+] Roles: ${rolesCount}\n` +
            "```";

        await msg.reply({ content: infoText, ...replyOptions });
    }
};
