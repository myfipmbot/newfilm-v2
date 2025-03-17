const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');



cmd({
    pattern: "movie",
    category: "movie",
    react: "🎬",
    desc: "cinesubz & ytsmx & sinhalasub & Firemoviehub movie downloader",
    use: ".movie movie name",
    filename: __filename   
},
    async (conn, mek, m, { reply, isDev, from, l, q, prefix }) => {
        try {
  
        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

        
const sections = [
{
	title: "*🎬 SELECT MOVIE SITES 🎬*",
	rows: [
	    {title: "    1", rowId: prefix + `cinesubz ` + q , description: 'Download in Cinesubz'},
            {title: "    2", rowId: prefix + `sinhalasub ` + q , description: 'Download in Sinhalsub'},
	    {title: "    3", rowId: prefix + `ytsmx ` + q , description: 'Download in Ytsmx'},
	    {title: "    4", rowId: prefix + `firemovie ` + q , description: 'Download in Firemoviehub'},
      ]
    }, 	  
{
	title: "*🎬 SELECT SUBSTITLE SITES 🎬*",
	rows: [
	    {title: "    5", rowId: prefix + `zoom ` + q , description: 'Download in Zoom'},
            {title: "    6", rowId: prefix + `subz ` + q , description: 'Download in Subz'},
	    {title: "    7", rowId: prefix + `s-subtitle ` + q , description: 'Download in S-subtitle'},
	  
      ]
    }
]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

Availble movies sites....

- Cinesubz ➱ https://cinesubz.co/
- Sinhalasubs ➱ https://sinhalasub.lk/
- Ytsmx ➱ https://yts.mx/
- Firemovie ➱ https://firemovieshub.com/

Available Subtitle sites....

- Sinhalasubstitle ➱ https://sinhala-subtitles.com/
- Zoom ➱ https://zoom.lk/
- Subz ➱ https://subz.lk/`,
image : { url: config.LOGO },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from Cinezubs & Ytsmx & Firemoviehub and sinhalasub. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



//===============GINISISILA================


cmd({
    pattern: "ginisisila",	
    react: '📑',
    category: "movie",
    desc: "ginisisila cartoon downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://ginisisilacartoon.net/search.php?q=${q}`
     const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let results = [];
    $("#page_panels_ > table > tbody > tr > td > div").each((c, d) => {
        results.push({
             title: $(d).find("div.video-title").text(),
             date: $(d).find("div.posted-time").text(),
             image: $(d).find("a > img").attr("src"),
             link: $(d).find("a").attr("href"),

        })
    })

if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title  + '+' + results[i].date,
rowId: prefix + 'ginidl ' + results[i].link
});
}
const sections = [{
title: "_[Result from ginisisila.]_",
rows: srh
}]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: `https://i.ibb.co/0s0WcmF/1og6o9e2.png` },	    
footer: 'MOVIE DOWNLOADER BY TC',
title: 'Search By firemovieshub',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
	

cmd({
    pattern: "ginidl",	
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')


const genurl = `https://ginisisilacartoon.net/${q}`
		    const response = await axios.get(genurl);
                    const $ = cheerio.load(response.data);
		    const download = $("#player-holder > div > iframe").attr("src");
		    const mtitle = $("#watch-contentHd").text();

const cap = `📃 *Title:* ${mtitle}`
		    
  const sections = [
{
	title: "*🎬 MOVIE-SEARCH-SITE 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `gdrive ${download}` , description: `Download in ${mtitle}`},	
	]
    }	  
]
const listMessage = {
text: cap,
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By ginisisila',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

//==============YTSMX=================





cmd({
    pattern: "ytsmx",	
    react: '📑',
    category: "movie",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://yts.mx/browse-movies/${q}/all/all/0/latest/0/all`
const response = await axios.get(url);	
const $ = cheerio.load(response.data);

let results = [];
    $("section > div.row > div").each((c, d) => {
        results.push({
             title: $(d).find("div.browse-movie-bottom > a").text(),
             year: $(d).find("div.browse-movie-bottom > div").text(),
             link: $(d).find("a").attr("href"),
             image: $(d).find("a > figure > img").attr("src"),
             rating: $(d).find("a > figure > figcaption > h4.rating").text(),
             danne: $(d).find("a > figure > figcaption > h4").eq(1).text(),
             danne1: $(d).find("a > figure > figcaption > h4").eq(2).text(),
           

        })
    })

	    console.log(results)
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title + '+' + results[i].year,
rowId: prefix + 'ytmx ' + results[i].link
});
}
const sections = [{
title: "_[Result from ytsmx.]_",
rows: srh
}]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: `https://i.ibb.co/rF1dj3m/fq5tvyo.jpg` },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from ytsmx. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "ytmx",	
    react: '📑',
    category: "",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
const response = await axios.get(q);	
const $ = cheerio.load(response.data);

	const title = $("#mobile-movie-info > h1").text();
        const year = $("#mobile-movie-info > h2:nth-child(2)").eq(0).text();
        const language = $("#mobile-movie-info > h2 > span").text();
        const image = $("#movie-poster > img").attr("src");
        const enter = $("#mobile-movie-info > h2").eq(1).text();
        let results = [];
      $("div.modal.modal-download.hidden-xs.hidden-sm > div > div > div").each((c, d) => {
          results.push({ 
               quality: $(d).find("div > span").text(),
               type: $(d).find("p.quality-size").eq(0).text(),
               size: $(d).find("p.quality-size").eq(1).text(),
               torrent_file: $(d).find("a").attr("href"),
               magnet: $(d).find("a.magnet-download.download-torrent.magnet").attr("href"),
          })
      })
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].quality  + '+' + results[i].size,
rowId: prefix + 'ytmxdl ' + results[i].magnet
});
}
const sections = [{
title: "_[Result from ytsmx.]_",
rows: srh
}]

    const listMessage = {
caption: `📑 *Title:* ${title}\n
🧬 *Year:* ${year}\n
🫧 *Language:* ${language}`,
image : { url: image },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By ytsmx',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "ytmxdl",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isDev, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
	

							 
    

var Seedr = require("seedr");
var seedr = new Seedr();
await seedr.login("moviebot2003@gmail.com","Vajira2003@");

const ad_mg = await conn.sendMessage(from, { text : 'ᴜᴘʟᴏᴀᴅɪɴɢ magnet file...📥' }, {quoted: mek} )
const magnet = await seedr.addMagnet(q);

	var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ᴜᴘʟᴏᴀᴅᴇᴅ ᴍᴀɢɴᴇᴛ ꜰɪʟᴇ ✅..."
]
let { key } = await conn.sendMessage(from, {text: 'ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ᴜᴘʟᴏᴀᴅᴇᴅ ᴍᴀɢɴᴇᴛ ꜰɪʟᴇ ✅...' , edit : ad_mg.key }, {quoted: mek})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}


    if (magnet.code === 400 || magnet.result !== true) {
        console.log("Error adding magnet " + JSON.stringify(magnet, null, 2))
        return null;
    }
    var contents = []
	do {
		contents = await seedr.getVideos();
	} while (contents.length === 0);


		var file = await seedr.getFile(contents[0][0].id);
		var folder_id=  contents[0][0].fid 

	const link = file.url
await conn.sendMessage(from,{document:await getBuffer(link),mimetype:"video/mp4",fileName:`${file.name} | ${uploader}.mp4`,caption:`${file.name}\n\n> ᴠᴀᴊɪʀᴀ-ᴍᴅ ʙʏ ᴛᴄ ᴛᴇᴀᴍ`}
)
	await seedr.deleteFolder(folder_id)
await conn.sendMessage(from, { text : `Movie send ${config.JID} Successfull ✔` }, {quoted: mek} )
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})

//================FIREMOVIEHUB===============




