const config = require('../settings');
const { cmd, commands } = require('../lib/command');
const fetch = require('node-fetch');
const {fetchJson} = require('../lib/functions');
const axios = require('axios');
const cheerio = require("cheerio");
const emailDataStore = {};

//-----------------------------------------------Calculator-----------------------------------------------

cmd({
    pattern: "cal",
    desc: "Calculate a mathematical expression.",
    use: ".calc <expression>",
    react: "📠",    
    category: "tools",
    filename: __filename
},
async (conn, mek, m, {
    from, args, quoted, body, isCmd, command, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (args.length === 0) return reply('Please provide a mathematical expression.');

        const expression = args.join(' ');
        let result;

        try {
            result = new Function(`return ${expression}`)();
        } catch (e) {
            return reply('Invalid mathematical expression.');
        }

        return await conn.sendMessage(from, { text: `Calculater: ${result}` }, { quoted: mek });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply(`Error: ${e.message}`);
    }
});

//-----------------------------------------------Currency Converter-----------------------------------------------

cmd({
    pattern: "currency",
    desc: "Convert an amount from one currency to another.",
    use: ".currency <amount> <source currency> <target currency>",
    react: "💻", 
    category: "tools",
    filename: __filename
},
async (conn, mek, m, {
    from, args, quoted, body, isCmd, command, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (args.length < 3) return reply('Please provide the amount, source currency, and target currency (e.g., 100 USD EUR).');

        const amount = parseFloat(args[0]);
        const fromCurrency = args[1].toUpperCase();
        const toCurrency = args[2].toUpperCase();
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const exchangeData = await response.json();

        if (exchangeData.rates[toCurrency]) {
            const convertedAmount = (amount * exchangeData.rates[toCurrency]).toFixed(2);
            return await conn.sendMessage(from, {
                text: `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`
            }, { quoted: mek });
        } else {
            return reply(`Could not find conversion rate for: ${toCurrency}`);
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply(`Error: ${e.message}`);
    }
});

//-----------------------------------------------Translate-----------------------------------------------

cmd({
    pattern: "translate",
    desc: "Translate text to another language.",
    react: "💡", 
    category: "tools",
    use: ".translate <language code> <text>",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        if (args.length < 2) return reply('Please provide a language code and text to translate.');
        const [languageCode, ...textArray] = args;
        const text = textArray.join(' ');
        
        // Validate language code (basic check for length, should be expanded based on needs)
        if (languageCode.length !== 2) return reply('Invalid language code. Use a 2-letter code (e.g., "es" for Spanish).');

        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${languageCode}`);
        const translation = await response.json();

        if (translation.responseData && translation.responseData.translatedText) {
            return await conn.sendMessage(from, { text: translation.responseData.translatedText }, { quoted: mek });
        } else {
            return reply('Translation failed. Please check the language code and text.');
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return reply(`Error: ${e.message}`);
    }
});
//.translate <language_code> <text>

//---------------------------------------------------------------Reverse Text-----------------------------------------------

cmd({
    pattern: "reverse",
    desc: "Reverse the provided text.",
    react: "💫", 
    use: ".reverse <text>",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, {
    from, args, reply
}) => {
    try {
        if (args.length === 0) return reply('Please provide the text to reverse.');
        const text = args.join(' ');
        const reversedText = text.split('').reverse().join('');
        return await conn.sendMessage(from, {
            text: reversedText
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return reply(`Error: ${e.message}`);
    }
});

//CcChecker

cmd({
    pattern: "cccheck", // The pattern for triggering the command
    desc: "Check if a credit card number is valid.", // Description of the command
    react: "💳", // Emoji to react with when this command is used
    use: ".cccheck <credit card number>", // How the command is used
    category: "tools", // Category in which the command is placed
    filename: __filename // The file this code is in
},
async (conn, mek, m, { from, sender, reply, args }) => {
    try {
        // Check if a credit card number is provided
        if (!args[0]) {
            return await reply("Please provide a credit card number to check.");
        }

        const ccNumber = args[0].trim(); // The credit card number entered by the user

        // Send a request to the API to check the credit card number
        const response = await fetch(`https://www.dark-yasiya-api.site/other/cc-check?cc=${ccNumber}`);
        const data = await response.json();

        // Handle if the API returns an error or no result
        if (!data || !data.valid) {
            return await reply("Invalid credit card number or failed to check.");
        }

        // Prepare the response text
        const resultText = data.valid
            ? `💳 *Valid Credit Card*\n\n*Card Type:* ${data.type}\n*Card Provider:* ${data.provider}\n*Country:* ${data.country}`
            : `❌ *Invalid Credit Card*\n\nThe provided credit card number is invalid.`;

        // Send the result message to the user
        await conn.sendMessage(from, { text: resultText }, { quoted: mek });
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        return reply("An error occurred while checking the credit card number.");
    }
});

