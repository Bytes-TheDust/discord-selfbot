// src/commands/purge.js
module.exports = {
    name: "purge",
    description: "Delete your recent messages. Max 20.",
    async execute(msg, args, client, replyOptions = {}) {
        try { await msg.react("✅"); } catch {}

        if (!args[0]) return msg.reply({ content: "> ❌ Usage: $purge <number>", ...replyOptions });

        let countStr = args[0].trim();
        const match = countStr.match(/<(\d+)>/);
        if (match) countStr = match[1];

        const count = parseInt(countStr, 10);
        if (isNaN(count) || count < 1) return msg.reply({ content: "> ❌ Please Provide a Valid Number Greater Than 0.", ...replyOptions });
        if (count > 20) return msg.reply({ content: "> ❌ Max Count Is 20.", ...replyOptions });

        try {
            const messages = await msg.channel.messages.fetch({ limit: 50 });
            const myMessages = messages.filter(m => m.author.id === client.user.id).first(count);

            if (myMessages.length === 0) return msg.reply({ content: "No messages To Purge.", ...replyOptions });

            for (const message of myMessages) await message.delete();
            await msg.channel.send({ content: `Successfully Purged ${myMessages.length} message(s).`, ...replyOptions });
        } catch (err) {
            console.error(err);
            await msg.channel.send({ content: `Error: ${err.message}`, ...replyOptions });
        }
    }
};