cmd({
    pattern: "firemovie",	
    react: '📑',
    category: "movie",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://firemovieshub.com/?s=${q}`;

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: true }); // headless: true means the browser will run in the background
    const page = await browser.newPage();

    // Set a user-agent and go to the page
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait for the results to load (adjust the selector to the page's content)
    await page.waitForSelector('div.title a'); // This waits for the movie titles to appear

    // Get the page content after it has loaded
    const pageContent = await page.content();

    // Use Cheerio to parse the page content
    const $ = cheerio.load(pageContent);

    // Extract movie titles and links from the page
    const data = [];
    $("div.result-item").each((c, d) => {

        data.push({
             
         title: $(d).find("div.title > a").text(),
         ntitle: $(d).find("span.movies").text(),
         year: $(d).find("span.year").text(),
         link: $(d).find("a").attr("href"),
         image: $(d).find("img").attr("src")
         
         
        })
    })

await browser.close();

	
if (data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1,
description: data[i].title,
rowId: prefix + 'firemvs ' + data[i].link
});
}
const sections = [{
title: "_[Result from firemovie.]_",
rows: srh
    }	  				 
 ]

    const listMessage = {
caption: `🎬 VAJIRA-MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: config.LOGO },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from firemovie. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "firemvs",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

const url = `${q}`

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: true }); // headless: true means the browser will run in the background
    const page = await browser.newPage();

    // Set a user-agent and go to the page
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait for the results to load (adjust the selector to the page's content)
    await page.waitForSelector('div.data > h1'); // This waits for the movie titles to appear

    // Get the page content after it has loaded
    const pageContent = await page.content();

    // Use Cheerio to parse the page content
    const $ = cheerio.load(pageContent);

    // Extract movie titles and links from the page
   
  
const title = $("div.data > h1").text()
const image = $("div.poster > img").attr("src")
const theme = $("span.tagline").text()
const date = $("span.date").text()
const duration = $("span.runtime").text()
const generos = $("div.sgeneros > a:nth-child(1)").text()
const generos1 = $("div.sgeneros > a:nth-child(2)").text()
const generos2 = $("div.sgeneros > a:nth-child(3)").text()
const desc = $("div.wp-content > p").text()
const imdb = $("span.valor > strong").text()
    // Output the results
   
    
   

      const $1 = cheerio.load(pageContent)
      const data = [];
      $1("tbody > tr").each((c, d) => {
          data.push({            
           link: $1(d).find("a").attr("href"),
           quality: $1(d).find("strong.quality").text(),
           size: $1(d).find("td:nth-child(3)").text()      
          })      
      })
 
    // Close the browser after scraping
    await browser.close();
	
	
var msg = `*_☘Title ➩ ${title}_*\n\n`
	 msg += `📽️ ━━━━━━━━━━━━━━━━━━━📽️\n\n`	
         msg += `	  📆  *Date* ➩ ${date}\n\n`
         msg += `	  🏷️  *Rate* ➩ ${imdb}\n\n`
	 msg += `	  🌍  *Theme* ➩ ${theme}\n\n`	
         msg += `	  🕘  *Duration* ➩ ${duration}\n\n`
         msg += `	  🕘  *Generos* ➩ ${generos} ${generos1} ${generos2}\n\n`
	 msg += `*📍Link* ➩ ${q}\n\n`	
	 msg += `📽️ ━━━━━━━━━━━━━━━━━━━📽️\n\n\n`	
         msg += `> ★❮• 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗙𝗜𝗥𝗘𝗠𝗢𝗩𝗜𝗘𝗛𝗨𝗕 𝗠𝗢𝗩𝗜𝗘 𝗗𝗟 •❯★` 
		    
if (data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )

var srh = [];

	
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1.1,
description: data[i].quality + ' | ' + data[i].size,
rowId: prefix + `firedl ${data[i].link}`
});
}

const sections = [
{
title: "",
rows: srh
},	
{
	title: "*🎬 MOVIE INFO 🎬*",
	rows: [
	    {title: "    1", rowId: prefix + `firemovies ${q}` , description: 'Send Movie Details'},

       ]
    }	  		  
]
const listMessage = {
caption: msg,
image : { url: image },	
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By firemovie',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: `firedl`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }
    try {

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: true }); // headless: true means the browser will run in the background
    const page = await browser.newPage();

    // Set a user-agent and go to the page
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(q, { waitUntil: 'domcontentloaded' });

    // Wait for the results to load (adjust the selector to the page's content)
    await page.waitForSelector('small.text a'); // This waits for the movie titles to appear

    // Get the page content after it has loaded
    const pageContent = await page.content();

    // Use Cheerio to parse the page content
    const $ = cheerio.load(pageContent);

    // Extract movie titles and links from the page
   
  
  
   
    const title = $('small.text a').text();      
     const dllink = $("a#link.btn").attr("href")
 
    // Close the browser after scraping
    await browser.close();

	    
     /*   //const mediaUrl = q.trim();
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tc_movie_dl_system'
	    */

var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}



        const message = {
          //  document: await getBuffer(mediaUrl),
	    document: await getFile(dllink),
	    caption: `${title}\n*🎬 VAJIRA MD TEAM MOVIEDL 🎬*`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };


	    
        await conn.sendMessage(from, message );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});



//===============SINHALASUBS================




cmd({
    pattern: "sinhalasub",	
    react: '📑',
    category: "movie",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://sinhalasub.lk?s=${q}`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
   
    const data = [];
    $("div.result-item").each((c, d) => {

        data.push({
             
       link: $(d).find("div.title > a").attr("href"),
         title: $(d).find("div.title > a").text(),       
        })
    })


 const response1 = await axios.get(url);  
const $1 = cheerio.load(response1.data);
const next1 = $1("div.pagination > a.arrow_pag").attr("href")
      const nextall = $1("div.resppages > a:nth-child(2)").attr("href")
	
if (data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1,
description: data[i].title,
rowId: prefix + 'subin ' + data[i].link
});
}
const sections = [{
title: "_[Result from sinhalasub.]_",
rows: srh
},
{
	title: "*🎬 Next Page 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `sinhalasub1 ${next1}` , description: 'Next Page'},

       ]
    }	  				 
 ]

    const listMessage = {
caption: `🎬 VAJIRA-MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: `https://github.com/kushansewmina1234/DARKSHAN-DATA/blob/main/media/image/IMG-20240907-WA0009.jpg?raw=true` },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from sinhalasub. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "sinhalasub1",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	
const response = await axios.get(q);  
const $ = cheerio.load(response.data);
   
    const data = [];
    $("div.result-item").each((c, d) => {

        data.push({
             
       link: $(d).find("div.title > a").attr("href"),
         title: $(d).find("div.title > a").text(),       
        })
    })


 const response1 = await axios.get(q);  
const $1 = cheerio.load(response1.data);
const next1 = $1("div.pagination > a.arrow_pag").attr("href")
      const nextall = $1("div.resppages > a:nth-child(2)").attr("href")
if (data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1,
description: data[i].title,
rowId: prefix + 'subin ' + data[i].link
});
}
const sections = [{
title: "_[Result from sinhalasub.]_",
rows: srh
},
{
	title: "*🎬 Next Page 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `sinhalasub1 ${nextall}` , description: 'Next Page'},

       ]
    }	  				 
 ]

    const listMessage = {
caption: `🎬 VAJIRA-MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: `https://github.com/kushansewmina1234/DARKSHAN-DATA/blob/main/media/image/IMG-20240907-WA0009.jpg?raw=true` },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from sinhalasub. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


	

cmd({
    pattern: "subin",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
if (q.includes("https://sinhalasub.lk/movies")) {
const response = await axios.get(q);
		    const $x = cheerio.load(response.data);
		    const newsArticle = $x(".sheader").first();
                    const newsHeadline = newsArticle.find(".data .head h1").text();
                    const newsDate = newsArticle.find(".extra .tagline").text().trim();
                    const newsTime = newsArticle.find(".poster img").attr("src");
                    const date = newsArticle.find(".extra .date").text().trim();
                    const duration = newsArticle.find(".extra .runtime").text().trim();
                    const infoMovie = $x("#info").first();
                    const desc = infoMovie.find(".wp-content p").text().trim();
                    const rat = infoMovie.find("#repimdb strong").text().trim();
                    const img = infoMovie.find("#dt_galery .owl-item a").attr("src");
                    const country = $x("#single > div.content.right > div.sheader > div.data > div.extra > span.country").text().trim();
const response1 = await axios.get(q);  
const $ = cheerio.load(response1.data);
   
    const data = [];
    $("div#download.sbox > div > div > table > tbody > tr").each((c, d) => {
        data.push({             
         link: $(d).find("td > a").attr("href"),
         quality: $(d).find("td > strong").text(),
         size: $(d).find("td:nth-child(3)").text()       
        })
    })
const response2 = await axios.get(q);  
const $1 = cheerio.load(response2.data);   
    const data1 = [];
    $1("div#download-02.sbox > div > div > table > tbody > tr").each((c, d) => {
        data1.push({           
         link: $1(d).find("td > a").attr("href"),
         quality: $1(d).find("td > strong").text(),
         size: $1(d).find("td:nth-child(3)").text()         
        })
    })
const response3 = await axios.get(q);  
const $2 = cheerio.load(response3.data);
    const data2 = [];
    $2("div#download-03.sbox > div > div > table > tbody > tr").each((c, d) => {
        data2.push({           
         link: $2(d).find("td > a").attr("href"),
         quality: $2(d).find("td > strong").text(),
         size: $2(d).find("td:nth-child(3)").text()        
        })
    })

const response4 = await axios.get(q);  
const $3 = cheerio.load(response4.data);
const images = []
        $3("div.g-item").each((i, el) => {
	images.push({	
             url2: $3(el).find("a").attr("href").replace("\n" , ""),
             
	})    
 })
	
	
const cap = `*👾 Available All Movies...*

ඔබට අවශ්‍ය movie site එක තෝරන්න`
		    
if (data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
if (data1.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
if (data2.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];
var srh1 = [];	
var srh2 = [];
	
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1.1,
description: data[i].quality + ' | ' + data[i].size,
rowId: prefix + `mp4 ${data[i].link}|${newsHeadline}`
});
}
for (var i = 0; i < data1.length; i++) {
srh1.push({
title: i + 1.2,
description: data1[i].quality + ' | ' + data1[i].size,
rowId: prefix + `mega ${data1[i].link}|${newsHeadline}`
});
}	
for (var i = 0; i < data2.length; i++) {
srh2.push({
title: i + 1.3,
description: data2[i].quality + ' | ' + data2[i].size,
rowId: prefix + `mp41 ${data2[i].link}|${newsHeadline}`
});
}	
	
const sections = [
{
title: "_Pixeldrain Download_",
rows: srh
},
{
title: "_Mega Download_",
rows: srh1
},	
{
title: "_Ddl Download_",
rows: srh2
},	
{
	title: "*🎬 Send Movie Images 🎬*",
	rows: [
	    {title: "    1", rowId: prefix + `subinimg ${q}|${q}` , description: 'Send Movie Images'},

       ]
    },	
{
	title: "*🎬 MOVIE INFO 🎬*",
	rows: [
	    {title: "    2", rowId: prefix + `subins ${q}` , description: 'Send Movie Details'},

       ]
    }
]
const listMessage = {
caption: `📃 *Title: ${newsHeadline}*
🔗 *Link:* ${q}
📅 *Year:* ${date}
🔖 *Rating:* ${rat}
🪡 *Country:* ${country}
⏳ *Duration:* ${duration}`,
image : { url: images[0].url2 },	
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By sinhalsub',
buttonText: '*🔢 Reply below number*',
sections
}

	
return await conn.replyList(from, listMessage ,{ quoted : mek })
}





   if (q.includes("https://sinhalasub.lk/tvshows")) {
const responsez = await axios.get(q);  
const $z = cheerio.load(responsez.data);    
const images = $z("div.poster > img").attr("src")
const titles = $z("div.head > h1").text()
const dates = $z("div.extra > span.date").text()   
const rates = $z("div.starstruck-rating > span.dt_rating_vgs").text()
const generos = $z("div.sgeneros > a:nth-child(1)").text()
const generos1 = $z("div.sgeneros > a:nth-child(2)").text()	
const responsev = await axios.get(q);  
const $c = cheerio.load(responsev.data);
    const datas = [];
    $c("ul.episodios > li").each((c, d) => {
        datas.push({
         link: $c(d).find("div.episodiotitle > a").attr("href"),    
         title1: $c(d).find("div.numerando").text(),
         episode: $c(d).find("div.episodiotitle > a").text()
        })
    })
	
const cap = `*👾 Available All Movies...*

ඔබට අවශ්‍ය movie site එක තෝරන්න`
		    
if (datas.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srhss = [];
	
for (var i = 0; i < datas.length; i++) {
srhss.push({
title: i + 1.1,
description: datas[i].title1 + ' | ' + datas[i].episode,
rowId: prefix + `subintv1 ${datas[i].link}`
});
}
	
const sections = [
{
title: "_Select Episode_",
rows: srhss
    }	  		  
]
const listMessage = {
caption: `📃 *Title: ${titles}*
🔗 *Link:* ${q}
📅 *Year:* ${dates}
🔖 *Rating:* ${rates}
🪡 *Generos:* ${generos} ${generos1}`,
image : { url: images },	
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By sinhalsub',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
}



	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "subinimg",
    react: "✔️",
    dontAddCommandList : true ,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, mentionByTag, db_pool, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

const mediaUrl = q.split("|")[0]
        const link = q.split("|")[1]  || 'tc_movie_dl_system'

const response4 = await axios.get(link);  
const $3 = cheerio.load(response4.data);
const images = []
        $3("div.g-item").each((i, el) => {
	images.push({	
             url2: $3(el).find("a").attr("href").replace("\n" , ""),
             
	})    
 })


if (images.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srhss = [];
	
for (var i = 0; i < images.length; i++) {
srhss.push({
title: i + 1,
description: i + 1,
rowId: prefix + `dimg ${images[i].url2}`
});
}
	
const sections = [
{
title: "_Select Image",
rows: srhss
    }	  		  
]
const listMessage = {
text: `See More images`,
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By sinhalsub',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})






   
cmd({
    pattern: "subins",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')

		const response = await axios.get(q);
		    const $x = cheerio.load(response.data);


		    const newsArticle = $x(".sheader").first();
                    const newsHeadline = newsArticle.find(".data .head h1").text();
                    const newsDate = newsArticle.find(".extra .tagline").text().trim();
                    const newsTime = newsArticle.find(".poster img").attr("src");
                    const date = newsArticle.find(".extra .date").text().trim();
                    const duration = newsArticle.find(".extra .runtime").text().trim();
                    const infoMovie = $x("#info").first();
                    const desc = infoMovie.find(".wp-content p").text().trim();
                    const rat = infoMovie.find("#repimdb strong").text().trim();
                    const img = infoMovie.find("#dt_galery .owl-item a").attr("src");
                    const country = $x("#single > div.content.right > div.sheader > div.data > div.extra > span.country").text().trim();
		   //if (download_links.length < 1) return await conn.sendMessage(from, { text: `🚫 Download Link Not Found: *${q}*` }, { quoted: mek } )

      const response4 = await axios.get(q);  
const $3 = cheerio.load(response4.data);
const images = []
        $3("div.g-item").each((i, el) => {
	images.push({	
             url2: $3(el).find("a").attr("href").replace("\n" , ""),
             
	})    
 })
                     /* const msg = `◉ 📌 *Title:* ${newsHeadline}\n\n
🧬 *Year:* ${date}\n
🖊️ *Link:* ${q}\n
✨ *Rating:* ${rat}\n
⌚ *Duration:* ${duration}\n
📑 *Desc:* ${desc}\n\n
> 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗦𝗜𝗡𝗛𝗔𝗟𝗔𝗦𝗨𝗕 𝗠𝗗𝗟`*/

let  msg = `*_☘Title ➩ ${newsHeadline}_*\n\n`
	 msg += `📽️ ━━━━━━━━━━━━━━━━━━━📽️\n\n`	
         msg += `	  📆  *Date* ➩ ${date}\n\n`
         msg += `	  🏷️  *Rate* ➩ ${rat}\n\n`
	 msg += `	  🌍  *Country* ➩ ${country}\n\n`	
         msg += `	  🕘  *Duration* ➩ ${duration}\n\n`
	 msg += `*📍Link* ➩ ${q}\n\n`	
	 msg += `📽️ ━━━━━━━━━━━━━━━━━━━📽️\n\n\n`	
         msg += `> ★❮• 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗦𝗜𝗡𝗛𝗔𝗟𝗔𝗦𝗨𝗕 𝗠𝗢𝗩𝗜𝗘 𝗗𝗟 •❯★` 
		
return await conn.sendMessage(from, { image: { url:images[0].url2 } , caption: msg } , { quoted: mek })
//await conn.sendMessage(from , { text: msg  }, { quoted: mek } )	
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*error!!*')
            console.log(e)
            }
    })       



cmd({
    pattern: "subintv1",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

const response = await axios.get(q);  
const $x = cheerio.load(response.data);    
const image = $x("#clickfakeplayer > div > img").attr("src")
const title = $x("div#info.sbox > h1").text()
const episode = $x("div.wp-content > h3.epih3").text()   
const date = $x("#info > span").text()
	
const response1 = await axios.get(q);  
const $ = cheerio.load(response1.data);   
    const data = [];
    $("div#download.sbox > div > div > table > tbody > tr").each((c, d) => {
        data.push({             
         link: $(d).find("td > a").attr("href"),
         quality: $(d).find("td > strong").text(),
         size: $(d).find("td:nth-child(3)").text()       
        })
    })
const response2 = await axios.get(q);  
const $1 = cheerio.load(response2.data);   
    const data1 = [];
    $1("div#download-02.sbox > div > div > table > tbody > tr").each((c, d) => {
        data1.push({           
         link: $1(d).find("td > a").attr("href"),
         quality: $1(d).find("td > strong").text(),
         size: $1(d).find("td:nth-child(3)").text()         
        })
    })
const response3 = await axios.get(q);  
const $2 = cheerio.load(response3.data);
    const data2 = [];
    $2("div#download-03.sbox > div > div > table > tbody > tr").each((c, d) => {
        data2.push({           
         link: $2(d).find("td > a").attr("href"),
         quality: $2(d).find("td > strong").text(),
         size: $2(d).find("td:nth-child(3)").text()        
        })
    })
	
	
const cap = `*👾 Available All Movies...*

ඔබට අවශ්‍ය movie site එක තෝරන්න`
		    
if (data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
if (data1.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
if (data2.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];
var srh1 = [];	
var srh2 = [];
	
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1.1,
description: data[i].quality + ' | ' + data[i].size,
rowId: prefix + `mp4 ${data[i].link}|${title}`
});
}
for (var i = 0; i < data1.length; i++) {
srh1.push({
title: i + 1.2,
description: data1[i].quality + ' | ' + data1[i].size,
rowId: prefix + `mega ${data1[i].link}|${title}`
});
}	
for (var i = 0; i < data2.length; i++) {
srh2.push({
title: i + 1.3,
description: data2[i].quality + ' | ' + data2[i].size,
rowId: prefix + `mp41 ${data2[i].link}|${title}`
});
}	
	
const sections = [
{
title: "_Pixeldrain Download_",
rows: srh
},
{
title: "_Mega Download_",
rows: srh1
},	
{
title: "_Ddl Download_",
rows: srh2
},	
{
	title: "*🎬 MOVIE INFO 🎬*",
	rows: [
	    {title: "    1", rowId: prefix + `subinstv ${q}` , description: 'Send Movie Details'},

       ]
    }	  		  
]
const listMessage = {
caption: `📃 *Title: ${title}*
🔗 *Link:* ${q}
📅 *Year:* ${date}
🔖 *Episode:* ${episode}`,
image : { url: image },	
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By sinhalsub',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "subinstv",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')


const response = await axios.get(q);  
const $ = cheerio.load(response.data);    
const image = $("#clickfakeplayer > div > img").attr("src")
const title = $("div#info.sbox > h1").text()
const episode = $("div.wp-content > h3.epih3").text()   
const date = $("#info > span").text()
		
let  msg = `*_☘Title ➩ ${title}_*\n\n`
	 msg += `📽️ ━━━━━━━━━━━━━━━━━━━📽️\n\n`	
         msg += `	  📆  *Date* ➩ ${date}\n\n`
	 msg += `	  🌍  *Episode* ➩ ${episode}\n\n`	
	 msg += `*📍Link* ➩ ${q}\n\n`	
	 msg += `📽️ ━━━━━━━━━━━━━━━━━━━📽️\n\n\n`	
         msg += `> ★❮• 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗦𝗜𝗡𝗛𝗔𝗟𝗔𝗦𝗨𝗕 𝗠𝗢𝗩𝗜𝗘 𝗗𝗟 •❯★` 
		
return await conn.sendMessage(from, { image: { url:image } , caption: msg } , { quoted: mek })
//await conn.sendMessage(from , { text: msg  }, { quoted: mek } )	
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*error!!*')
            console.log(e)
            }
    })       






//==============CINESUBZ=================




cmd({
    pattern: "cinesubz",
    category: "movie",
    react: "🎬",
    desc: "Download cinesubz movie",
    use: ".movie movie name",
    filename: __filename   
},
    async (conn, mek, m, { reply, isDev, from, l, q, prefix }) => {
        try {
  
        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

        const fsdata = `https://cinesubz.co/?s=${q}`
        const response = await axios.get(fsdata);
        const $ = cheerio.load(response.data);
        
        let results = [];   
        $("div.content.rigth.csearch > div > div.result-item > article").each((c, d) => {
          results.push({
              title: $(d).find("div.details > div.title > a").text().trim(),
              image: $(d).find("div.image > div > a > img").attr("src"),
              link: $(d).find("div.image > div > a").attr("href"),
              category: $(d).find("div.image > div > a span.movies").text().trim(),
              year: $(d).find("div.details > div.meta > span.year").text().trim(),
          })  
        })

	

		
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )		
	

var srh = [];  		
	
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,	
description: results[i].title,
rowId: prefix + 'cinefind ' + results[i].link
});

	
}		
const sections = [
	{
title: "*🎬 ＤＯＷＮＬＯＡＤ ＳＵＢ ＦＲＯＭ ＣＩＮＥＳＵＢＺ 🎬*\n",
rows: srh
}
]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: results[1].image },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from Cinezubs & Ytsmx. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})







  cmd({
    pattern: "cinefind",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, l, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')
if (q.includes("https://cinesubz.co/movies")) {
		var response = await axios.get(q);
    var $ = cheerio.load(response.data);
        const safeExtract = (selector, defaultValue = 'Not found') => {
      const element = $(selector);
      return element.length ? element.text().trim() : defaultValue;
    };

    // Extract movie information
    const title = safeExtract('.sheader .data h1');
    const image = $('.sheader .poster img').attr('src');
    const date = safeExtract('.sheader .data .extra .date')
    const country = safeExtract('.sheader .data .extra .country')
    const duration = safeExtract('.sheader .data .extra .runtime')
    const genres = $('.sheader .data .sgeneros a').map((_, el) => $(el).text().trim()).get()

    // Extract rating
     const rating= safeExtract('.dt_rating_vgs')
     const ratecount= safeExtract('.rating-count')

    // Extract download links
    const results = [];
    $('table tbody tr').each((_, elem) => {
      results.push({
        quality: $(elem).find('td:first-child a').text().trim(),
        size: $(elem).find('td:nth-child(2)').text().trim(),
        language: $(elem).find('td:nth-child(3)').text().trim(),
        link: $(elem).find('td:first-child a').attr('href')
      });
    });

		
      
                

 if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].quality + ' | ' + results[i].size,
rowId: prefix + 'cinelink ' + results[i].link
});
}
const sections = [{
title: "_[Result from cinezubs.]_",
rows: srh
}]

    const listMessage = {
caption: `📃 𝗩𝗔𝗝𝗜𝗥𝗔-𝗠𝗗 𝗖𝗜𝗡𝗘𝗦𝗨𝗕𝗭 𝗠𝗗𝗟 🎬\n\n
📑 *Title:* ${title}\n
🧬 *Year:* ${date}\n
🫧 *Country:* ${country}\n
✨ *Rating:* ${rating}\n
🚀 *Genres :* ${genres}\n
⌚ *Duration:* ${duration}`,
image : { url: image },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from Cinezubs. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} if (q.includes("https://cinesubz.co/tvshows")) {


const response = await axios.get(q);  
const $ = cheerio.load(response.data);
  
const image = $("div.poster > img").attr("src")
const image2 = $("p > img.aligncenter.size-full.wp-image-93256").attr("src")
const title = $("div.data > h1").text()
const type = $("span > a").text()
const genre = $("div.data > div.sgeneros > a").text()
const date = $("div.extra > span.date").text()
const desc = $("div:nth-child(16)").text()
const rating = $("#repimdb > strong").text()
const fdate = $("#info > div:nth-child(6) > span").text()
const ldate = $("#info > div:nth-child(7) > span").text()


const results = [];
    $("div.se-a > ul.episodios > li").each((c, d) => {

        results.push({

   
      link: $(d).find("a").attr("href"),
       id: $(d).find("div.numerando").text(),
       title: $(d).find("div.episodiotitle > a").text()
          

      })    
        })

		

      
                      const msg = `📃 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗖𝗜𝗡𝗘𝗦𝗨𝗕𝗭 𝗠𝗗𝗟 🎬\n\n
📑 *Title:* ${title}\n
🧬 *Year:* ${date}\n
🫧 *Type:* ${type}\n
✨ *Rating:* ${rating}\n
🚀 *Genres :* ${genre}\n
⌚ *First Date:* ${fdate}
⌚ *Last date:* ${ldate}`
		
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title + ' | ' + results[i].id,
rowId: prefix + 'cinelink1 ' + results[i].link
});
}
const sections = [{
title: "_[Result from cinezubs.]_",
rows: srh
}]

    const listMessage = {
caption: msg,
image : { url: image },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from Cinezubs. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
}		
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})               


                