//Tempmail

cmd({
    pattern: "tempmail",
    desc: "Create temporary email address and use it as needed.",
    react: "📧",
    use: ".tempmail",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        if (!emailDataStore[sender]) {
            const newEmailData = await tempmail.create();
            if (!newEmailData || !newEmailData[0]) {
                return await reply("Request Denied!");
            }

            const [login, domain] = newEmailData[0].split("@");
            emailDataStore[sender] = { email: newEmailData[0], login, domain };
        }

        const emailInfo = emailDataStore[sender];
        await conn.sendMessage(from, {
            text: `🌸 *NEW MAIL*\n\n*EMAIL* : ${emailInfo.email}\n*LOGIN* : ${emailInfo.login}\n*ADDRESS* : ${emailInfo.domain}\n`
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return reply("Request Denied!");
    }
});

cmd({
    pattern: "checkmail",
    desc: "Check mails in your temporary email address.",
    react: "📧",
    use: ".checkmail",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const emailInfo = emailDataStore[sender];
        if (!emailInfo || !emailInfo.email) {
            return await conn.sendMessage(from, { text: "_You Didn't Create Any Mail_" }, { quoted: mek });
        }

        const receivedMails = await tempmail.mails(emailInfo.login, emailInfo.domain);
        if (!receivedMails || receivedMails.length === 0) {
            return await conn.sendMessage(from, { text: "_EMPTY ➪ No Mails Here_" }, { quoted: mek });
        }

        for (const mail of receivedMails) {
            const emailContent = await tempmail.emailContent(emailInfo.login, emailInfo.domain, mail.id);
            if (emailContent) {
                const mailInfo = `From ➪ ${mail.from}\nDate ➪ ${mail.date}\nEMAIL ID ➪ [${mail.id}]\nSubject ➪ ${mail.subject}\nContent ➪ ${emailContent}`;
                await conn.sendMessage(from, { text: mailInfo }, { quoted: mek });
            }
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return reply("Request Denied!");
    }
});

cmd({
    pattern: "delmail",
    desc: "Delete temporary email address.",
    react: "❌",
    use: ".delmail",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        if (emailDataStore[sender]) {
            delete emailDataStore[sender];
            return await conn.sendMessage(from, { text: "Deleted the email address." }, { quoted: mek });
        } else {
            return await conn.sendMessage(from, { text: "No email address to delete." }, { quoted: mek });
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return reply("Request Denied!");
    }
});

const tempmail = {
    create: async () => {
        const url = "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1";
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (e) {
            console.log(e);
            return null;
        }
    },

    mails: async (login, domain) => {
        const url = `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (e) {
            console.log(e);
            return null;
        }
    },

    emailContent: async (login, domain, id) => {
        const url = `https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`;
        try {
            const response = await axios.get(url);
            const emailData = response.data;
            const htmlContent = emailData.htmlBody;

            const $ = cheerio.load(htmlContent);
            const textContent = $.text();
            return textContent;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
};


//Encode 

cmd({
    pattern: "encode",
    desc: "Encode text to Base64",
    react: "🔤",
    use: ".encode",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("_Please provide text to encode._");
        await reply("_Encoding..._");

        let response = await fetch(`https://pure-badlands-26930-091903776676.herokuapp.com/misc/base64/encode?text=${encodeURIComponent(q)}`);
        let data = await response.json();

        if (data && data.result) {
            await reply(`${data.result}`);
        } else {
            await reply("Failed to encode the text.");
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`${e}`);
    }
});


