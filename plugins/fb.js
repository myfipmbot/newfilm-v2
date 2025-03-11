
const { fetchJson } = require('../lib/functions')
const getFBInfo = require("@xaviabot/fb-downloader");
const config = require('../settings')
const axios = require('axios');
const { cmd, commands } = require('../lib/command')

// Facebook Downloader
cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {

  if (!q || !q.startsWith("https://")) {
    return conn.sendMessage(from, { text: "❌ Please provide a valid URL." }, { quoted: mek });
}

await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

const result = await getFBInfo(q);

    const captionHeader = `
🎬 KAVI-EXE FB DOWNLOADER 🎬

🎞 TITLE 🎞 ${result.title}

🔢 *Please reply the number you want to select*
__________________________
|| [ *1* ] facebook Video
|| 1.1 | 🕯️ 𝗦𝗗 𝗤𝗨𝗔𝗟𝗜𝗧𝗬
|| 1.2 | 💡 𝗛𝗗 𝗤𝗨𝗔𝗟𝗜𝗧𝗬
__________________________
|| [ *2* ] facebook Audio
|| 2.1 | 🎶 *Audio file*
|| 2.2 | 📂 *Document file*
|| 2.3 | 🎤 *Voice cut* [ptt]
___________________________

Fb-Url: -=-${q} 
`;

const sentMsg = await conn.sendMessage(from, {
  image: { url: result.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: captionHeader,
  contextInfo: {
      mentionedJid: ['94760383959@s.whatsapp.net'], // specify mentioned JID(s) if any
      groupMentions: [],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
          newsletterJid: '120363366147331561@newsletter',
          newsletterName: "K A V I  EXE 🐼💗",
          serverMessageId: 999
      },
      externalAdReply: {
          title: 'ᴀ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ®',
          body: '® ᴋᴀᴠɪ ᴇxᴇ ᴠ1 💀',
          mediaType: 1,
          sourceUrl: "",
          thumbnailUrl: 'https://i.ibb.co/VcyTkdCZ/temp-image.jpg', // This should match the image URL provided above
          renderLargerThumbnail: false,
          showAdAttribution: false
      }
  }
});
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
    const mek = messageUpdate.messages[0];
    if (!mek.message) return;
    const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // Check if the message is a reply to the previously sent message
    const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

    if (isReplyToSentMsg) {
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        
        

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1.1') {
            // Handle option 1 (sd File)
            await conn.sendMessage(from, {
              video: { url: result.sd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "KAVI-EXE WHATSAPP BOT",
              contextInfo: {
                  mentionedJid: ['94760383959@s.whatsapp.net'], // specify mentioned JID(s) if any
                  groupMentions: [],
                  forwardingScore: 999,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363366147331561@newsletter',
                      newsletterName: "K A V I  EXE 🐼💗",
                      serverMessageId: 999
                  },
                  externalAdReply: {
                      title: 'ᴀ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ®',
                      body: '® ᴋᴀᴠɪ ᴇxᴇ ᴠ1 💀',
                      mediaType: 1,
                      sourceUrl: "",
                      thumbnailUrl: 'https://i.ibb.co/VcyTkdCZ/temp-image.jpg', // This should match the image URL provided above
                      renderLargerThumbnail: false,
                      showAdAttribution: false
                  }
              }
            });
          }

          else if (messageType === '1.2') {
            // Handle option 2 (hd File)
            await conn.sendMessage(from, {
              video: { url: result.hd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "KAVI-EXE WHATSAPP BOT",
              contextInfo: {
                  mentionedJid: ['94760383959@s.whatsapp.net'], // specify mentioned JID(s) if any
                  groupMentions: [],
                  forwardingScore: 999,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363366147331561@newsletter',
                      newsletterName: "K A V I  EXE 🐼💗",
                      serverMessageId: 999
                  },
                  externalAdReply: {
                      title: 'ᴀ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ®',
                      body: '® ᴋᴀᴠɪ ᴇxᴇ ᴠ1 💀',
                      mediaType: 1,
                      sourceUrl: "",
                      thumbnailUrl: 'https://i.ibb.co/VcyTkdCZ/temp-image.jpg', // This should match the image URL provided above
                      renderLargerThumbnail: false,
                      showAdAttribution: false
                  }
              }
            });
          }
           
          else if (messageType === '2.1') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: result.sd }, mimetype: "audio/mpeg" }, { quoted: mek })
          }
          
          else if (messageType === '2.2') {
            await conn.sendMessage(from, {
              document: { url: result.sd },
              mimetype: "audio/mpeg",
              fileName: `KAVI-EXE/FBDL.mp3`,
              caption: "*© ᴋᴀᴠɪ-ᴇxᴇ-ᴠ1*",
              contextInfo: {
                mentionedJid: ['94760383959@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363366147331561@newsletter',
                    newsletterName: "K A V I  EXE 🐼💗",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'ᴀ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ®',
                    body: '® ᴋᴀᴠɪ ᴇxᴇ ᴠ1 💀',
                    mediaType: 1,
                    sourceUrl: "",
                    thumbnailUrl: 'https://i.ibb.co/VcyTkdCZ/temp-image.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: false
                }
            }
          }, { quoted: mek });
          }
          
          else if (messageType === '2.3') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: result.sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek })
    
          }

        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
  });
} catch (e) {
console.log(e);
reply(`${e}`);
}
})