cmd({
    pattern: "cinelink1",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, l, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')

		
const response = await axios.get(q);  
const $ = cheerio.load(response.data);
  

const stitle = $("h1.epih1").text()
const title = $("#info > div > h3").text()
const date = $("#info > span").text()
		
    const results = [];
    $('table tbody tr').each((_, elem) => {
      results.push({
        quality: $(elem).find('td:first-child a').text().trim(),
        size: $(elem).find('td:nth-child(2)').text().trim(),
        language: $(elem).find('td:nth-child(3)').text().trim(),
        link: $(elem).find('td:first-child a').attr('href')
      });
    });

		

      
                      const msg = `📃 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗖𝗜𝗡𝗘𝗦𝗨𝗕𝗭 𝗠𝗗𝗟 🎬\n\n
📑 *Title:* ${stitle}\n
🧬 *STitle:* ${title}\n
🗓️ *Date:* ${date}
${q}`
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].size + ' | ' + results[i].quality,
rowId: prefix + `cinelink ${results[i].link}`
});
}
const sections = [{
title: "_[Result from cinezubs.]_",
rows: srh
}]

    const listMessage = {
text: msg, 
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from Cinezubs. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
                



cmd({
    pattern: "cinefinds",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')

		var response = await axios.get(q);
    var $ = cheerio.load(response.data);
        const safeExtract = (selector, defaultValue = 'Not found') => {
      const element = $(selector);
      return element.length ? element.text().trim() : defaultValue;
    };

    // Extract movie information
    const title = safeExtract('.sheader .data h1');
    const image = $('.sheader .poster img').attr('src');
    const date = safeExtract('.sheader .data .extra .date')
    const country = safeExtract('.sheader .data .extra .country')
    const duration = safeExtract('.sheader .data .extra .runtime')
    const genres = $('.sheader .data .sgeneros a').map((_, el) => $(el).text().trim()).get()
      const rating= safeExtract('.dt_rating_vgs')
     const ratecount= safeExtract('.rating-count')

                      const msg = `◉ 📌 *Title:* ${title}\n\n
🧬 *Year:* ${date}\n
🫧 *Country:* ${country}\n
✨ *Rating:* ${rating}\n
🚀 *Genres :* ${genres}\n
⌚ *Duration:* ${duration}
> 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗖𝗜𝗡𝗘𝗦𝗨𝗕𝗭 𝗠𝗗𝗟`

                
return await conn.sendMessage(config.JID, { image: { url:image } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*error!!*')
            console.log(e)
            }
    })       



cmd({
    pattern: "cinefindtvs",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')
var response = await axios.get(q);
    var $ = cheerio.load(response.data);
		const image = $("div.poster > img").attr("src")
const image2 = $("p > img.aligncenter.size-full.wp-image-93256").attr("src")
const title = $("div.data > h1").text()
const type = $("span > a").text()
const genre = $("div.data > div.sgeneros > a").text()
const date = $("div.extra > span.date").text()
const desc = $("div:nth-child(16)").text()
const rating = $("#repimdb > strong").text()
const fdate = $("#info > div:nth-child(6) > span").text()
const ldate = $("#info > div:nth-child(7) > span").text()

                      const msg = `◉ 📑 *Title:* ${title}\n
🧬 *Year:* ${date}
🫧 *Type:* ${type}
✨ *Rating:* ${rating}
🚀 *Genres :* ${genre}
⌚ *First Date:* ${fdate}
⌚ *Last date:* ${ldate}
📃 *Desc:* ${desc}
> 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗖𝗜𝗡𝗘𝗦𝗨𝗕𝗭 𝗠𝗗𝗟`

                
return await conn.sendMessage(config.JID, { image: { url:image } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*error!!*')
            console.log(e)
            }
    })       

 


	
cmd({
    pattern: "cinelink",
    react: '🎬',
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, l, prefix, isDev, reply }) => {

    if (!q) return await reply('*Please provide a valid movie URL!*');

    try {


//  const mediaUrl1 = q.split("|")[0]
      //  const title1 = q.split("|")[1]  || 'tc_movie_dl_system' 
const response = await axios.get(q);
        const $ = cheerio.load(response.data);

        
        const initialLink = $('#link').attr('href');
        if (!initialLink) return await reply('No valid download link found.');

      
                let downloadLink = null;

        if (initialLink.includes("server11/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server11/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else if (initialLink.includes("server12/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server12/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else if (initialLink.includes("server13/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server13/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else if (initialLink.includes("server21/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server21/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else if (initialLink.includes("server22/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server22/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else if (initialLink.includes("server23/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server23/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else if (initialLink.includes("server3/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server3/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else {
            downloadLink = initialLink.replace("https://google.com/server4/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        }
        

const links = await fetchJson(`https://vajira-movie-api.vercel.app/api/cinesubz/download?url=${downloadLink}&apikey=vajiratech`)

   const downloads = links.data.data;

    if (!downloads || downloads.length === 0) {
      return reply("No download links found.");
    }

    // Format and send download links
    let message = `*🎥 Cinesubz Download Links 🎥*\n\n`;
    downloads.forEach((item, index) => {
      message += `*${index + 1}. ${item.fileName}*\n`;
      message += `📦 Size: ${item.fileSize}\n`;
      message += `🔗 Type: ${item.type}\n===============================\n`;
    });

    
            
if (links.data.data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < links.data.data.length; i++) {
srh.push({
title: i + 1,
description: links.data.data[i].fileName,
rowId: prefix + `mp41 ${links.data.data[i].href}|${links.data.data[i].fileName}`
});
}
const sections = [{
title: "_[Result from cinezubs.]_",
rows: srh
}]

    const listMessage = {
text: message,    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from Cinezubs. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})               





//===============ZOOM================
cmd({
    pattern: "zoom",	
    react: '📑',
    category: "movie",
    desc: "zoom moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
const url = `https://zoom.lk/?s=${q}`;
const response = await axios.get(url);	
const $ = cheerio.load(response.data);

let results = [];
    $("div.td-pb-span8.td-main-content > div > div.td_module_16.td_module_wrap.td-animation-stack").each((c, d) => {
        results.push({
             time: $(d).find("div.item-details > div > span > time").text(),
             title: $(d).find("div.item-details > h3 > a").text(),
             author: $(d).find("div.item-details > div > span > a").text(),
             desc: $(d).find("div.item-details > div.td-excerpt").text(),
             comments: $(d).find("div.item-details > div > span.td-module-comments a").text(),
             image: $(d).find("div.td-module-thumb > img").attr("src"),
	     link: $(d).find("div.item-details > h3 > a").attr("href"),	
           
        })
    })
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title + '+' + results[i].time,
rowId: prefix + 'zoomdl ' + results[i].link
});
}
const sections = [{
title: "_[Result from zoom.]_",
rows: srh
}]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: config.LOGO },		    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from zoom. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "zoomdl",	
    react: '📑',
    category: "",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')


const response = await axios.get(q);	
const $ = cheerio.load(response.data);
      const title = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.td_block_wrap.tdb_title.tdi_60.tdb-single-title.td-pb-border-top.td_block_template_17 > div > h1").text();
      const author = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_64.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > ul > li > a").text();
      const view = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_67.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > span").text();
      const date = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_70.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > time").text();
      const size = $("#tdi_81 > div > div.vc_column.tdi_84.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.td_block_wrap.tdb_single_content.tdi_86.td-pb-border-top.td_block_template_17.td-post-content.tagdiv-type > div > p > a > small").text();
      const dllink = $("div.tdb-block-inner.td-fix-index > p > a").attr("href");

const cap = `📃 *Title:* ${title}\n
🔗 *Link:* ${dllink}\n
📅 *Year:* ${date}\n
💫 *Size:* ${size}\n
⏳ *Views:* ${view}\n`
		    
  const sections = [
{
	title: "*🎬 SUB-SEARCH-SITE 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `zip ${dllink}|${title}` , description: `Download in ${size}`},	
	]
    }	  
]
const listMessage = {
text: cap,
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By zoom',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


//================SUBZ===============

cmd({
    pattern: "subz",	
    react: '📑',
    category: "movie",
    desc: "subz moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	var link = `https://subz.lk/?s=${q}`
var response = await axios.get(link);
var $ = cheerio.load(response.data);
const results = [];

$('div.col-lg-3.col-md-6.col-sm-12').each((i,element) => {
results.push({
title: $(element).find('a.font-bold.text-wrap.text-break.text-justify').text(),
link: $(element).find('a').attr("href"),
image: $(element).find('img').attr("src"),
emovies: $(element).find('a.text-white').attr("href"),
})
    })
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title  + '+' + results[i].emovies,
rowId: prefix + 'subzdl ' + results[i].link
});
}
const sections = [{
title: "_[Result from subz.]_",
rows: srh
}]

    const listMessage = {
caption: `⏳ Search A SubsTitle Name: ${q}
📲 Search top 10 SubsTitles\n`,
image : { url: config.LOGO },	    	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By subz',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
	


cmd({
    pattern: "subzdl",	
    react: '📑',
    category: "",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

var response = await axios.get(q);
var $ = cheerio.load(response.data);

const title = $("h1.text-center.text-danger.h4").text();
const image = $("img.rounded.mx-auto.d-block.shadow-2-strong.mb-0.wp-post-image").attr("src");
const date = $("time").text().trim();
const dllink = $("a.btn.btn-outline-success.fw-bold").attr("href");
const size = $("li.list-group-item").text().trim();

const cap = `📃 *Title:* ${title}\n
📅 *Year:* ${date}\n
💫 *Size:* ${size}\n`
		    
  const sections = [
{
	title: "*🎬 SUB-SEARCH-SITE 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `zip ${dllink}|${title}` , description: `Download Substitles`},	
	]
    }	  
]
const listMessage = {
caption: ``,
image : { url: image },	
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By subz',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


//================SINHALSUBTITLE===============

cmd({
    pattern: "s-subtitle",	
    react: '📑',
    category: "movie",
    desc: "s-subtitle moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://sinhala-subtitles.com/?s=${q}`;
const response = await axios.get(url);
        var $ = cheerio.load(response.data);
        const results = [];
        
        $('article.l-post.grid-base-post.grid-post').each((i,element) => {
        results.push({
        
        link: $(element).find('a').attr("href"),
        image: $(element).find('span').attr("data-bgsrc"),
        title: $(element).find('a').attr("title"),
        date: $(element).find('time.post-date').text(),
        desc: $(element).find('p').text()
        
        })
            })
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title + '||' + results[i].date,
rowId: prefix + 'ssdl ' + results[i].link
});
}
const sections = [{
title: "_[Result from sinhala-subtitles.]_",
rows: srh
}]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: config.LOGO },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from sinhala-subtitles. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})




cmd({
    pattern: "ssdl",	
    react: '📑',
    category: "",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{
        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

const response = await axios.get(q);	
const $ = cheerio.load(response.data);
const title = $('h1.is-title.post-title').text();
const date = $('span.meta-item.date > time.post-date').text();
const image = $('a.image-link.media-ratio.ar-bunyad-main').attr("href");
const desc = $('p').text();
const dllink = $('figure > a').attr("href");

const cap = `*👾 Available All Subs...*

ඔබට අවශ්‍ය movie site එක තෝරන්න`
		    
  const sections = [
{
	title: "*🎬 MOVIE-SEARCH-SITE 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `zip ${dllink}|${title}` , description: 'Download in sinhala-subtitles'},	
	]
    }	  
]
const listMessage = {
caption: `📃 *Title:* ${title}\n
🔗 *Link:* ${dllink}\n
📅 *Year:* ${date}\n
⏳ *Views:* ${desc}\n`,
image : { url: image },	
footer: 'MOVIE DOWNLOADER BY VAJIR MD',
title: 'Search By sinhala-subtitles',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
	








//------------------------dl---------------






cmd({
    pattern: `mp4`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {


	    
        //const mediaUrl = q.trim();
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tc_movie_dl_system'
	    
     const response = await axios.get(mediaUrl);  
const $ = cheerio.load(response.data);
    const link = $("#link").attr("href")
const drain = link.replace(/u/g, 'api/file')   
console.log(drain)

var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}



        const message = {
            document: await getBuffer(drain),
	    caption: `${title}\n*🎬 VAJIRA MD TEAM MOVIEDL 🎬*`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };


	    
        await conn.sendMessage(from, message );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});



cmd({
    pattern: `mp41`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {


	    
        //const mediaUrl = q.trim();
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tc_movie_dl_system'
	    
    


var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}



        const message = {
            document: await getBuffer(mediaUrl),
	    caption: `${title}\n*🎬 VAJIRA MD TEAM MOVIEDL 🎬*`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };


	    
        await conn.sendMessage(from, message );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});




cmd({
    pattern: "zip",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {


        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'vajira_md_sub_dl_system'

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');

var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}


        const message = {
            document: await getBuffer(mediaUrl),
	    caption: "*🎬 VAJIRA MD SUB-DL 🎬*",
            mimetype: "VAJIRA MD SUB DL",
            fileName: `${title}.zip`,
        };

        await conn.sendMessage(from, message, { quoted: mek });
const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');



cmd({
    pattern: "movie",
    category: "movie",
    react: "🎬",
    desc: "cinesubz & ytsmx & sinhalasub & Firemoviehub movie downloader",
    use: ".movie movie name",
    filename: __filename   
},
    async (conn, mek, m, { reply, isDev, from, l, q, prefix }) => {
        try {
  
        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

        
const sections = [
{
	title: "*🎬 SELECT MOVIE SITES 🎬*",
	rows: [
	    {title: "    1", rowId: prefix + `cinesubz ` + q , description: 'Download in Cinesubz'},
            {title: "    2", rowId: prefix + `sinhalasub ` + q , description: 'Download in Sinhalsub'},
	    {title: "    3", rowId: prefix + `ytsmx ` + q , description: 'Download in Ytsmx'},
	    {title: "    4", rowId: prefix + `firemovie ` + q , description: 'Download in Firemoviehub'},
      ]
    }, 	  
{
	title: "*🎬 SELECT SUBSTITLE SITES 🎬*",
	rows: [
	    {title: "    5", rowId: prefix + `zoom ` + q , description: 'Download in Zoom'},
            {title: "    6", rowId: prefix + `subz ` + q , description: 'Download in Subz'},
	    {title: "    7", rowId: prefix + `s-subtitle ` + q , description: 'Download in S-subtitle'},
	  
      ]
    }
]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

Availble movies sites....

- Cinesubz ➱ https://cinesubz.co/
- Sinhalasubs ➱ https://sinhalasub.lk/
- Ytsmx ➱ https://yts.mx/
- Firemovie ➱ https://firemovieshub.com/

Available Subtitle sites....

- Sinhalasubstitle ➱ https://sinhala-subtitles.com/
- Zoom ➱ https://zoom.lk/
- Subz ➱ https://subz.lk/`,
image : { url: config.LOGO },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from Cinezubs & Ytsmx & Firemoviehub and sinhalasub. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



//===============GINISISILA================


cmd({
    pattern: "ginisisila",	
    react: '📑',
    category: "movie",
    desc: "ginisisila cartoon downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://ginisisilacartoon.net/search.php?q=${q}`
     const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let results = [];
    $("#page_panels_ > table > tbody > tr > td > div").each((c, d) => {
        results.push({
             title: $(d).find("div.video-title").text(),
             date: $(d).find("div.posted-time").text(),
             image: $(d).find("a > img").attr("src"),
             link: $(d).find("a").attr("href"),

        })
    })

if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title  + '+' + results[i].date,
rowId: prefix + 'ginidl ' + results[i].link
});
}
const sections = [{
title: "_[Result from ginisisila.]_",
rows: srh
}]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: `https://i.ibb.co/0s0WcmF/1og6o9e2.png` },	    
footer: 'MOVIE DOWNLOADER BY TC',
title: 'Search By firemovieshub',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
	

cmd({
    pattern: "ginidl",	
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')


const genurl = `https://ginisisilacartoon.net/${q}`
		    const response = await axios.get(genurl);
                    const $ = cheerio.load(response.data);
		    const download = $("#player-holder > div > iframe").attr("src");
		    const mtitle = $("#watch-contentHd").text();

const cap = `📃 *Title:* ${mtitle}`
		    
  const sections = [
{
	title: "*🎬 MOVIE-SEARCH-SITE 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `gdrive ${download}` , description: `Download in ${mtitle}`},	
	]
    }	  
]
const listMessage = {
text: cap,
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By ginisisila',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

//==============YTSMX=================





cmd({
    pattern: "ytsmx",	
    react: '📑',
    category: "movie",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://yts.mx/browse-movies/${q}/all/all/0/latest/0/all`
const response = await axios.get(url);	
const $ = cheerio.load(response.data);

let results = [];
    $("section > div.row > div").each((c, d) => {
        results.push({
             title: $(d).find("div.browse-movie-bottom > a").text(),
             year: $(d).find("div.browse-movie-bottom > div").text(),
             link: $(d).find("a").attr("href"),
             image: $(d).find("a > figure > img").attr("src"),
             rating: $(d).find("a > figure > figcaption > h4.rating").text(),
             danne: $(d).find("a > figure > figcaption > h4").eq(1).text(),
             danne1: $(d).find("a > figure > figcaption > h4").eq(2).text(),
           

        })
    })

	    console.log(results)
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title + '+' + results[i].year,
rowId: prefix + 'ytmx ' + results[i].link
});
}
const sections = [{
title: "_[Result from ytsmx.]_",
rows: srh
}]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: `https://i.ibb.co/rF1dj3m/fq5tvyo.jpg` },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from ytsmx. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "ytmx",	
    react: '📑',
    category: "",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
const response = await axios.get(q);	
const $ = cheerio.load(response.data);

	const title = $("#mobile-movie-info > h1").text();
        const year = $("#mobile-movie-info > h2:nth-child(2)").eq(0).text();
        const language = $("#mobile-movie-info > h2 > span").text();
        const image = $("#movie-poster > img").attr("src");
        const enter = $("#mobile-movie-info > h2").eq(1).text();
        let results = [];
      $("div.modal.modal-download.hidden-xs.hidden-sm > div > div > div").each((c, d) => {
          results.push({ 
               quality: $(d).find("div > span").text(),
               type: $(d).find("p.quality-size").eq(0).text(),
               size: $(d).find("p.quality-size").eq(1).text(),
               torrent_file: $(d).find("a").attr("href"),
               magnet: $(d).find("a.magnet-download.download-torrent.magnet").attr("href"),
          })
      })
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].quality  + '+' + results[i].size,
rowId: prefix + 'ytmxdl ' + results[i].magnet
});
}
const sections = [{
title: "_[Result from ytsmx.]_",
rows: srh
}]

    const listMessage = {
caption: `📑 *Title:* ${title}\n
🧬 *Year:* ${year}\n
🫧 *Language:* ${language}`,
image : { url: image },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By ytsmx',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "ytmxdl",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isDev, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
	

							 
    

var Seedr = require("seedr");
var seedr = new Seedr();
await seedr.login("moviebot2003@gmail.com","Vajira2003@");

const ad_mg = await conn.sendMessage(from, { text : 'ᴜᴘʟᴏᴀᴅɪɴɢ magnet file...📥' }, {quoted: mek} )
const magnet = await seedr.addMagnet(q);

	var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ᴜᴘʟᴏᴀᴅᴇᴅ ᴍᴀɢɴᴇᴛ ꜰɪʟᴇ ✅..."
]
let { key } = await conn.sendMessage(from, {text: 'ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ᴜᴘʟᴏᴀᴅᴇᴅ ᴍᴀɢɴᴇᴛ ꜰɪʟᴇ ✅...' , edit : ad_mg.key }, {quoted: mek})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}


    if (magnet.code === 400 || magnet.result !== true) {
        console.log("Error adding magnet " + JSON.stringify(magnet, null, 2))
        return null;
    }
    var contents = []
	do {
		contents = await seedr.getVideos();
	} while (contents.length === 0);


		var file = await seedr.getFile(contents[0][0].id);
		var folder_id=  contents[0][0].fid 

	const link = file.url
await conn.sendMessage(from,{document:await getBuffer(link),mimetype:"video/mp4",fileName:`${file.name} | ${uploader}.mp4`,caption:`${file.name}\n\n> ᴠᴀᴊɪʀᴀ-ᴍᴅ ʙʏ ᴛᴄ ᴛᴇᴀᴍ`}
)
	await seedr.deleteFolder(folder_id)
await conn.sendMessage(from, { text : `Movie send ${config.JID} Successfull ✔` }, {quoted: mek} )
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})

//================FIREMOVIEHUB===============




cmd({
    pattern: "firemovie",	
    react: '📑',
    category: "movie",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://firemovieshub.com/?s=${q}`;

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: true }); // headless: true means the browser will run in the background
    const page = await browser.newPage();

    // Set a user-agent and go to the page
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait for the results to load (adjust the selector to the page's content)
    await page.waitForSelector('div.title a'); // This waits for the movie titles to appear

    // Get the page content after it has loaded
    const pageContent = await page.content();

    // Use Cheerio to parse the page content
    const $ = cheerio.load(pageContent);

    // Extract movie titles and links from the page
    const data = [];
    $("div.result-item").each((c, d) => {

        data.push({
             
         title: $(d).find("div.title > a").text(),
         ntitle: $(d).find("span.movies").text(),
         year: $(d).find("span.year").text(),
         link: $(d).find("a").attr("href"),
         image: $(d).find("img").attr("src")
         
         
        })
    })

await browser.close();

	
if (data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1,
description: data[i].title,
rowId: prefix + 'firemvs ' + data[i].link
});
}
const sections = [{
title: "_[Result from firemovie.]_",
rows: srh
    }	  				 
 ]

    const listMessage = {
caption: `🎬 VAJIRA-MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: config.LOGO },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from firemovie. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "firemvs",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

const url = `${q}`

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: true }); // headless: true means the browser will run in the background
    const page = await browser.newPage();

    // Set a user-agent and go to the page
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait for the results to load (adjust the selector to the page's content)
    await page.waitForSelector('div.data > h1'); // This waits for the movie titles to appear

    // Get the page content after it has loaded
    const pageContent = await page.content();

    // Use Cheerio to parse the page content
    const $ = cheerio.load(pageContent);

    // Extract movie titles and links from the page
   
  
const title = $("div.data > h1").text()
const image = $("div.poster > img").attr("src")
const theme = $("span.tagline").text()
const date = $("span.date").text()
const duration = $("span.runtime").text()
const generos = $("div.sgeneros > a:nth-child(1)").text()
const generos1 = $("div.sgeneros > a:nth-child(2)").text()
const generos2 = $("div.sgeneros > a:nth-child(3)").text()
const desc = $("div.wp-content > p").text()
const imdb = $("span.valor > strong").text()
    // Output the results
   
    
   

      const $1 = cheerio.load(pageContent)
      const data = [];
      $1("tbody > tr").each((c, d) => {
          data.push({            
           link: $1(d).find("a").attr("href"),
           quality: $1(d).find("strong.quality").text(),
           size: $1(d).find("td:nth-child(3)").text()      
          })      
      })
 
    // Close the browser after scraping
    await browser.close();
	
	
var msg = `*_☘Title ➩ ${title}_*\n\n`
	 msg += `📽️ ━━━━━━━━━━━━━━━━━━━📽️\n\n`	
         msg += `	  📆  *Date* ➩ ${date}\n\n`
         msg += `	  🏷️  *Rate* ➩ ${imdb}\n\n`
	 msg += `	  🌍  *Theme* ➩ ${theme}\n\n`	
         msg += `	  🕘  *Duration* ➩ ${duration}\n\n`
         msg += `	  🕘  *Generos* ➩ ${generos} ${generos1} ${generos2}\n\n`
	 msg += `*📍Link* ➩ ${q}\n\n`	
	 msg += `📽️ ━━━━━━━━━━━━━━━━━━━📽️\n\n\n`	
         msg += `> ★❮• 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗙𝗜𝗥𝗘𝗠𝗢𝗩𝗜𝗘𝗛𝗨𝗕 𝗠𝗢𝗩𝗜𝗘 𝗗𝗟 •❯★` 
		    
if (data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )

var srh = [];

	
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1.1,
description: data[i].quality + ' | ' + data[i].size,
rowId: prefix + `firedl ${data[i].link}`
});
}

const sections = [
{
title: "",
rows: srh
},	
{
	title: "*🎬 MOVIE INFO 🎬*",
	rows: [
	    {title: "    1", rowId: prefix + `firemovies ${q}` , description: 'Send Movie Details'},

       ]
    }	  		  
]
const listMessage = {
caption: msg,
image : { url: image },	
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By firemovie',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: `firedl`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }
    try {

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: true }); // headless: true means the browser will run in the background
    const page = await browser.newPage();

    // Set a user-agent and go to the page
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(q, { waitUntil: 'domcontentloaded' });

    // Wait for the results to load (adjust the selector to the page's content)
    await page.waitForSelector('small.text a'); // This waits for the movie titles to appear

    // Get the page content after it has loaded
    const pageContent = await page.content();

    // Use Cheerio to parse the page content
    const $ = cheerio.load(pageContent);

    // Extract movie titles and links from the page
   
  
  
   
    const title = $('small.text a').text();      
     const dllink = $("a#link.btn").attr("href")
 
    // Close the browser after scraping
    await browser.close();

	    
     /*   //const mediaUrl = q.trim();
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tc_movie_dl_system'
	    */

var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}



        const message = {
          //  document: await getBuffer(mediaUrl),
	    document: await getFile(dllink),
	    caption: `${title}\n*🎬 VAJIRA MD TEAM MOVIEDL 🎬*`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };


	    
        await conn.sendMessage(from, message );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});



//===============SINHALASUBS================




cmd({
    pattern: "sinhalasub",	
    react: '📑',
    category: "movie",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://sinhalasub.lk?s=${q}`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
   
    const data = [];
    $("div.result-item").each((c, d) => {

        data.push({
             
       link: $(d).find("div.title > a").attr("href"),
         title: $(d).find("div.title > a").text(),       
        })
    })


 const response1 = await axios.get(url);  
const $1 = cheerio.load(response1.data);
const next1 = $1("div.pagination > a.arrow_pag").attr("href")
      const nextall = $1("div.resppages > a:nth-child(2)").attr("href")
	
if (data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1,
description: data[i].title,
rowId: prefix + 'subin ' + data[i].link
});
}
const sections = [{
title: "_[Result from sinhalasub.]_",
rows: srh
},
{
	title: "*🎬 Next Page 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `sinhalasub1 ${next1}` , description: 'Next Page'},

       ]
    }	  				 
 ]

    const listMessage = {
caption: `🎬 VAJIRA-MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: `https://github.com/kushansewmina1234/DARKSHAN-DATA/blob/main/media/image/IMG-20240907-WA0009.jpg?raw=true` },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from sinhalasub. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "sinhalasub1",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	
const response = await axios.get(q);  
const $ = cheerio.load(response.data);
   
    const data = [];
    $("div.result-item").each((c, d) => {

        data.push({
             
       link: $(d).find("div.title > a").attr("href"),
         title: $(d).find("div.title > a").text(),       
        })
    })


 const response1 = await axios.get(q);  
const $1 = cheerio.load(response1.data);
const next1 = $1("div.pagination > a.arrow_pag").attr("href")
      const nextall = $1("div.resppages > a:nth-child(2)").attr("href")
if (data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1,
description: data[i].title,
rowId: prefix + 'subin ' + data[i].link
});
}
const sections = [{
title: "_[Result from sinhalasub.]_",
rows: srh
},
{
	title: "*🎬 Next Page 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `sinhalasub1 ${nextall}` , description: 'Next Page'},

       ]
    }	  				 
 ]

    const listMessage = {
caption: `🎬 VAJIRA-MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: `https://github.com/kushansewmina1234/DARKSHAN-DATA/blob/main/media/image/IMG-20240907-WA0009.jpg?raw=true` },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from sinhalasub. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


	

cmd({
    pattern: "subin",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
if (q.includes("https://sinhalasub.lk/movies")) {
const response = await axios.get(q);
		    const $x = cheerio.load(response.data);
		    const newsArticle = $x(".sheader").first();
                    const newsHeadline = newsArticle.find(".data .head h1").text();
                    const newsDate = newsArticle.find(".extra .tagline").text().trim();
                    const newsTime = newsArticle.find(".poster img").attr("src");
                    const date = newsArticle.find(".extra .date").text().trim();
                    const duration = newsArticle.find(".extra .runtime").text().trim();
                    const infoMovie = $x("#info").first();
                    const desc = infoMovie.find(".wp-content p").text().trim();
                    const rat = infoMovie.find("#repimdb strong").text().trim();
                    const img = infoMovie.find("#dt_galery .owl-item a").attr("src");
                    const country = $x("#single > div.content.right > div.sheader > div.data > div.extra > span.country").text().trim();
const response1 = await axios.get(q);  
const $ = cheerio.load(response1.data);
   
    const data = [];
    $("div#download.sbox > div > div > table > tbody > tr").each((c, d) => {
        data.push({             
         link: $(d).find("td > a").attr("href"),
         quality: $(d).find("td > strong").text(),
         size: $(d).find("td:nth-child(3)").text()       
        })
    })
const response2 = await axios.get(q);  
const $1 = cheerio.load(response2.data);   
    const data1 = [];
    $1("div#download-02.sbox > div > div > table > tbody > tr").each((c, d) => {
        data1.push({           
         link: $1(d).find("td > a").attr("href"),
         quality: $1(d).find("td > strong").text(),
         size: $1(d).find("td:nth-child(3)").text()         
        })
    })
const response3 = await axios.get(q);  
const $2 = cheerio.load(response3.data);
    const data2 = [];
    $2("div#download-03.sbox > div > div > table > tbody > tr").each((c, d) => {
        data2.push({           
         link: $2(d).find("td > a").attr("href"),
         quality: $2(d).find("td > strong").text(),
         size: $2(d).find("td:nth-child(3)").text()        
        })
    })

const response4 = await axios.get(q);  
const $3 = cheerio.load(response4.data);
const images = []
        $3("div.g-item").each((i, el) => {
	images.push({	
             url2: $3(el).find("a").attr("href").replace("\n" , ""),
             
	})    
 })
	
	
const cap = `*👾 Available All Movies...*

ඔබට අවශ්‍ය movie site එක තෝරන්න`
		    
if (data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
if (data1.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
if (data2.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];
var srh1 = [];	
var srh2 = [];
	
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1.1,
description: data[i].quality + ' | ' + data[i].size,
rowId: prefix + `mp4 ${data[i].link}|${newsHeadline}`
});
}
for (var i = 0; i < data1.length; i++) {
srh1.push({
title: i + 1.2,
description: data1[i].quality + ' | ' + data1[i].size,
rowId: prefix + `mega ${data1[i].link}|${newsHeadline}`
});
}	
for (var i = 0; i < data2.length; i++) {
srh2.push({
title: i + 1.3,
description: data2[i].quality + ' | ' + data2[i].size,
rowId: prefix + `mp41 ${data2[i].link}|${newsHeadline}`
});
}	
	
const sections = [
{
title: "_Pixeldrain Download_",
rows: srh
},
{
title: "_Mega Download_",
rows: srh1
},	
{
title: "_Ddl Download_",
rows: srh2
},	
{
	title: "*🎬 Send Movie Images 🎬*",
	rows: [
	    {title: "    1", rowId: prefix + `subinimg ${q}|${q}` , description: 'Send Movie Images'},

       ]
    },	
{
	title: "*🎬 MOVIE INFO 🎬*",
	rows: [
	    {title: "    2", rowId: prefix + `subins ${q}` , description: 'Send Movie Details'},

       ]
    }
]
const listMessage = {
caption: `📃 *Title: ${newsHeadline}*
🔗 *Link:* ${q}
📅 *Year:* ${date}
🔖 *Rating:* ${rat}
🪡 *Country:* ${country}
⏳ *Duration:* ${duration}`,
image : { url: images[0].url2 },	
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By sinhalsub',
buttonText: '*🔢 Reply below number*',
sections
}

	
return await conn.replyList(from, listMessage ,{ quoted : mek })
}





   if (q.includes("https://sinhalasub.lk/tvshows")) {
const responsez = await axios.get(q);  
const $z = cheerio.load(responsez.data);    
const images = $z("div.poster > img").attr("src")
const titles = $z("div.head > h1").text()
const dates = $z("div.extra > span.date").text()   
const rates = $z("div.starstruck-rating > span.dt_rating_vgs").text()
const generos = $z("div.sgeneros > a:nth-child(1)").text()
const generos1 = $z("div.sgeneros > a:nth-child(2)").text()	
const responsev = await axios.get(q);  
const $c = cheerio.load(responsev.data);
    const datas = [];
    $c("ul.episodios > li").each((c, d) => {
        datas.push({
         link: $c(d).find("div.episodiotitle > a").attr("href"),    
         title1: $c(d).find("div.numerando").text(),
         episode: $c(d).find("div.episodiotitle > a").text()
        })
    })
	
const cap = `*👾 Available All Movies...*

ඔබට අවශ්‍ය movie site එක තෝරන්න`
		    
if (datas.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srhss = [];
	
for (var i = 0; i < datas.length; i++) {
srhss.push({
title: i + 1.1,
description: datas[i].title1 + ' | ' + datas[i].episode,
rowId: prefix + `subintv1 ${datas[i].link}`
});
}
	
const sections = [
{
title: "_Select Episode_",
rows: srhss
    }	  		  
]
const listMessage = {
caption: `📃 *Title: ${titles}*
🔗 *Link:* ${q}
📅 *Year:* ${dates}
🔖 *Rating:* ${rates}
🪡 *Generos:* ${generos} ${generos1}`,
image : { url: images },	
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By sinhalsub',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
}



	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "subinimg",
    react: "✔️",
    dontAddCommandList : true ,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, mentionByTag, db_pool, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

const mediaUrl = q.split("|")[0]
        const link = q.split("|")[1]  || 'tc_movie_dl_system'

const response4 = await axios.get(link);  
const $3 = cheerio.load(response4.data);
const images = []
        $3("div.g-item").each((i, el) => {
	images.push({	
             url2: $3(el).find("a").attr("href").replace("\n" , ""),
             
	})    
 })


if (images.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srhss = [];
	
for (var i = 0; i < images.length; i++) {
srhss.push({
title: i + 1,
description: i + 1,
rowId: prefix + `dimg ${images[i].url2}`
});
}
	
const sections = [
{
title: "_Select Image",
rows: srhss
    }	  		  
]
const listMessage = {
text: `See More images`,
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By sinhalsub',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})






   
cmd({
    pattern: "subins",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')

		const response = await axios.get(q);
		    const $x = cheerio.load(response.data);


		    const newsArticle = $x(".sheader").first();
                    const newsHeadline = newsArticle.find(".data .head h1").text();
                    const newsDate = newsArticle.find(".extra .tagline").text().trim();
                    const newsTime = newsArticle.find(".poster img").attr("src");
                    const date = newsArticle.find(".extra .date").text().trim();
                    const duration = newsArticle.find(".extra .runtime").text().trim();
                    const infoMovie = $x("#info").first();
                    const desc = infoMovie.find(".wp-content p").text().trim();
                    const rat = infoMovie.find("#repimdb strong").text().trim();
                    const img = infoMovie.find("#dt_galery .owl-item a").attr("src");
                    const country = $x("#single > div.content.right > div.sheader > div.data > div.extra > span.country").text().trim();
		   //if (download_links.length < 1) return await conn.sendMessage(from, { text: `🚫 Download Link Not Found: *${q}*` }, { quoted: mek } )

      const response4 = await axios.get(q);  
const $3 = cheerio.load(response4.data);
const images = []
        $3("div.g-item").each((i, el) => {
	images.push({	
             url2: $3(el).find("a").attr("href").replace("\n" , ""),
             
	})    
 })
                     /* const msg = `◉ 📌 *Title:* ${newsHeadline}\n\n
🧬 *Year:* ${date}\n
🖊️ *Link:* ${q}\n
✨ *Rating:* ${rat}\n
⌚ *Duration:* ${duration}\n
📑 *Desc:* ${desc}\n\n
> 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗦𝗜𝗡𝗛𝗔𝗟𝗔𝗦𝗨𝗕 𝗠𝗗𝗟`*/

let  msg = `*_☘Title ➩ ${newsHeadline}_*\n\n`
	 msg += `📽️ ━━━━━━━━━━━━━━━━━━━📽️\n\n`	
         msg += `	  📆  *Date* ➩ ${date}\n\n`
         msg += `	  🏷️  *Rate* ➩ ${rat}\n\n`
	 msg += `	  🌍  *Country* ➩ ${country}\n\n`	
         msg += `	  🕘  *Duration* ➩ ${duration}\n\n`
	 msg += `*📍Link* ➩ ${q}\n\n`	
	 msg += `📽️ ━━━━━━━━━━━━━━━━━━━📽️\n\n\n`	
         msg += `> ★❮• 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗦𝗜𝗡𝗛𝗔𝗟𝗔𝗦𝗨𝗕 𝗠𝗢𝗩𝗜𝗘 𝗗𝗟 •❯★` 
		
return await conn.sendMessage(from, { image: { url:images[0].url2 } , caption: msg } , { quoted: mek })
//await conn.sendMessage(from , { text: msg  }, { quoted: mek } )	
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*error!!*')
            console.log(e)
            }
    })       



cmd({
    pattern: "subintv1",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

const response = await axios.get(q);  
const $x = cheerio.load(response.data);    
const image = $x("#clickfakeplayer > div > img").attr("src")
const title = $x("div#info.sbox > h1").text()
const episode = $x("div.wp-content > h3.epih3").text()   
const date = $x("#info > span").text()
	
const response1 = await axios.get(q);  
const $ = cheerio.load(response1.data);   
    const data = [];
    $("div#download.sbox > div > div > table > tbody > tr").each((c, d) => {
        data.push({             
         link: $(d).find("td > a").attr("href"),
         quality: $(d).find("td > strong").text(),
         size: $(d).find("td:nth-child(3)").text()       
        })
    })
const response2 = await axios.get(q);  
const $1 = cheerio.load(response2.data);   
    const data1 = [];
    $1("div#download-02.sbox > div > div > table > tbody > tr").each((c, d) => {
        data1.push({           
         link: $1(d).find("td > a").attr("href"),
         quality: $1(d).find("td > strong").text(),
         size: $1(d).find("td:nth-child(3)").text()         
        })
    })
const response3 = await axios.get(q);  
const $2 = cheerio.load(response3.data);
    const data2 = [];
    $2("div#download-03.sbox > div > div > table > tbody > tr").each((c, d) => {
        data2.push({           
         link: $2(d).find("td > a").attr("href"),
         quality: $2(d).find("td > strong").text(),
         size: $2(d).find("td:nth-child(3)").text()        
        })
    })
	
	
const cap = `*👾 Available All Movies...*

ඔබට අවශ්‍ය movie site එක තෝරන්න`
		    
if (data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
if (data1.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
if (data2.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];
var srh1 = [];	
var srh2 = [];
	
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1.1,
description: data[i].quality + ' | ' + data[i].size,
rowId: prefix + `mp4 ${data[i].link}|${title}`
});
}
for (var i = 0; i < data1.length; i++) {
srh1.push({
title: i + 1.2,
description: data1[i].quality + ' | ' + data1[i].size,
rowId: prefix + `mega ${data1[i].link}|${title}`
});
}	
for (var i = 0; i < data2.length; i++) {
srh2.push({
title: i + 1.3,
description: data2[i].quality + ' | ' + data2[i].size,
rowId: prefix + `mp41 ${data2[i].link}|${title}`
});
}	
	
const sections = [
{
title: "_Pixeldrain Download_",
rows: srh
},
{
title: "_Mega Download_",
rows: srh1
},	
{
title: "_Ddl Download_",
rows: srh2
},	
{
	title: "*🎬 MOVIE INFO 🎬*",
	rows: [
	    {title: "    1", rowId: prefix + `subinstv ${q}` , description: 'Send Movie Details'},

       ]
    }	  		  
]
const listMessage = {
caption: `📃 *Title: ${title}*
🔗 *Link:* ${q}
📅 *Year:* ${date}
🔖 *Episode:* ${episode}`,
image : { url: image },	
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By sinhalsub',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "subinstv",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')


const response = await axios.get(q);  
const $ = cheerio.load(response.data);    
const image = $("#clickfakeplayer > div > img").attr("src")
const title = $("div#info.sbox > h1").text()
const episode = $("div.wp-content > h3.epih3").text()   
const date = $("#info > span").text()
		
let  msg = `*_☘Title ➩ ${title}_*\n\n`
	 msg += `📽️ ━━━━━━━━━━━━━━━━━━━📽️\n\n`	
         msg += `	  📆  *Date* ➩ ${date}\n\n`
	 msg += `	  🌍  *Episode* ➩ ${episode}\n\n`	
	 msg += `*📍Link* ➩ ${q}\n\n`	
	 msg += `📽️ ━━━━━━━━━━━━━━━━━━━📽️\n\n\n`	
         msg += `> ★❮• 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗦𝗜𝗡𝗛𝗔𝗟𝗔𝗦𝗨𝗕 𝗠𝗢𝗩𝗜𝗘 𝗗𝗟 •❯★` 
		
return await conn.sendMessage(from, { image: { url:image } , caption: msg } , { quoted: mek })
//await conn.sendMessage(from , { text: msg  }, { quoted: mek } )	
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*error!!*')
            console.log(e)
            }
    })       






//==============CINESUBZ=================




cmd({
    pattern: "cinesubz",
    category: "movie",
    react: "🎬",
    desc: "Download cinesubz movie",
    use: ".movie movie name",
    filename: __filename   
},
    async (conn, mek, m, { reply, isDev, from, l, q, prefix }) => {
        try {
  
        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

        const fsdata = `https://cinesubz.co/?s=${q}`
        const response = await axios.get(fsdata);
        const $ = cheerio.load(response.data);
        
        let results = [];   
        $("div.content.rigth.csearch > div > div.result-item > article").each((c, d) => {
          results.push({
              title: $(d).find("div.details > div.title > a").text().trim(),
              image: $(d).find("div.image > div > a > img").attr("src"),
              link: $(d).find("div.image > div > a").attr("href"),
              category: $(d).find("div.image > div > a span.movies").text().trim(),
              year: $(d).find("div.details > div.meta > span.year").text().trim(),
          })  
        })

	

		
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )		
	

var srh = [];  		
	
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,	
description: results[i].title,
rowId: prefix + 'cinefind ' + results[i].link
});

	
}		
const sections = [
	{
title: "*🎬 ＤＯＷＮＬＯＡＤ ＳＵＢ ＦＲＯＭ ＣＩＮＥＳＵＢＺ 🎬*\n",
rows: srh
}
]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: results[1].image },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from Cinezubs & Ytsmx. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})







  cmd({
    pattern: "cinefind",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, l, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')
if (q.includes("https://cinesubz.co/movies")) {
		var response = await axios.get(q);
    var $ = cheerio.load(response.data);
        const safeExtract = (selector, defaultValue = 'Not found') => {
      const element = $(selector);
      return element.length ? element.text().trim() : defaultValue;
    };

    // Extract movie information
    const title = safeExtract('.sheader .data h1');
    const image = $('.sheader .poster img').attr('src');
    const date = safeExtract('.sheader .data .extra .date')
    const country = safeExtract('.sheader .data .extra .country')
    const duration = safeExtract('.sheader .data .extra .runtime')
    const genres = $('.sheader .data .sgeneros a').map((_, el) => $(el).text().trim()).get()

    // Extract rating
     const rating= safeExtract('.dt_rating_vgs')
     const ratecount= safeExtract('.rating-count')

    // Extract download links
    const results = [];
    $('table tbody tr').each((_, elem) => {
      results.push({
        quality: $(elem).find('td:first-child a').text().trim(),
        size: $(elem).find('td:nth-child(2)').text().trim(),
        language: $(elem).find('td:nth-child(3)').text().trim(),
        link: $(elem).find('td:first-child a').attr('href')
      });
    });

		
      
                

 if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].quality + ' | ' + results[i].size,
rowId: prefix + 'cinelink ' + results[i].link
});
}
const sections = [{
title: "_[Result from cinezubs.]_",
rows: srh
}]

    const listMessage = {
caption: `📃 𝗩𝗔𝗝𝗜𝗥𝗔-𝗠𝗗 𝗖𝗜𝗡𝗘𝗦𝗨𝗕𝗭 𝗠𝗗𝗟 🎬\n\n
📑 *Title:* ${title}\n
🧬 *Year:* ${date}\n
🫧 *Country:* ${country}\n
✨ *Rating:* ${rating}\n
🚀 *Genres :* ${genres}\n
⌚ *Duration:* ${duration}`,
image : { url: image },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from Cinezubs. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} if (q.includes("https://cinesubz.co/tvshows")) {


const response = await axios.get(q);  
const $ = cheerio.load(response.data);
  
const image = $("div.poster > img").attr("src")
const image2 = $("p > img.aligncenter.size-full.wp-image-93256").attr("src")
const title = $("div.data > h1").text()
const type = $("span > a").text()
const genre = $("div.data > div.sgeneros > a").text()
const date = $("div.extra > span.date").text()
const desc = $("div:nth-child(16)").text()
const rating = $("#repimdb > strong").text()
const fdate = $("#info > div:nth-child(6) > span").text()
const ldate = $("#info > div:nth-child(7) > span").text()


const results = [];
    $("div.se-a > ul.episodios > li").each((c, d) => {

        results.push({

   
      link: $(d).find("a").attr("href"),
       id: $(d).find("div.numerando").text(),
       title: $(d).find("div.episodiotitle > a").text()
          

      })    
        })

		

      
                      const msg = `📃 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗖𝗜𝗡𝗘𝗦𝗨𝗕𝗭 𝗠𝗗𝗟 🎬\n\n
📑 *Title:* ${title}\n
🧬 *Year:* ${date}\n
🫧 *Type:* ${type}\n
✨ *Rating:* ${rating}\n
🚀 *Genres :* ${genre}\n
⌚ *First Date:* ${fdate}
⌚ *Last date:* ${ldate}`
		
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title + ' | ' + results[i].id,
rowId: prefix + 'cinelink1 ' + results[i].link
});
}
const sections = [{
title: "_[Result from cinezubs.]_",
rows: srh
}]

    const listMessage = {
caption: msg,
image : { url: image },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from Cinezubs. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
}		
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})               


                



