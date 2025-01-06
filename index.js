const { ShardingManager } = require('discord.js');
const {webserver} = require('./webserver');
require('dotenv').config();

const manager = new ShardingManager('./bot.js', {
    token: process.env.Token,
    totalShards: 'auto',
});

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();


webserver();