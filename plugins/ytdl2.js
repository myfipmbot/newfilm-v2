const config = require('../settings');
const { cmd } = require('../lib/command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); 

// video

cmd({ 
    pattern: "video", 
    alias: ["video", "ytv"], 
    react: "🎥", 
    desc: "Download Youtube song", 
    category: "download", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("*𝐏ℓєαʂє 𝐏ɼ๏νιɖє 𝐀 𝐘ʈ 𝐔ɼℓ ๏ɼ 𝐕ιɖє๏ 𝐍αмє..*");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }
        
        let ytmsg = `╔═══〔 *☬𝗞𝗔𝗩𝗜-𝗘𝗫𝗘-𝗩1☬* 〕═══❒
║╭───────────────◆  
║│ *❍ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*
║╰───────────────◆
╚══════════════════❒
╔══════════════════❒
║ 📅 *ᴛɪᴛʟᴇ:*  ${yts.title}
║ ⏳ *ᴅᴜʀᴀᴛɪᴏɴ:*  ${yts.timestamp}
║ 🌍 *ᴠɪᴇᴡs:*  ${yts.views}
║ 📂 *ᴀᴜᴛʜᴏʀ:*  ${yts.author.name}
║ 🖇️ *ʟɪɴᴋ:*  ${yts.url}
╚══════════════════❒
*ᴋᴀᴠɪ-ᴇxᴇ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ 👨‍💻💓*`;

        // Send video details
        await conn.sendMessage(from, { image: { url: data.result.thumbnail || '' }, caption: ytmsg }, { quoted: mek });
        
        // Send video file
        await conn.sendMessage(from, { video: { url: data.result.download_url }, mimetype: "video/mp4" }, { quoted: mek });
        
        // Send document file (optional)
        await conn.sendMessage(from, { 
            document: { url: data.result.download_url }, 
            mimetype: "video/mp4", 
            fileName: `${data.result.title}.mp4`, 
            caption: `*${yts.title}*\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋᴀᴠɪ-ᴇxᴇ🎬*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});  
       
// play

cmd({ 
     pattern: "play", 
     alias: ["yta", "play"], 
     react: "🎶", 
     desc: "Download Youtube song",
     category: "download", 
     use: '.song < Yt url or Name >', 
     filename: __filename }, 
     async (conn, mek, m, { from, prefix, quoted, q, reply }) => 
     
     { try { if (!q) return await reply("*ᴇɴᴛᴇʀ ʏᴏᴜʀ ꜱᴏɴɢ ɴᴀᴍᴇ ? *");

const yt = await ytsearch(q);
    if (yt.results.length < 1) return reply("No results found!");
    
    let yts = yt.results[0];  
    let apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;
    
    let response = await fetch(apiUrl);
    let data = await response.json();
    
    if (data.status !== 200 || !data.success || !data.result.downloadUrl) {
        return reply("Failed to fetch the audio. Please try again later.");
    }
    
    let ytmsg = `╔═══〔 *☬𝗞𝗔𝗩𝗜-𝗘𝗫𝗘-𝗩1☬* 〕═══❒
║╭───────────────◆  
║│ *𝐒𝐎𝐍𝐆 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆*
║╰───────────────◆
╚══════════════════❒
╔══════════════════❒
║ 📅 *ᴛɪᴛʟᴇ:*  ${yts.title}
║ ⏳ *ᴅᴜʀᴀᴛɪᴏɴ:*  ${yts.timestamp}
║ 🌍 *ᴠɪᴇᴡs:*  ${yts.views}
║ 📂 *ᴀᴜᴛʜᴏʀ:*  ${yts.author.name}
║ 🖇️ *ʟɪɴᴋ:*  ${yts.url}
╚══════════════════❒
*ᴋᴀᴠɪɪ-ᴇxᴇ ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ 👨‍💻💓*`;



// Send song details
    await conn.sendMessage(from, { image: { url: data.result.image || '' }, caption: ytmsg }, { quoted: mek });
    
    // Send audio file
    await conn.sendMessage(from, { audio: { url: data.result.downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
    
    // Send document file
    await conn.sendMessage(from, { 
        document: { url: data.result.downloadUrl }, 
        mimetype: "audio/mpeg", 
        fileName: `${data.result.title}.mp3`, 
        caption: `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋᴀᴠɪ-ᴇxᴇ🎵*`
    }, { quoted: mek });

} catch (e) {
    console.log(e);
    reply("An error occurred. Please try again later.");
}

});
