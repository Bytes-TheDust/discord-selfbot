// src/commands/send.js
module.exports = {
    name: "send",
    description: "Send a message multiple times using <text> [count]",
    async execute(msg, args, client, replyOptions = {}) {
        try { await msg.react("✅"); } catch {}

        const fullArgs = msg.content.slice(msg.content.indexOf(" ") + 1);
        const match = fullArgs.match(/<(.+)>/);
        if (!match) return msg.reply({ content: "> ❌ Format: $send <text> [count]", ...replyOptions });

        const text = match[1].trim();
        const after = fullArgs.replace(match[0], "").trim();
        let count = 1;

        if (after) {
            const parsed = parseInt(after, 10);
            if (!isNaN(parsed) && parsed > 0) count = Math.min(parsed, 10);
        }

        if (count > 10) return msg.reply({ content: "> ❌ Max Count Is 10.", ...replyOptions });

        for (let i = 0; i < count; i++) {
            await msg.reply({ content: text, ...replyOptions });
        }
    }
};
