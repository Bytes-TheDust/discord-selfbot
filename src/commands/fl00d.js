// src/commands/fl00d.js
module.exports = {
    name: "fl00d",
    description: "Continuously sends a message in <text> until a new $fl00d command is issued.",
    activeFloods: new Map(),

    async execute(msg, args, client, replyOptions = {}) {
        const channelId = msg.channel.id;

        if (this.activeFloods.has(channelId)) {
            const controller = this.activeFloods.get(channelId);
            controller.stop = true;
            this.activeFloods.delete(channelId);
            return msg.reply({ content: "> ✅ Previous flood stopped.", ...replyOptions });
        }

        const fullArgs = msg.content.slice(msg.content.indexOf(" ") + 1).trim();
        const match = fullArgs.match(/<(.+)>/);
        if (!match) return msg.reply({ content: "> ❌ Usage: $fl00d <message>", ...replyOptions });

        const text = match[1].trim();

        const controller = { stop: false };
        this.activeFloods.set(channelId, controller);

        await msg.reply({ content: `> 💀 Flood started: "${text}"`, ...replyOptions });

        while (!controller.stop) {
            try {
                await msg.reply({ content: text, ...replyOptions });
            } catch (err) {
                console.error("> ❌ Failed to send flood message:", err);
            }
            await new Promise(r => setTimeout(r, 500));
        }
    }
};