cmd({
    pattern: "cinelink1",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, l, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')

		
const response = await axios.get(q);  
const $ = cheerio.load(response.data);
  

const stitle = $("h1.epih1").text()
const title = $("#info > div > h3").text()
const date = $("#info > span").text()
		
    const results = [];
    $('table tbody tr').each((_, elem) => {
      results.push({
        quality: $(elem).find('td:first-child a').text().trim(),
        size: $(elem).find('td:nth-child(2)').text().trim(),
        language: $(elem).find('td:nth-child(3)').text().trim(),
        link: $(elem).find('td:first-child a').attr('href')
      });
    });

		

      
                      const msg = `📃 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗖𝗜𝗡𝗘𝗦𝗨𝗕𝗭 𝗠𝗗𝗟 🎬\n\n
📑 *Title:* ${stitle}\n
🧬 *STitle:* ${title}\n
🗓️ *Date:* ${date}
${q}`
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].size + ' | ' + results[i].quality,
rowId: prefix + `cinelink ${results[i].link}`
});
}
const sections = [{
title: "_[Result from cinezubs.]_",
rows: srh
}]

    const listMessage = {
text: msg, 
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from Cinezubs. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
                



cmd({
    pattern: "cinefinds",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')

		var response = await axios.get(q);
    var $ = cheerio.load(response.data);
        const safeExtract = (selector, defaultValue = 'Not found') => {
      const element = $(selector);
      return element.length ? element.text().trim() : defaultValue;
    };

    // Extract movie information
    const title = safeExtract('.sheader .data h1');
    const image = $('.sheader .poster img').attr('src');
    const date = safeExtract('.sheader .data .extra .date')
    const country = safeExtract('.sheader .data .extra .country')
    const duration = safeExtract('.sheader .data .extra .runtime')
    const genres = $('.sheader .data .sgeneros a').map((_, el) => $(el).text().trim()).get()
      const rating= safeExtract('.dt_rating_vgs')
     const ratecount= safeExtract('.rating-count')

                      const msg = `◉ 📌 *Title:* ${title}\n\n
🧬 *Year:* ${date}\n
🫧 *Country:* ${country}\n
✨ *Rating:* ${rating}\n
🚀 *Genres :* ${genres}\n
⌚ *Duration:* ${duration}
> 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗖𝗜𝗡𝗘𝗦𝗨𝗕𝗭 𝗠𝗗𝗟`

                
return await conn.sendMessage(config.JID, { image: { url:image } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*error!!*')
            console.log(e)
            }
    })       



cmd({
    pattern: "cinefindtvs",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')
var response = await axios.get(q);
    var $ = cheerio.load(response.data);
		const image = $("div.poster > img").attr("src")
const image2 = $("p > img.aligncenter.size-full.wp-image-93256").attr("src")
const title = $("div.data > h1").text()
const type = $("span > a").text()
const genre = $("div.data > div.sgeneros > a").text()
const date = $("div.extra > span.date").text()
const desc = $("div:nth-child(16)").text()
const rating = $("#repimdb > strong").text()
const fdate = $("#info > div:nth-child(6) > span").text()
const ldate = $("#info > div:nth-child(7) > span").text()

                      const msg = `◉ 📑 *Title:* ${title}\n
🧬 *Year:* ${date}
🫧 *Type:* ${type}
✨ *Rating:* ${rating}
🚀 *Genres :* ${genre}
⌚ *First Date:* ${fdate}
⌚ *Last date:* ${ldate}
📃 *Desc:* ${desc}
> 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗖𝗜𝗡𝗘𝗦𝗨𝗕𝗭 𝗠𝗗𝗟`

                
return await conn.sendMessage(config.JID, { image: { url:image } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*error!!*')
            console.log(e)
            }
    })       

 


	
cmd({
    pattern: "cinelink",
    react: '🎬',
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, l, prefix, isDev, reply }) => {

    if (!q) return await reply('*Please provide a valid movie URL!*');

    try {


//  const mediaUrl1 = q.split("|")[0]
      //  const title1 = q.split("|")[1]  || 'tc_movie_dl_system' 
const response = await axios.get(q);
        const $ = cheerio.load(response.data);

        
        const initialLink = $('#link').attr('href');
        if (!initialLink) return await reply('No valid download link found.');

      
                let downloadLink = null;

        if (initialLink.includes("server11/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server11/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else if (initialLink.includes("server12/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server12/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else if (initialLink.includes("server13/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server13/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else if (initialLink.includes("server21/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server21/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else if (initialLink.includes("server22/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server22/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else if (initialLink.includes("server23/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server23/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else if (initialLink.includes("server3/1:/")) {
            downloadLink = initialLink.replace("https://google.com/server3/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        } else {
            downloadLink = initialLink.replace("https://google.com/server4/1:/", "https://cinescloud.cskinglk.xyz/server4/");
        }
        

const links = await fetchJson(`https://vajira-movie-api.vercel.app/api/cinesubz/download?url=${downloadLink}&apikey=vajiratech`)

   const downloads = links.data.data;

    if (!downloads || downloads.length === 0) {
      return reply("No download links found.");
    }

    // Format and send download links
    let message = `*🎥 Cinesubz Download Links 🎥*\n\n`;
    downloads.forEach((item, index) => {
      message += `*${index + 1}. ${item.fileName}*\n`;
      message += `📦 Size: ${item.fileSize}\n`;
      message += `🔗 Type: ${item.type}\n===============================\n`;
    });

    
            
if (links.data.data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < links.data.data.length; i++) {
srh.push({
title: i + 1,
description: links.data.data[i].fileName,
rowId: prefix + `mp41 ${links.data.data[i].href}|${links.data.data[i].fileName}`
});
}
const sections = [{
title: "_[Result from cinezubs.]_",
rows: srh
}]

    const listMessage = {
text: message,    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from Cinezubs. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})               





//===============ZOOM================
cmd({
    pattern: "zoom",	
    react: '📑',
    category: "movie",
    desc: "zoom moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
const url = `https://zoom.lk/?s=${q}`;
const response = await axios.get(url);	
const $ = cheerio.load(response.data);

let results = [];
    $("div.td-pb-span8.td-main-content > div > div.td_module_16.td_module_wrap.td-animation-stack").each((c, d) => {
        results.push({
             time: $(d).find("div.item-details > div > span > time").text(),
             title: $(d).find("div.item-details > h3 > a").text(),
             author: $(d).find("div.item-details > div > span > a").text(),
             desc: $(d).find("div.item-details > div.td-excerpt").text(),
             comments: $(d).find("div.item-details > div > span.td-module-comments a").text(),
             image: $(d).find("div.td-module-thumb > img").attr("src"),
	     link: $(d).find("div.item-details > h3 > a").attr("href"),	
           
        })
    })
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title + '+' + results[i].time,
rowId: prefix + 'zoomdl ' + results[i].link
});
}
const sections = [{
title: "_[Result from zoom.]_",
rows: srh
}]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: config.LOGO },		    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from zoom. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "zoomdl",	
    react: '📑',
    category: "",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')


const response = await axios.get(q);	
const $ = cheerio.load(response.data);
      const title = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.td_block_wrap.tdb_title.tdi_60.tdb-single-title.td-pb-border-top.td_block_template_17 > div > h1").text();
      const author = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_64.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > ul > li > a").text();
      const view = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_67.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > span").text();
      const date = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_70.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > time").text();
      const size = $("#tdi_81 > div > div.vc_column.tdi_84.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.td_block_wrap.tdb_single_content.tdi_86.td-pb-border-top.td_block_template_17.td-post-content.tagdiv-type > div > p > a > small").text();
      const dllink = $("div.tdb-block-inner.td-fix-index > p > a").attr("href");

const cap = `📃 *Title:* ${title}\n
🔗 *Link:* ${dllink}\n
📅 *Year:* ${date}\n
💫 *Size:* ${size}\n
⏳ *Views:* ${view}\n`
		    
  const sections = [
{
	title: "*🎬 SUB-SEARCH-SITE 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `zip ${dllink}|${title}` , description: `Download in ${size}`},	
	]
    }	  
]
const listMessage = {
text: cap,
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By zoom',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


//================SUBZ===============

cmd({
    pattern: "subz",	
    react: '📑',
    category: "movie",
    desc: "subz moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	var link = `https://subz.lk/?s=${q}`
var response = await axios.get(link);
var $ = cheerio.load(response.data);
const results = [];

$('div.col-lg-3.col-md-6.col-sm-12').each((i,element) => {
results.push({
title: $(element).find('a.font-bold.text-wrap.text-break.text-justify').text(),
link: $(element).find('a').attr("href"),
image: $(element).find('img').attr("src"),
emovies: $(element).find('a.text-white').attr("href"),
})
    })
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title  + '+' + results[i].emovies,
rowId: prefix + 'subzdl ' + results[i].link
});
}
const sections = [{
title: "_[Result from subz.]_",
rows: srh
}]

    const listMessage = {
caption: `⏳ Search A SubsTitle Name: ${q}
📲 Search top 10 SubsTitles\n`,
image : { url: config.LOGO },	    	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By subz',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
	


cmd({
    pattern: "subzdl",	
    react: '📑',
    category: "",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

var response = await axios.get(q);
var $ = cheerio.load(response.data);

const title = $("h1.text-center.text-danger.h4").text();
const image = $("img.rounded.mx-auto.d-block.shadow-2-strong.mb-0.wp-post-image").attr("src");
const date = $("time").text().trim();
const dllink = $("a.btn.btn-outline-success.fw-bold").attr("href");
const size = $("li.list-group-item").text().trim();

const cap = `📃 *Title:* ${title}\n
📅 *Year:* ${date}\n
💫 *Size:* ${size}\n`
		    
  const sections = [
{
	title: "*🎬 SUB-SEARCH-SITE 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `zip ${dllink}|${title}` , description: `Download Substitles`},	
	]
    }	  
]
const listMessage = {
caption: ``,
image : { url: image },	
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By subz',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


//================SINHALSUBTITLE===============

cmd({
    pattern: "s-subtitle",	
    react: '📑',
    category: "movie",
    desc: "s-subtitle moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://sinhala-subtitles.com/?s=${q}`;
const response = await axios.get(url);
        var $ = cheerio.load(response.data);
        const results = [];
        
        $('article.l-post.grid-base-post.grid-post').each((i,element) => {
        results.push({
        
        link: $(element).find('a').attr("href"),
        image: $(element).find('span').attr("data-bgsrc"),
        title: $(element).find('a').attr("title"),
        date: $(element).find('time.post-date').text(),
        desc: $(element).find('p').text()
        
        })
            })
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title + '||' + results[i].date,
rowId: prefix + 'ssdl ' + results[i].link
});
}
const sections = [{
title: "_[Result from sinhala-subtitles.]_",
rows: srh
}]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: config.LOGO },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from sinhala-subtitles. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})




cmd({
    pattern: "ssdl",	
    react: '📑',
    category: "",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{
        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

const response = await axios.get(q);	
const $ = cheerio.load(response.data);
const title = $('h1.is-title.post-title').text();
const date = $('span.meta-item.date > time.post-date').text();
const image = $('a.image-link.media-ratio.ar-bunyad-main').attr("href");
const desc = $('p').text();
const dllink = $('figure > a').attr("href");

const cap = `*👾 Available All Subs...*

ඔබට අවශ්‍ය movie site එක තෝරන්න`
		    
  const sections = [
{
	title: "*🎬 MOVIE-SEARCH-SITE 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `zip ${dllink}|${title}` , description: 'Download in sinhala-subtitles'},	
	]
    }	  
]
const listMessage = {
caption: `📃 *Title:* ${title}\n
🔗 *Link:* ${dllink}\n
📅 *Year:* ${date}\n
⏳ *Views:* ${desc}\n`,
image : { url: image },	
footer: 'MOVIE DOWNLOADER BY VAJIR MD',
title: 'Search By sinhala-subtitles',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
	








//------------------------dl---------------






cmd({
    pattern: `mp4`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {


	    
        //const mediaUrl = q.trim();
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tc_movie_dl_system'
	    
     const response = await axios.get(mediaUrl);  
const $ = cheerio.load(response.data);
    const link = $("#link").attr("href")
const drain = link.replace(/u/g, 'api/file')   
console.log(drain)

var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}



        const message = {
            document: await getBuffer(drain),
	    caption: `${title}\n*🎬 VAJIRA MD TEAM MOVIEDL 🎬*`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };


	    
        await conn.sendMessage(from, message );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});



cmd({
    pattern: `mp41`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {


	    
        //const mediaUrl = q.trim();
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tc_movie_dl_system'
	    
    


var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}



        const message = {
            document: await getBuffer(mediaUrl),
	    caption: `${title}\n*🎬 VAJIRA MD TEAM MOVIEDL 🎬*`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };


	    
        await conn.sendMessage(from, message );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});




cmd({
    pattern: "zip",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {


        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'vajira_md_sub_dl_system'

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');

var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}


        const message = {
            document: await getBuffer(mediaUrl),
	    caption: "*🎬 VAJIRA MD SUB-DL 🎬*",
            mimetype: "VAJIRA MD SUB DL",
            fileName: `${title}.zip`,
        };

        await conn.sendMessage(from, message, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});





        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});