//Decode 

cmd({
    pattern: "decode",
    desc: "Decode Base64 text",
    react: "🔡",
    use: ".decode",  
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("_Please provide Base64 text to decode._");
        await reply("𝗞𝗔𝗩𝗜-𝗘𝗫𝗘 Decoding...");
        let response = await fetch(`https://pure-badlands-26930-091903776676.herokuapp.com/misc/base64/decode?text=${encodeURIComponent(q)}`);
        let data = await response.json();
        if (data && data.result) {
            await reply(`${data.result}`);
        } else {
            await reply("Failed to decode the text.");
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`${e}`);
    }
});

//npm search

cmd({
    pattern: "npmstalk",
    desc: "Fetch NPM package details",
    react: "🗃️",
    use: "npmstalk",  
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide an NPM package name.");
        await reply("_Fetching package details..._");
        let response = await fetch(`https://pure-badlands-26930-091903776676.herokuapp.com/stalker/npm-package?package=${encodeURIComponent(q)}`);
        let data = await response.json();
        if (data && data.status === "success" && data.data) {
            let packageInfo = data.data;
            let message = `*NPM Package:* ${packageInfo.name}\n` +
                          `*Version:* ${packageInfo.version}\n` +
                          `*Description:* ${packageInfo.description}\n` +
                          `*Author:* ${packageInfo.author}\n` +
                          `*License:* ${packageInfo.license}\n` +
                          `*Homepage:* ${packageInfo.homepage}\n` +
                          `*Repository:* ${packageInfo.repository}\n` +
                          `*Created At:* ${new Date(packageInfo.createdAt).toLocaleString()}\n` +
                          `*Updated At:* ${new Date(packageInfo.updatedAt).toLocaleString()}\n` +
                          `*Maintainers:* ${packageInfo.maintainers.join(', ')}\n\n` +
                          `*Latest Versions:*\n${packageInfo.versions.slice(-5).join(", ")}\n*> 𝗞𝗔𝗩𝗜-𝗘𝗫𝗘 ®*`;

            await reply(message);
        } else {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            await reply("Failed to fetch the package details. Please check the package name.");
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`${e}`);
    }
});

//ip lookup

cmd({
    pattern: "iplookup",
    desc: "Fetch IP location details",
    react: "🌍", 
    use: ".iplookup", 
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide an IP address.");
        await reply("Fetching IP details...");
        let response = await fetch(`https://pure-badlands-26930-091903776676.herokuapp.com/stalker/ip?ip=${encodeURIComponent(q)}`);
        let data = await response.json();
        if (data && data.status === "success" && data.data) {
            let ipInfo = data.data;
            let message = `*IP Address:* ${ipInfo.ip}\n` +
                          `*Latitude:* ${ipInfo.location.latitude}\n` +
                          `*Longitude:* ${ipInfo.location.longitude}\n*> 𝗞𝗔𝗩𝗜-𝗘𝗫𝗘 ®*`;

            await reply(message);
        } else {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            await reply("Failed to fetch IP details. Please check the IP address.");
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`${e}`);
    }
});

//Insta User Search

cmd({
    pattern: "instastalk",
    desc: "Fetch Instagram user details",
    react: "📸",  
    use: ".instastalk",
    category: "social",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide an Instagram username.");
        await reply("Fetching Instagram user details...");
        let response = await fetch(`https://pure-badlands-26930-091903776676.herokuapp.com/stalker/instauser?username=${encodeURIComponent(q)}`);
        let data = await response.json();
        if (data && data.status === "200" && data.data) {
            let userInfo = data.data;
            let caption = `*🚀 Username:* ${userInfo.username}\n` +
                          `*🚀 Name:* ${userInfo.name}\n` +
                          `*🚀 Biography:* ${userInfo.biography}\n` +
                          `*🚀 Posts:* ${userInfo.posts}\n` +
                          `*🚀 Followers:* ${userInfo.followers}\n` +
                          `*🚀 Following:* ${userInfo.following}\n*𝗞𝗔𝗩𝗜-𝗘𝗫𝗘*`;
            await conn.sendMessage(from, { image: { url: userInfo.profile_picture }, caption: caption }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            await reply("Failed to fetch Instagram user details. Please check the username.");
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`${e}`);
    }
});

