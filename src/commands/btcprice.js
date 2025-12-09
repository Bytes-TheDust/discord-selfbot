// src/commands/btcprice.js
const axios = require("axios");

module.exports = {
    name: "btcprice",
    description: "Show current price of BTC, ETH, LTC, TRX, XMR in USD",
    async execute(msg, args, client, replyOptions = {}) {
        try { await msg.react("✅"); } 
        catch (err) { console.error("Reaction error:", err); }

        try {
            const coins = ["bitcoin", "ethereum", "litecoin", "tron", "monero"];
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
                params: {
                    ids: coins.join(","),
                    vs_currencies: "usd"
                }
            });

            const data = response.data;

            const infoText =
                "****__Crypto Prices (USD)__****\n" +
                "```\n" +
                `[+] Bitcoin (BTC): $${data.bitcoin.usd}\n` +
                `[+] Ethereum (ETH): $${data.ethereum.usd}\n` +
                `[+] Litecoin (LTC): $${data.litecoin.usd}\n` +
                `[+] TRON (TRX): $${data.tron.usd}\n` +
                `[+] Monero (XMR): $${data.monero.usd}\n` +
                "```";

            await msg.reply({ content: infoText, ...replyOptions });

        } catch (err) {
            console.error(err);
            await msg.reply({ content: "> ❌ Failed to fetch crypto prices.", ...replyOptions });
        }
    }
};
