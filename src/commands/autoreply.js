// src/commands/autoreply.js
module.exports = {
    name: "autoreply",
    description: "Auto-reply to messages based on keyword or user",
    autoreplyMap: new Map(),

    async execute(msg, args, client, replyOptions = {}) {
        try { await msg.react("✅"); } catch (err) { console.error(err); }

        if (!args[0]) {
            return msg.reply({ 
                content: '> ❌ Usage: $autoreply <userID or <> > <keyword or <> > <reply text>',
                ...replyOptions
            });
        }

        if (args[0].toLowerCase() === "init") {
            client.autoreplyMap = new Map();
            return msg.reply({ content: "> ✅ All auto-replies cleared.", ...replyOptions });
        }

        let userId = args[0] === "<>" ? null : args[0].replace(/[<@!>]/g, "");
        let keyword = args[1] === "<>" ? null : args[1];
        let replyText = args.slice(2).join(" ");
        if (!replyText) return msg.reply({ content: "> ❌ Please provide reply text.", ...replyOptions });

        if (!client.autoreplyMap) client.autoreplyMap = new Map();

        const key = `${userId || "all"}|${keyword || "all"}`;
        client.autoreplyMap.set(key, replyText);

        await msg.reply({ 
            content: `> ✅ Auto-reply registered for ${userId ? `<@${userId}>` : "all users"} with keyword "${keyword || "all"}"`,
            ...replyOptions
        });
    },

    async checkAndReply(msg, client, replyOptions = {}) {
        if (msg.author.id === client.user.id) return;

        if (!client.autoreplyMap || client.autoreplyMap.size === 0) return;

        for (const [key, replyText] of client.autoreplyMap.entries()) {
            const [userId, keyword] = key.split("|");

            if (userId !== "all" && msg.author.id !== userId) continue;
            if (keyword !== "all" && !msg.content.includes(keyword)) continue;

            try {
                await msg.reply({ content: replyText, allowedMentions: { repliedUser: false }, ...replyOptions });
            } catch (err) {
            }
            break;
        }
    }
};
