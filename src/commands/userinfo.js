// src/commands/userinfo.js
module.exports = {
    name: "userinfo",
    description: "Show information about a user (account creation, roles, ID, status, etc.)",
    async execute(msg, args, client, replyOptions = {}) {
        try { await msg.react("✅"); } 
        catch (err) { console.error("Reaction error:", err); }

        if (!args[0]) {
            return msg.reply({ content: "> ❌ Usage: $userinfo <@ID>", ...replyOptions });
        }

        const userId = args[0].replace(/[<@!>]/g, "");
        let user;
        try {
            user = await client.users.fetch(userId);
        } catch (err) {
            return msg.reply({ content: "> ❌ Could not find user by that ID or mention.", ...replyOptions });
        }

        const guild = msg.guild;
        let memberInfo = "";
        if (guild) {
            const member = guild.members.cache.get(user.id);
            if (member) {
                memberInfo = `\n[+] Roles: ${member.roles.cache.map(r => r.name).join(", ") || "None"}`
                            + `\n[+] Status: ${member.presence?.status || "Offline"}`;
            }
        }

        const infoText = `****__User Info for ${user.tag}__****\n` +
                         "```\n" +
                         `[+] Username: ${user.username}\n` +
                         `[+] Discriminator: #${user.discriminator}\n` +
                         `[+] ID: ${user.id}\n` +
                         `[+] Account Created: ${user.createdAt.toUTCString()}${memberInfo}\n` +
                         "```";

        await msg.reply({ content: infoText, ...replyOptions });
    }
};
