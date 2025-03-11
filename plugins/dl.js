const { fetchJson } = require('../lib/functions')
const cheerio = require('cheerio')
const config = require('../settings')
const { igdl } = require('ruhend-scraper')
const axios = require('axios');
const { cmd, commands } = require('../lib/command')
const fetch = require('node-fetch'); // Ensure fetch is imported




cmd({
    pattern: "twitter",
    alias: ["tweet", "twdl"],
    desc: "Download Twitter videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return conn.sendMessage(from, { text: "❌ Please provide a valid Twitter URL." }, { quoted: mek });
    }

    // React to indicate processing start
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    // Fetch video information from Dark Yasiya Twitter API
    const twitterData = await axios.get(`https://www.dark-yasiya-api.site/download/twitter?url=${q}`);
    const data = twitterData.data;

    if (!data || !data.status || !data.result) {
      return m.reply("Failed to retrieve Twitter video. Please check the link and try again.");
    }

    const { desc, thumb, video_sd, video_hd } = data.result;
    const captionHeader = `
🪄 KAVI-EXE TWITTER DOWNLOADER 🪄

📝 Description: ${desc || "No description"}

🔢 *Please reply with the number for your selection* :
__________________________
|| [ *1* ] Twitter Video
|| 1.1 | 🕯️ 𝗦𝗗 𝗤𝗨𝗔𝗟𝗜𝗧𝗬
|| 1.2 | 💡 𝗛𝗗 𝗤𝗨𝗔𝗟𝗜𝗧𝗬
__________________________
|| [ *2* ] Teitter Audio
|| 2.1 | 🎶 *Audio file*
|| 2.2 | 📂 *Document file*
|| 2.3 | 🎤 *Voice cut* [ptt]
___________________________

Twitter URL: ${q}
`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: thumb}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
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
    const messageID = sentMsg.key.id;

    // Listen for the user's response
    conn.ev.on('messages.upsert', async (messageUpdate) => {
      const mek = messageUpdate.messages[0];
      if (!mek.message) return;
      const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
      const from = mek.key.remoteJid;

      // Check if the message is a reply to the previously sent message
      const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

      if (isReplyToSentMsg) {
        // React to the user's selection
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        if (messageType === '1.1') {
          // Send SD video
          await conn.sendMessage(from, {
            video: { url: video_sd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: "ᴋᴀᴠɪ ᴇxᴇ ᴠ1",
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
        } else if (messageType === '1.2') {
          // Send HD video
          await conn.sendMessage(from, {
            video: { url: video_hd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
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
        } else if (messageType === '2.1') {
          // Send audio as an audio file
          await conn.sendMessage(from, { audio: { url: video_sd }, mimetype: "audio/mpeg" }, { quoted: mek });
        } else if (messageType === '2.2') {
          // Send audio as a document file
          await conn.sendMessage(from, {
            document: { url: video_sd },
            mimetype: "audio/mpeg",
            fileName: `KAVI-EXE/TWDL.mp3`,
            caption: "*© ᴋᴀᴠɪ ᴇxᴇ ᴠ1*",
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
        } else if (messageType === '2.3') {
          // Send audio as a voice note (ptt)
          await conn.sendMessage(from, { audio: { url: video_sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });
        }

        // React to completion
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Twitter response sent successfully");
      }
    });
  } catch (e) {
    console.log(e);
    reply(`An error occurred: ${e}`);
  }
});




cmd({
    pattern: "mediafire",
    desc: "To download MediaFire files.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return m.reply("Please provide a valid MediaFire link.");
        
        // React to indicate download start
        m.react('⬇️');
        
        // Fetch file information from the Dark Yasiya API
        const response = await axios.get(`https://www.dark-yasiya-api.site/download/mfire?url=${q}`);
        const resData = response.data;

        if (!resData || !resData.status || !resData.result || !resData.result.dl_link) {
            return m.reply("Failed to fetch MediaFire download link. Ensure the link is valid and public.");
        }

        const fileUrl = resData.result.dl_link;
        const fileName = resData.result.fileName || "mediafire_download";
        const fileType = resData.result.fileType || "application/octet-stream";
        
        // React to indicate file is being sent
        m.react('⬆️');

        let msg = `
        *KAVI-EXE MEDIAFIRE DL*

        💙 File Name : ${fileName}

        💙 File Type : ${fileType}
        `

        // Send file to chat without downloading
        await conn.sendMessage(from, {
          document: { url: fileUrl},
          mimetype: fileType,
          fileName: fileName, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: msg,
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
                  body: '® ᴋᴀᴠɪ ᴇxᴇ ᴠ1💀',
                  mediaType: 1,
                  sourceUrl: "",
                  thumbnailUrl: 'https://i.ibb.co/VcyTkdCZ/temp-image.jpg', // This should match the image URL provided above
                  renderLargerThumbnail: false,
                  showAdAttribution: false
              }
          }
        });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});


cmd({

  pattern: "ig",
  desc: "To download instagram videos.",
  react: "🎥",
  category: "download",
  filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
  
if (!q) return m.reply(`Please Give Me a vaild Link...`);
m.react('⬇️')

       let res = await igdl(q);
      
       let data = await res.data;
       for (let i = 0; i < 20; i++) {
          let media = data[i];
          let downloadurl = media.url
           m.react('⬆️')
          await conn.sendMessage(from,{
            video: {url:downloadurl},
            mimetype:"video/mp4",
            caption: `> *ᴍᴀᴅᴇ ʙʏ ᴋᴀᴠɪ ᴇxᴇ ᴠ1*`,
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
            }},{quoted:mek})
           m.react('✅')
       }

}catch(e){
console.log(e)
}
})



async function xdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]};
      resolve({status: true, result: {title, URL, duration, image, videoType, videoWidth, videoHeight, info, files}});
    }).catch((err) => reject({status: false, result: err}));
  });
}