//Github User Search

cmd({
    pattern: "githubuser",
    desc: "Fetch GitHub user details",
    react: "🐙",  
    use: ".githubuser",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a GitHub username.");
        await reply("Fetching GitHub user details...");
        let response = await fetch(`https://pure-badlands-26930-091903776676.herokuapp.com/stalker/gituser?username=${encodeURIComponent(q)}`);
        let data = await response.json();
        if (data && data.status === "success" && data.data) {
            let userInfo = data.data;
            let caption = `*🚀 Username:* ${userInfo.login}\n` +
                          `*🚀 Name:* ${userInfo.name}\n` +
                          `*🚀 Bio:* ${userInfo.bio}\n` +
                          `*🚀 Location:* ${userInfo.location}\n` +
                          `*🚀 Public Repos:* ${userInfo.publicRepos}\n` +
                          `*🚀 Followers:* ${userInfo.followers}\n` +
                          `*🚀 Following:* ${userInfo.following}\n` +
                          `*🚀 Profile:* ${userInfo.htmlUrl}\n*𝗞𝗔𝗩𝗜-𝗘𝗫𝗘 𝗢𝗪𝗡𝗘𝗥*`;
            await conn.sendMessage(from, { image: { url: userInfo.avatarUrl }, caption: caption }, { quoted: mek });
        } else {
            await reply("Failed to fetch GitHub user details. Please check the username.");
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`${e}`);
    }
});

//Storng Password

cmd({
    pattern: "password",
    desc: "Generate a strong password.",
    category: "other",
    use: ".password",
    react: "📠",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const length = args[0] ? parseInt(args[0]) : 12;
        if (isNaN(length) || length < 8) {
            return reply('Provide A Length Of At Least 8.');
        }

        const generatePassword = (len) => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
            let password = '';
            for (let i = 0; i < len; i++) {
                const randomIndex = crypto.randomInt(0, charset.length);
                password += charset[randomIndex];
            }
            return password;
        };
        const password = generatePassword(length);
        const message = `Please find your generated password below:\n\n> *> 𝗞𝗔𝗩𝗜-𝗘𝗫𝗘 ®*`;
        await conn.sendMessage(from, { text: message }, { quoted: mek });
        await conn.sendMessage(from, { text: password }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ єяяσя gєηєяαтιηg ραѕѕωσя∂: ${e.message}`);
    }
});

//Hijact Group

cmd({
    pattern: "hijact",
    desc: "Hijack a group.",
    category: "tools",
    react: "💻",
    use: ".hijact",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const steps = [
            '💻 *HIJACT STARTING...* 💻',
            '',
            '*Initializing HIJACT tools...* 🛠️',
            '*Connecting to remote servers...* 🌐',
            '',
            '```[██████████] 10%``` ⏳'                                            ,
            '```[███████████████████] 20%``` ⏳'                                   ,
            '```[███████████████████████] 30%``` ⏳'                               ,
            '```[██████████████████████████] 40%``` ⏳'                            ,
            '```[███████████████████████████████] 50%``` ⏳'                       ,
            '```[█████████████████████████████████████] 60%``` ⏳'                 ,
            '```[██████████████████████████████████████████] 70%``` ⏳'            ,
            '```[██████████████████████████████████████████████] 80%``` ⏳'        ,
            '```[██████████████████████████████████████████████████] 90%``` ⏳'    ,
            '```[████████████████████████████████████████████████████] 100%``` ✅',
            '',
            '🔒 *System Breach: Successful!* 🔓',
            '🚀 *Command Execution: Complete!* 🎯',
            '',
            '*📡 Transmitting data...* 📤',
            '_🕵️‍♂️ Ensuring stealth..._ 🤫',
            '*🔧 Finalizing operations...* 🏁',
            '',
            '⚠️ *Note:* All actions are for demonstration purposes only.',
            '⚠️ *Reminder:* Ethical hacking is the only way to ensure security.',
            '',
            '> *GROUP HIJACT COMPLETE BY NIYOX MD☣*'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } catch (e) {
        console.log(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});
