const Discord = require('discord.js');
const { YTSearcher } = require('ytsearcher');
const searcher = new YTSearcher(process.env.YOUTUBE_API_KEY);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    if (!client.music[message.guild.id]) {
      client.music[message.guild.id] = {queue: [], loop: false};
    }

    var server = client.music[message.guild.id];
    let res = await searcher.search(server.queue[0]);
    
    let embed = new Discord.RichEmbed()
    .setTitle(res.first.title)
    .setDescription(res.first.description)
    .setColor('#eeeeee')
    .setURL(res.first.url);
    
    message.channel.send(embed);
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['np'],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'nowplaying',
  category: 'Music',
  description: 'Returns the song playing now',
  usage: 'nowplaying'
};