cmd({
    pattern: "xnxxdown",
    alias: ["dlxnxx","xnxxdl"],
    react: '🫣',
    desc: "Download xnxx videos",
    category: "nsfw",
    use: '.xnxx <xnxx link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 //if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
 if (!q) return reply('*Please give me url !!*')
  let res = await xdl(q)
  let title = res.result.title
  await conn.sendMessage(from, { 
    video: { url: res.result.files.high },
     caption: title,
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
    }}, { quoted: mek })
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

cmd({
  pattern: "xvdown",
  alias: ["dlxv","xvdl"],
  react: '🫣',
  desc: "Download xvideos videos",
  category: "nsfw",
  use: '.xv <xvideos link>',
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{      
//if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
if (!q) return reply('*Please give me url !!*')


let xv_info = await fetchJson(`https://www.dark-yasiya-api.site/download/xvideo?url=${q}`)
const msg = `
         🔞 *XVIDEO DOWNLOADER* 🔞

     
• *Title* - ${xv_info.result.title}

• *Views* - ${xv_info.result.views}

• *Like* - ${xv_info.result.like}

• *Deslike* - ${xv_info.result.deslike}

• *Size* - ${xv_info.result.size}`



await conn.sendMessage(from, {
  video: { url: xv_info.result.dl_link}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: msg,
  contextInfo: {
      mentionedJid: ['94760383959@s.whatsapp.net'], // specify mentioned JID(s) if any
      groupMentions: [],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
          newsletterJid: '120363366147331561@newsletter',
          newsletterName: "K A V I EXE 🐼💗",
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
// SEND VIDEO

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})



//=============apk========

cmd({
    pattern: "apk",
    desc: "Download apk.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {

await m.react("⬇")
      
const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
const response = await axios.get(apiUrl);
const data = response.data;

let step1 = data.datalist.list[0].size % 1000000
let step2 = `.` + step1
let step3 = data.datalist.list[0].size / 1000000
let correctsize = step3 - step2
    
let desc = `
*「 🧩 𝐊𝐀𝐕𝐈-𝐄𝐗𝐄 𝐀𝐏𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 🧩 」*

*╭──📥 𝙰𝙿𝙺 ԃҽƚϙιʅʂ 📥────◦•◦✦•*
*╎*
*╎* *🏷️ ηαмє :* ${data.datalist.list[0].name}
*╎* *📥 ѕιzє :* ${correctsize}MB
*╎* *🔖 ρα¢кαgє :* ${data.datalist.list[0].package}
*╎* *📆 ℓαѕт υρ∂αтє :* ${data.datalist.list[0].updated}
*╎* *👤 ∂єνєℓσρєяѕ :* ${data.datalist.list[0].developer.name}
*╎*
*╰────────────────────◦•◦✦•*
> ᴍᴀᴅᴇ ʙʏ ᴋᴀᴠɪ ᴇxᴇ ᴠ1`
await m.react("⬆")
await conn.sendMessage(from,{
    document: {url: data.datalist.list[0].file.path_alt},
    fileName: data.datalist.list[0].name,
    mimetype: 'application/vnd.android.package-archive',
    caption: desc,
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
    }},{quoted: mek})
        
await m.react("✅")

}catch(e){
console.log(e)
reply(`${e}`)
}
})



cmd({

    pattern: "gdrive",
    desc: "To download Gdrive files.",
    react: "🌐",
    category: "download",
    filename: __filename
  
  },
  
  async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  
  try{
    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
  if (!q) return m.reply(`Please Give Me a vaild Link...`);
  
  const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`;

  const downloadResponse = await axios.get(apiUrl);
                            const downloadUrl = downloadResponse.data.result.downloadUrl; // Assuming this is the correct path

                            if (downloadUrl) {
                                // Send the video as a document (.mp4)
                                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                                await conn.sendMessage(from, {
                                    document: { url: downloadUrl },
                                    mimetype: downloadResponse.data.result.mimetype,
                                    fileName: downloadResponse.data.result.fileName,
                                    caption: `|  ᴍᴀᴅᴇ ʙʏ ᴋᴀᴠɪ ᴇxᴇ ᴠ1.\n\n® 𝐊𝐀𝐕𝐈-𝐄𝐗𝐄 🐼💗`,
                                    contextInfo: {
                                        mentionedJid: ['94760383959@s.whatsapp.net'], // specify mentioned JID(s) if any
                                        groupMentions: [],
                                        forwardingScore: 999,
                                        isForwarded: true,
                                        forwardedNewsletterMessageInfo: {
                                            newsletterJid: '120363366147331561@newsletter',
                                            newsletterName: "K A V I EXE 🐼💗",
                                            serverMessageId: 999
                                        },
                                        externalAdReply: {
                                            title: 'ᴀ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ®',
                                            body: '® ᴋᴀᴠɪ ᴇxᴇ 💀',
                                            mediaType: 1,
                                            sourceUrl: "",
                                            thumbnailUrl: 'https://i.ibb.co/VcyTkdCZ/temp-image.jpg', // This should match the image URL provided above
                                            renderLargerThumbnail: false,
                                            showAdAttribution: false
                                        }
                                    }
                                }, { quoted: mek });
                            }
         
                            await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
  }catch(e){
  console.log(e)
  }
  });
  