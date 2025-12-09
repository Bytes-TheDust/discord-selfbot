// src/commands/reactall.js
module.exports = {
    name: "reactall",
    description: "Automatically react to a user's messages with a specific emoji.",
    async execute(msg, args, client, replyOptions = {}) {
        try { await msg.react("✅"); } catch (err) { console.error(err); }

        const fullArgs = msg.content.slice(msg.content.indexOf(" ") + 1).trim();

        if (fullArgs.toLowerCase() === "<init>") {
            if (client.reactMap) client.reactMap.clear();
            return msg.reply({ content: "> ✅ All Auto-reactions Have Been Cleared.", ...replyOptions });
        }

        if (args.length < 2) {
            return msg.reply({
                content: "> ❌ Usage: $reactall <@ID> <emoji> [true|false]",
                ...replyOptions
            });
        }

        let userId;
        let input = args[0].trim();
        input = input.replace(/[<@!>]/g, "");

        if (/^\d+$/.test(input)) {
            userId = input;
        } 
        else {
            const member = msg.guild.members.cache.find(m => m.user.username.toLowerCase() === input.replace(/^@/, "").toLowerCase());
            if (member) userId = member.user.id;
            else return msg.reply({ content: "> ❌ Could Not Find @user By That Name.", ...replyOptions });
        }

        const emoji = args[1];
        const enabled = args[2] ? args[2].toLowerCase() === "true" : true;

        if (!client.reactMap) client.reactMap = new Map();

        if (enabled) {
            client.reactMap.set(userId, emoji);
            await msg.reply({
                content: `> ✅ Auto-react Enabled For <@${userId}> with ${emoji}`,
                ...replyOptions
            });
        } else {
            client.reactMap.delete(userId);
            await msg.reply({
                content: `> ❌ Auto-react Disabled For <@${userId}>`,
                ...replyOptions
            });
        }
    }
};
