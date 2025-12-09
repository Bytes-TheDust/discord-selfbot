// src/commands/ipinfo.js
const axios = require("axios");
const fs = require("fs");
const path = require("path");
module.exports = {
    name: "ipinfo",
    description: "Get info about an IP and save it to /db/ipinfo",
    async execute(msg, args, client, replyOptions = {}) {
        try { await msg.react("✅"); } 
        catch (err) { console.error("Reaction error:", err); }

        if (!args[0]) {
            return msg.reply({ content: "> ❌ Usage: $ipinfo <IP>", ...replyOptions });
        }

        let ip = args[0].trim().replace(/^<|>$/g, "");

        try {
            const response = await axios.get(`http://ip-api.com/json/${ip}`);
            const data = response.data;

            if (data.status !== "success") {
                return msg.reply({ content: `Failed to fetch IP: ${data.message || "Unknown error"}`, ...replyOptions });
            }

            const infoText = `****__IP Info for <${ip}>__****\n` +
                "```\n" +
                `[+] IP: ${data.query}\n` +
                `[+] Country: ${data.country} (${data.countryCode})\n` +
                `[+] Region: ${data.regionName} (${data.region})\n` +
                `[+] City: ${data.city}\n` +
                `[+] ZIP: ${data.zip}\n` +
                `[+] ISP: ${data.isp}\n` +
                `[+] Org: ${data.org}\n` +
                `[+] AS: ${data.as}\n` +
                `[+] Timezone: ${data.timezone}\n` +
                "```\n**Successfully Saved IP-info!**";

            await msg.reply({ content: infoText, ...replyOptions });

            const dbPath = path.join(__dirname, "../../db/ipinfo");
            if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath, { recursive: true });

            const filename = `ip_${Date.now()}.json`;
            fs.writeFileSync(path.join(dbPath, filename), JSON.stringify(data, null, 2));

        } catch (err) {
            console.error(err);
            await msg.reply({ content: `Error: ${err.message}`, ...replyOptions });
        }
    }
};
