const request = require('request')
const discord = require('discord.js')
var setTitle = require('console-title');
const CONFIG = require('./config.json')
var colors = require('colors')


let text = `

██╗░░██╗░█████╗░██████╗░██████╗░██╗░░░██╗██╗░██████╗  ███████╗██╗███╗░░██╗██████╗░███████╗██████╗░
██║░░██║██╔══██╗██╔══██╗██╔══██╗╚██╗░██╔╝╚█║██╔════╝  ██╔════╝██║████╗░██║██╔══██╗██╔════╝██╔══██╗
███████║██║░░██║██████╔╝██████╔╝░╚████╔╝░░╚╝╚█████╗░  █████╗░░██║██╔██╗██║██║░░██║█████╗░░██████╔╝
██╔══██║██║░░██║██╔═══╝░██╔═══╝░░░╚██╔╝░░░░░░╚═══██╗  ██╔══╝░░██║██║╚████║██║░░██║██╔══╝░░██╔══██╗
██║░░██║╚█████╔╝██║░░░░░██║░░░░░░░░██║░░░░░░██████╔╝  ██║░░░░░██║██║░╚███║██████╔╝███████╗██║░░██║
╚═╝░░╚═╝░╚════╝░╚═╝░░░░░╚═╝░░░░░░░░╚═╝░░░░░░╚═════╝░  ╚═╝░░░░░╚═╝╚═╝░░╚══╝╚═════╝░╚══════╝╚═╝░░╚═╝`

console.log(colors.blue(text))

const webhookClient = new discord.WebhookClient(CONFIG.WebhookID, CONFIG.WebhookToken)


let minimum = CONFIG.MinimumID
let maximum = CONFIG.MaximumID

let totalChecked = 0
let totalValid = 0


setTitle("Hoppy's Group Finder || v1.0 || Total Groups Found: "+totalValid+" || Total Groups Checked: "+totalChecked);

console.log(colors.blue("================================================================================================="))


setInterval(() => {
  let current = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
  totalChecked++
  setTitle("Hoppy's Group Finder || v1.0 || Total Groups Found: "+totalValid+" || Total Groups Checked: "+totalChecked);
  request(`https://groups.roblox.com/v1/groups/${current}`, function (error, response, body) {
  let MainData = JSON.parse(body)

  if(MainData.owner == null && MainData.publicEntryAllowed == true && MainData.isLocked == undefined){
console.log(colors.green('[VALID] Found an ownerless group '+MainData.id))
    totalValid++
    const SuccessEmbed = new discord.MessageEmbed()
	.setTitle('GroupFound')
	.setColor('GREEN')
  .addField('GroupName', `${MainData.name}`, true)
  .addField('GroupID', `${MainData.id}`, true)
  .setThumbnail('https://media.discordapp.net/attachments/815679497361686568/840346093245169674/5123a3073853d8107bcc14a2ef3c273b.png')
  .addField('memberCount', `${MainData.memberCount}`, false)
  .addField('GroupLink', `https://www.roblox.com/groups/${MainData.id}`, true)
  .setTimestamp()

webhookClient.send({
	username: "Hoppy's Finder",
	avatarURL: 'https://media.discordapp.net/attachments/815679497361686568/840346093245169674/5123a3073853d8107bcc14a2ef3c273b.png',
	embeds: [SuccessEmbed],
});
  }else{
console.log(colors.red('[INVALID] Found an invalid group'))
}
});

            
        }, 5000)



