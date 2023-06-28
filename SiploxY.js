const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fetch = require('node-fetch');

let prefix = config.prefix;

client.on("ready", () => {
    console.log(`Toy listo ·w·`);
});

client.once('ready', () => { // setActivity ACTIVIDAD DE ESTADO
    client.user.setActivity('Prefix: s! || wawa ·w·', { type: 'PLAYING' });

});

const snipes = new Discord.Collection()   // VAR SNIPE

client.on('messageDelete', message => {     // VAR SNIPE 2
    snipes.set(message.channel.id, message)
    
})

client.on("messageDelete", async (deletedMessage) => {
    const { guild } = deletedMessage;
    const deletionLog = (await guild.fetchAuditLogs({ type: "MESSAGE_DELETE" })).entries.first();
    if (!deletionLog) return;
  
    const { executor } = deletionLog;
    console.log(`~${executor.username}~ ha borrado un mensaje en ~${guild.name}~ que decía: "${deletedMessage.content}" ·w·`);

});

client.on("message", async (message) => {
    let week = 0
    let days = 0
    if (message.author.bot) return;
	const args = message.content.trim().split(/ +/g);
    if(message.content.startsWith(prefix + 'help')) {
        
        const embedUtilidad = new Discord.MessageEmbed()
            .setTitle("Utilidad")
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor("PURPLE")
            .addField('Img (BETA)', 'Enviará una imagen de la busqueda que hagas.', true)
            .addField('Avatar', 'Enviará el avatar de la persona a la que hayas mencionado', true)
            .addField('Say', 'Dirá lo que que tu escribas y borrará tu mensaje', true)
            .addField('Serverinfo (BETA)', 'Mostrará toda la información posible del servidor.')
            .addField('Servericon', 'Mostrará el icono del servidor en el que estes.', true)
            .addField('Rolinfo', 'Mostrará toda la información de el rol que menciones.', true)
            .addField('Roles', 'Mostrará todos los roles de el servidor en el que estes', true)
            .addField('Snipe', 'Enseñará el contenido del ultimo mensaje que ha sido borrado en un guild', true)
            .addField('Ping', 'Comprobará la latencia de la API de Discord', true)
        
        const embedEntretenimiento = new Discord.MessageEmbed()
            .setTitle("Entretenimiento")
            .setColor("PURPLE")
            .addField('8ball', 'Adivinará el futuro de la pregunta que hagas', true)
            .addField('Dado', 'Tirara un dado, te dará un numero del 1 al 6', true)
            .addField('Coinflip', 'Lanzará una monera y saldrá cara o cruz', true)
            .addField('RandomCap (BETA)', 'Enviará una captura aleatoria tomada por un usuario cualquiera.', true)
            .addField('Randomuser', 'Dirá el nombre de un usuario aleatorio del server', true)

        const embedImagenes = new Discord.MessageEmbed()
            .setTitle("Imagenes")
            .setColor("PURPLE")
            .addField('Neko', 'Enviará imagenes aleatorias de nekos ·w·', true)
            .addField('Capybara', 'Enviará imagenes aleatorias de Capybaras', true)
            .addField('SadCat', 'Enviará imagenes aleatorias de gatos tristes', true)
            .addField('Cat', 'Enviará imagenes aleatorias de gatos ￣ω￣', true)
            .addField('Dog', 'Enviará imagenes aleatorias de perros', true)

        const embedInteracción = new Discord.MessageEmbed()
            .setTitle("Interacción")
            .setColor("PURPLE")
            .addField('Pat', 'Acariciarás a la persona que menciones', true)
            .addField('Cuddle', 'Te acurrucarás con las personas que menciones', true)
            .addField('Hug', 'Abrazás a  la  persona que menciones', true)
            .addField('Kiss', 'Besarás a la persona que menciones **o.o**', true)
            .addField('Dance', 'Hará que bailes', true)
            .addField('Slap', 'Le darás una bofetada a la persona que menciones', true)
            .addField('Punch', 'Le darás un golpe a las persona que menciones', true)
            .addField('Kill', 'Matarás a la persona que menciones', true)
            .setFooter("~~ .botinfo para ver mas información del bot ~~")

        message.author.send(embedUtilidad)
        message.author.send(embedEntretenimiento)
        message.author.send(embedImagenes)
        message.author.send(embedInteracción);

        message.channel.send("Te he mandado un mensaje con todos los comandos a tu md ·w·")
                                                                   
    }
    // EMOTES ♥ ♥ ♥ //
    // EMOTES ♥ ♥ ♥ // 
    let emotes = ["·w·", "(p≧w≦q)", "o((>ω< ))o", "( •̀ ω •́ )✧", "ヾ(•ω•`)o", "(^人^)", "(。・ω・。)", "(★ ω ★)", "(^._.^)ﾉ", "(*/ω＼*)", "＞﹏＜", "(lll￢ω￢)", "つ﹏⊂"] 
    var msgEmote = emotes[Math.floor(Math.random() * emotes.length)]
    // COMANDOS DE UTILIDAD ♥ ♥ ♥ //
    // COMANDOS DE UTILIDAD ♥ ♥ ♥ //
    if(message.content.startsWith(prefix + "botinfo")) {
        let uptime = ``;
        let totalS = (client.uptime / 1000);
        let HRS = Math.floor(totalS / 3600);
        totalS %= 3600;
        let MINS = Math.floor(totalS / 60);
        let SEC = Math.floor(totalS % 60);

        if(HRS > 23){
            days = days + 1;
            hours = 0;
        }

        if(days == 7){
            days = 0;
            week = + 1;
        }

        if(week > 0){
            uptime += `${week} week`;
        }

        if(MINS > 60){
            MINS = 0;
        }

        uptime += `${days} Dias, ${HRS} Horas, ${MINS} Minutos ${SEC} Segundos`;


        const embedInfo = new Discord.MessageEmbed()
        .setAuthor("SiploxY", client.user.avatarURL())
        .setThumbnail(client.user.avatarURL())
        .addField("Developer: ", `siploxT#2805`)
        .addField("Servers: ", ` ${client.guilds.cache.size}`)
        .addField("Usuarios: ", ` ${client.users.cache.size}`)
        .addField("Uptime: ", ` ${uptime}` )
        .addField("Ram: ", ` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
        .addField("Libreria: ", "discord.js@14.8.0")
        .setColor("PURPLE")

        message.channel.send(embedInfo)
    }
    if(message.content.startsWith(prefix + "img")) {
        const query = message.content.slice(5); // Obtener la consulta después del comando '!img'
        const image_url = await getImage(query);
    
        if (image_url) {
          message.channel.send(image_url);
        } else {
          message.channel.send(`No se encontraron imágenes acerca de${query}.`);
        }
    }
    
    async function getImage(query) {
      // Lógica para obtener una imagen relacionada con la consulta utilizando la API de Unsplash
      // Asegúrate de usar tu propia clave de API válida de Unsplash
    
      const api_key = 'gWJx3_2TW-1f6muA0xUzx6vnuN-YzXK0yVufLZN4_58';
      const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${api_key}`;
    
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (data.urls && data.urls.regular) {
            return data.urls.regular;
          }
        }
      } catch (error) {
        console.error('Error al obtener la imagen:', error);
      }
    
      return null;
    }
    if(message.content.startsWith(prefix + "avatar") || message.content.startsWith(prefix + "a")) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let avatar = user.user.displayAvatarURL({ dynamic: true, size: 2048})
   
        const embedAvatar = new Discord.MessageEmbed()
   
        .setDescription("**Avatar de** <@" + user + "> **:** " )
        .setColor("RANDOM")
        .setImage(avatar)
   
        message.channel.send(embedAvatar)
    }
    if(message.content.startsWith(prefix + "say")) {
        const args = message.content.slice(5)
        if(!args) return message.channel.send(`Necesitas poner algo para que pueda decirlo. ${msgEmote}`)
    
        message.channel.send(args)
    
        message.delete()
    }
    if(message.content.startsWith(prefix + "serverinfo")) {
        const server = message.guild // Info del server
        // ↓↓↓ Cantidad de Usuarios
        const totalBots = server.members.cache.filter(member => member.user.bot).size;
        const totalMembers = server.memberCount
        const totalUsers = totalMembers - totalBots
        // ↓↓↓ Estado de los Usuarios
        const onlineMembers = server.members.cache.filter(member => member.presence.status === 'online').size;
        const idleMembers = server.members.cache.filter(member => member.presence.status === 'idle').size;
        const dndMembers = server.members.cache.filter(member => member.presence.status === 'dnd').size;
        const offlineMembers = server.members.cache.filter(member => member.presence.status === 'offline').size;
        // ↓↓↓ Cantidad de Canales
        const totalChannels = server.channels.cache.size;
        const textChannels = server.channels.cache.filter(channel => channel.type === 'text').size;
        const voiceChannels = server.channels.cache.filter(channel => channel.type === 'voice').size;
        const threadChannels = server.channels.cache.filter(channel => channel.type === 'thread').size;
        // ↓↓↓ Nivel de Verificación
        const verificationLevel = server.verificationLevel;
        // ↓↓↓ Icono del Servidor
        let icon = message.guild.iconURL({size : 2048, dyamic : true})
        // ↓↓↓ Nivel de Verificación
        function getVerificationLevelText(level) {
            switch (level) {
              case 'NONE':
                return 'Ninguno';
              case 'LOW':
                return 'Bajo';
              case 'MEDIUM':
                return 'Medio';
              case 'HIGH':
                return 'Alto';
              case 'VERY_HIGH':
                return 'Muy alto';
              default:
                return 'Desconocido';
            }
        }

        const embedServer = new Discord.MessageEmbed()
        .setTitle(`Información del server - ${msgEmote}`)
        .setDescription(`**Nombre:** ${server.name}\n**ID:** ${server.id}`)
        .setThumbnail(icon)
        .addField('__Usuarios__', `- Total: ${totalMembers}\n- Usuarios: ${totalUsers}\n- Bots: ${totalBots}`)
        .addField('__Estados de los Usuarios__', `- En línea: ${onlineMembers}\n- Ausente: ${idleMembers}\n- No molestar: ${dndMembers}\n- Desconectado: ${offlineMembers}`)
        .addField('__Canales__', `- Total: ${totalChannels}\n- Texto: ${textChannels}\n- Voz: ${voiceChannels}\n- Hilos: ${threadChannels}`)
        .addField('__Nivel de Verificación__', `- ${getVerificationLevelText(verificationLevel)}`)
        .setFooter(`Región: ${server.region}`)
        .setColor('PURPLE');

        message.channel.send(embedServer)
    
    }
    if(message.content.startsWith(prefix + "servericon")) {
        let icon = message.guild.iconURL({size : 2048, dyamic : true})
        let id = message.guild;

        const embedIcon = new Discord.MessageEmbed()
        
        .setTitle("El icono de " + message.guild.name + " es:")
        .setColor("RANDOM")
        .setImage(icon)

        message.channel.send(embedIcon)
    }
    if(message.content.startsWith(prefix + "rolinfo")) {
        const rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        if(!rol) return message.channel.send(`Tienes que mencionar un rol para que pueda enseñarte su información. ${msgEmote}`)

        let mencionable = {
            'true': 'Si',
            'false': 'No'
        }
        let separado = {
            'true': 'Si',
            'false': 'No'
        }
        let sistema = {
            'true': 'Si',
            'false': 'No'
        }

        const permisos = rol.permissions.toArray().join('\`, \`');

        const rolEmbed = new Discord.MessageEmbed()
        .setDescription(`**Información del rol - ${msgEmote}**`)
        .addField("Nombre:", `- ${rol.name}`)
        .addField("ID:", `- ${rol.id}`)
        .addField("Usuarios con el rol:", `- ${rol.members.size}`)
        .addField("Posición:", `- ${rol.rawPosition}`)
        .addField("HexColor:", `- ${rol.hexColor}`)
        .addField("Mencionable:", `- ${mencionable[rol.mentionable]}` )
        .addField("Separado:", `- ${separado[rol.hoist]}`)
        .addField("Gestionado por el sistema:", `- ${sistema[rol.managed]}`)
        .addField("Permisos:", `- \`${permisos}\``)
        .setColor(rol.hexColor)

        message.channel.send(rolEmbed)


    }
    if(message.content.startsWith(prefix + "roles")) {
        let icon = message.guild.iconURL({size : 2048, dyamic : true})
        let id = message.guild;
         const embedRoles = new Discord.MessageEmbed()
         .setColor("PURPLE")
         .setThumbnail(icon)
         .setDescription(`${id.roles.cache.map(r => r.name).join(" - ")}`)
         .setFooter('Lista de roles de '+ message.guild.name);
    
        message.channel.send(embedRoles);
    
    }
    if(message.content.startsWith(prefix + "snipe")) {
        let snipe = snipes.get(message.channel.id)
        if(!snipe) return message.channel.send('No hay ningún mensaje borrado al que hacerle snipe unu')

        const embedSnipe = new Discord.MessageEmbed()
        .setAuthor(`Mensaje borrado por ${snipe.author.username}`, snipe.author.displayAvatarURL())
        .setColor("PURPLE")
        .setDescription(snipe.content)
        .setTimestamp(snipe.createdAt);
        message.channel.send(embedSnipe)

    }
    if(message.content.startsWith(prefix + "ping")) {
        message.channel.send(`La latencia del API de Discord es de **${Math.round(client.ws.ping)}ms.**. ${msgEmote}`);

    }
    // COMANDOS DE ENTRETENIMIENTO ♥ ♥ ♥ //
    // COMANDOS DE ENTRETENIMIENTO ♥ ♥ ♥ //
    if(message.content.startsWith(prefix + "8ball")) {
        const args = message.content.slice(7)
        if(!args) return message.channel.send(`Necesitas preguntarme algo para que pueda responderte ${msgEmote}`)
        let respuesta = ["Sis", "Non", "Puede ser", "Es lo mas probable", "Las probabilidades son bajas", "No lo creo", "Definitivamente.", "Definitivamente no."  ]
        var random = respuesta[Math.floor(Math.random() * respuesta.length)]


        message.channel.send(random)
    }
    if(message.content.startsWith(prefix + "dado")) {
        let respuestadado = ["🎲 ¡Te ha salido un **1**!", "🎲 ¡Te ha salido un **2**!", "🎲 ¡Te ha salido un **3**!", "🎲 ¡Te ha salido un **4**!", "🎲 ¡Te ha salido un **5**!", "🎲 ¡Te ha salido un **6**!"]
        var randomdado = respuestadado[Math.floor(Math.random() * respuestadado.length)]
      
      message.channel.send(randomdado)
    }
    if(message.content.startsWith(prefix + "coinflip")) {
        let respuestacoin = [":coin: ¡Te ha salido **cara**! :coin: ", ":coin: ¡Te ha salido **cruz**! :coin: "]
        var randomcoin = respuestacoin[Math.floor(Math.random() * respuestacoin.length)]

      message.channel.send(randomcoin)
    }
    if (message.content.startsWith(prefix + "randomcap") || message.content.startsWith(prefix + "rc")) {
        
        function generateRandomCharacters(length) {
          let result = '';
          const alphabet = 'abcdefghijklmnopqrstuvwxyz';
          const numbers = '0123456789';
      
          for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            result += alphabet.charAt(randomIndex);
          }
      
          for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            result += numbers.charAt(randomIndex);
          }
      
          return result;
        }
      
        const prnt = 'https://prnt.sc/';
        const randomCharacters = generateRandomCharacters(6);
        const link = prnt + randomCharacters;

        const rcEmbed = new Discord.MessageEmbed()
        .setTitle(`Captura aleatoria ${msgEmote}`)
        .setImage()
        .setFooter(link)
      
        message.channel.send(link);

    }
    if (message.content.startsWith(prefix + "randomuser") || message.content.startsWith(prefix + "ru")) {
        const randomMember = message.guild.members.cache.random();

        const embedRandomUser = new Discord.MessageEmbed()
          .setTitle("__**" + randomMember.user.username + "**__")
          .setThumbnail(randomMember.user.avatarURL())
          .setDescription("Status: " + "*" + randomMember.presence.status + "*")
          .setColor("RANDOM");

        message.channel.send(embedRandomUser);
    }
    // COMANDOS DE IMAGENES ♥ ♥ ♥ //
    // COMANDOS DE IMAGENES ♥ ♥ ♥ //
    if(message.content.startsWith(prefix + "neko")) {
        const fetch = require ('node-fetch')
        const { MessageEmbed } = require("discord.js")


        fetch(`http://api.nekos.fun:8080/api/neko`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            let embed = new MessageEmbed()
            .setTitle('Toma una neko ·w·')
            .setImage(body.image)
            .setColor("PURPLE")
            message.channel.send(embed)
        })


    }
    if(message.content.startsWith(prefix + "capybara")) {
        var capy = ["capybara ?!", "capybara !  !! !", "^__^", "coconut doggy", "o my gosh", "cappy blappy"]
        var capyrandom = capy[Math.floor(capy.length * Math.random())]
        const fetch = require ('node-fetch')
        const { MessageEmbed } = require("discord.js")

        fetch(`https://api.animality.xyz/img/capybara`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            let embed = new MessageEmbed()
            .setTitle(capyrandom)
            .setImage(body.link)
            .setColor("GREEN")
            message.channel.send(embed)
        })
    }
    if(message.content.startsWith(prefix + "sadcat")) {
     const fetch = require('node-fetch')
     const { MessageEmbed } = require("discord.js")


     fetch(`https://api.alexflipnote.dev/sadcat`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            let embed = new MessageEmbed()
            .setTitle('Meow')
            .setImage(body.file)
            .setColor("PURPLE")
            message.channel.send(embed)
        })
    }
    if(message.content.startsWith(prefix + "cat")) {
     const fetch = require('node-fetch')
     const { MessageEmbed } = require("discord.js")


     fetch(`https://api.alexflipnote.dev/cats`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            let embed = new MessageEmbed()
            .setTitle('Meow')
            .setImage(body.file)
            .setColor("PURPLE")
            message.channel.send(embed)
        })
    }
    if(message.content.startsWith(prefix + "dog")) {
        const fetch = require('node-fetch')
        const { MessageEmbed } = require("discord.js")


     fetch(`https://api.alexflipnote.dev/dogs`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            let embed = new MessageEmbed()
            .setTitle('Doggy')
            .setImage(body.file)
            .setColor("PURPLE")
            message.channel.send(embed)
        })
    }
    // COMANDOS DE INTERACCIÓN ♥ ♥ ♥ //
    // COMANDOS DE INTERACCIÓN ♥ ♥ ♥ //
    if(message.content.startsWith(prefix + "pat")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a alguien para poder acariciarlo. ${msgEmote}`)
        var respuestapat = ["https://c.tenor.com/Y7B6npa9mXcAAAAC/rikka-head-pat-pat-on-head.gif", "https://c.tenor.com/E6fMkQRZBdIAAAAC/kanna-kamui-pat.gif", "https://c.tenor.com/8DaE6qzF0DwAAAAC/neet-anime.gif", "https://c.tenor.com/i7nXGbPLqTsAAAAC/anime-hug.gif", "https://c.tenor.com/kM1mVaXE8Y8AAAAC/kaede-azusagawa-kaede.gif", "https://c.tenor.com/TRxNL32jtEIAAAAC/anime-pat.gif", 
        "https://c.tenor.com/8o4fWGwBY1EAAAAd/aharensan-aharen.gif", "https://c.tenor.com/jEfC8cztigIAAAAC/anime-pat.gif", "https://c.tenor.com/lOawy4d-SHMAAAAd/anime-cuddle-gauge.gif", "https://c.tenor.com/VzJtkXVo06wAAAAC/yuru-yuri-anime.gif", "https://c.tenor.com/Jj-vHGZOgT4AAAAC/anime-anime-girl.gif", "https://c.tenor.com/jBuHEbqxarcAAAAC/k-on-anime.gif"]
        let randompat = respuestapat[Math.floor(respuestapat.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed() 
        .setTitle("")
        .setDescription('**' + user + '**' + ' acarició a **<@' + ment + ">**")
        .setColor("PURPLE")
        .setImage(randompat)

        message.channel.send({ embed: embedDatos });
    }
    if(message.content.startsWith(prefix + "cuddle")) {                                                                                         
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a alguien para poder acurrucarte con el ${msgEmote}`)
        var respuestacuddle = ["https://c.tenor.com/doc8uMAT5ssAAAAC/anime-love.gif", "https://c.tenor.com/wwd7R-pi7DIAAAAC/anime-cuddle.gif", "https://c.tenor.com/s44ige0diLYAAAAC/sanriokill-anime.gif", "https://c.tenor.com/ItpTQW2UKPYAAAAC/cuddle-hug.gif", "https://c.tenor.com/2VVGNLi-EV4AAAAC/anime-cute.gif", "https://c.tenor.com/gowinK__PvAAAAAC/anime-cuddle.gif", "https://c.tenor.com/8BqG6yTLCLEAAAAC/anime.gif",
        "https://c.tenor.com/WWgamF4xjZcAAAAC/anime-cuddle.gif", "https://c.tenor.com/y9_xxO9iMwkAAAAC/hug.gif", "https://c.tenor.com/hGUWkkHB_DQAAAAC/cuddle-anime.gif", "https://c.tenor.com/b3Qvt--s_i0AAAAC/hugs.gif", "https://c.tenor.com/NaJIRcVnWloAAAAd/sao-sword-art-online.gif", "https://c.tenor.com/XLWytMsrNy8AAAAC/kaioura-anime-girl.gif", "https://c.tenor.com/Fld0jbqWpDsAAAAC/gochuumon-wa-usagi-desuka-is-the-order-a-rabbit.gif"]
        let randomcuddle = respuestacuddle[Math.floor(respuestacuddle.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' se acurrucó con **<@' + ment + ">**")
        .setColor("PURPLE")
        .setImage(randomcuddle)

        message.channel.send({ embed: embedDatos });
    }
    if(message.content.startsWith(prefix + "hug")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a alguien para poder abrazarlo. ${msgEmote} `)
        var respuestahug = ["https://c.tenor.com/kCZjTqCKiggAAAAC/hug.gif", "https://c.tenor.com/fklZNDaU9NMAAAAC/hideri-hideri-kanzaki.gif", "https://c.tenor.com/gqM9rl1GKu8AAAAC/kitsune-upload-hug.gif", "https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif", "https://c.tenor.com/8Jk1ueYnyYUAAAAC/hug.gif", "https://c.tenor.com/gKlGEBBkliwAAAAC/anime-yuru-yuri.gif", "https://c.tenor.com/XKJwFX9B_DUAAAAC/hug.gif",
        "https://c.tenor.com/vpE5_F_oqmsAAAAC/run-hug-hug.gif", "https://c.tenor.com/-0nQoPY5sZ0AAAAC/anime-hug-hug.gif", "https://c.tenor.com/we1trpFB2F0AAAAC/neko-hug.gif", "https://c.tenor.com/4D5jSREXInMAAAAd/anime-couple-hug.gif", "https://c.tenor.com/QTbBCR3j-vYAAAAd/hugs-best-friends.gif", "https://c.tenor.com/yc_shX2Xl_QAAAAd/girl-anime.gif", "https://c.tenor.com/TJuvig1CFBQAAAAM/the-pet-girl-of-sakurasou-sakurasou-no-pet-na-kanojo.gif" ]
        let randomhug = respuestahug[Math.floor(respuestahug.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' abrazó a **<@' + ment + ">**")
        .setColor("PURPLE")
        .setImage(randomhug)

        message.channel.send({ embed: embedDatos });
    }
    if(message.content.startsWith(prefix + "kiss")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a alguien para poder besarlo. ${msgEmote}`)
        var respuestabeso = ["https://c.tenor.com/fiafXWajQFoAAAAC/kiss-anime.gif", "https://c.tenor.com/riftr5iWqZQAAAAC/xdd.gif", "https://c.tenor.com/OjcDtiEDUvMAAAAC/friendly-kiss.gif", "https://c.tenor.com/Fyq9izHlreQAAAAC/my-little-monster-haru-yoshida.gif", "https://c.tenor.com/jN35LrknUpkAAAAC/test.gif", "https://c.tenor.com/9jB6M6aoW0AAAAAC/val-ally-kiss.gif", "https://c.tenor.com/wQyttVAvkF0AAAAd/forehead-kiss-anime.gif", "https://c.tenor.com/NO6j5K8YuRAAAAAC/leni.gif", "https://c.tenor.com/yoMKK29AMQsAAAAC/kiss-toradora.gif", 
        "https://c.tenor.com/dn_KuOESmUYAAAAC/engage-kiss-anime-kiss.gif", "https://c.tenor.com/vhuon7swiOYAAAAC/rakudai-kishi-kiss.gif", "https://c.tenor.com/YeitcPAdSCYAAAAd/kyo-x-tohru-kiss.gif", "https://c.tenor.com/g9HjxRZM2C8AAAAd/anime-love.gif", "https://c.tenor.com/nRdyrvS3qa4AAAAC/anime-kiss.gif"]
        var randombeso = respuestabeso[Math.floor(respuestabeso.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' ha besado a **<@' + ment + '>** o.o')
        .setColor("PURPLE")
        .setImage(randombeso)

        message.channel.send({ embed: embedDatos});
    }
    if(message.content.startsWith(prefix + "dance")) {
        let user = message.author.username;
        var respuestadance = ["https://c.tenor.com/YNHT2hPxGawAAAAd/happy-birthday.gif", "https://c.tenor.com/LP6rGpITvlsAAAAd/chill.gif", "https://c.tenor.com/QwNUEvvKxY8AAAAd/happy-loli.gif", "https://c.tenor.com/U8WV2zeMLBEAAAAC/anime-dancing.gif", "https://c.tenor.com/1WtAgS78CB0AAAAd/duck-dance.gif", "https://c.tenor.com/8W8rOwe8XCEAAAAd/dance-anime.gif", "https://c.tenor.com/ysPVGNGfWBcAAAAC/anime-dance-happy.gif",
        "https://c.tenor.com/GYjYgE-UCEgAAAAd/shinobu-kocho-dance.gif", "https://c.tenor.com/V8gBHFz-5mgAAAAC/kanna-kamui-kanna-dance.gif", "https://c.tenor.com/leneA9CzXlUAAAAC/dandidave-anime.gif", "https://c.tenor.com/_UMScn4rrGcAAAAC/dandidave-wave.gif", "https://c.tenor.com/gQ5iadXLfnQAAAAC/daisuke-dance.gif", "https://c.tenor.com/3Mc4IqoPAxAAAAAd/anime-dance.gif", "https://c.tenor.com/0w22pJMgugkAAAAC/hatsune-miku-dancing.gif", "https://c.tenor.com/K7GNv-vxewEAAAAM/hatsune-miku-vocaloid.gif" ]
        let randomdance = respuestadance[Math.floor(respuestadance.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed() 
        .setTitle("")
        .setDescription('**' + user + '** está bailando')
        .setColor("PURPLE")
        .setImage(randomdance)

        message.channel.send({ embed: embedDatos });
    }
    if(message.content.startsWith(prefix + "slap")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a la persona que quieras abofetear. ${msgEmote}`)
        var respuestaslap = ["https://c.tenor.com/XiYuU9h44-AAAAAC/anime-slap-mad.gif", "https://c.tenor.com/LUJRVpYgy-8AAAAC/kiniro-kiniro-mosaic.gif", "https://c.tenor.com/Ws6Dm1ZW_vMAAAAC/girl-slap.gif", "https://c.tenor.com/PeJyQRCSHHkAAAAC/saki-saki-mukai-naoya.gif", "https://c.tenor.com/rVXByOZKidMAAAAd/anime-slap.gif", "https://c.tenor.com/eU5H6GbVjrcAAAAM/slap-jjk.gif", "https://c.tenor.com/L0fsdBYmh_wAAAAC/kokoro-connect-slap-anime.gif",
        "https://c.tenor.com/pgq_YsVX7sEAAAAC/meliodas-seven-deadly-sins.gif", "https://c.tenor.com/UDo0WPttiRsAAAAM/bunny-girl-slap.gif", "https://c.tenor.com/E3OW-MYYum0AAAAC/no-angry.gif", "https://c.tenor.com/iDdGxlZZfGoAAAAC/powerful-head-slap.gif", "https://c.tenor.com/Sp7yE5UzqFMAAAAC/spank-slap.gif", "https://c.tenor.com/FrEq8y-Qf78AAAAC/anime-slapping.gif", "https://c.tenor.com/CvBTA0GyrogAAAAC/anime-slap.gif", "https://c.tenor.com/2-r7BEc-cb8AAAAC/slap-smack.gif",
        "https://c.tenor.com/hscOq_sMFdAAAAAM/kakashi-zabuza.gif", "https://c.tenor.com/1tk5BKEdCzcAAAAM/fumoffu-full-metal-panic.gif", "https://c.tenor.com/yl9kMAB2pHYAAAAC/slap.gif", "https://c.tenor.com/743sV2IWMEAAAAAC/chuunibyou-demo-koi-ga-shitai-anime.gif", "https://c.tenor.com/OuYAPinRFYgAAAAC/anime-slap.gif", "https://c.tenor.com/469w9za-5a0AAAAC/anime.gif", "https://c.tenor.com/Lc7C5mLIVIQAAAAC/anime-slap.gif", "https://c.tenor.com/vzQLL0MsF0cAAAAC/darkelfcarla-windmill.gif"]
        var randomslap = respuestaslap[Math.floor(respuestaslap.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' le ha dado una bofetada a **<@' + ment + '>**')
        .setColor("PURPLE")
        .setImage(randomslap)

        message.channel.send({embed : embedDatos});
    }
    if(message.content.startsWith(prefix + "punch")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a la persona que quieras pegar. ${msgEmote}`)
        var respuestapunch = ["https://c.tenor.com/SwMgGqBirvcAAAAC/saki-saki-kanojo-mo-kanojo.gif", "https://c.tenor.com/BoYBoopIkBcAAAAC/anime-smash.gif", "https://c.tenor.com/UH8Jnl1W3CYAAAAC/anime-punch-anime.gif", "https://c.tenor.com/EdV_frZ4e_QAAAAC/anime-naruto.gif", "https://c.tenor.com/o8RbiF5-9dYAAAAM/killua-hxh.gif", "https://c.tenor.com/ObgxhbfdVCAAAAAd/luffy-anime.gif", "https://c.tenor.com/5AsLKQTjbJ4AAAAC/kasumi-love-live.gif", "https://c.tenor.com/YTVzMpGOKLwAAAAd/spy-x-family-anya-forger.gif", 
        "https://c.tenor.com/2VSFzXr7oTgAAAAC/kofune-ushio.gif", "https://c.tenor.com/6a42QlkVsCEAAAAM/anime-punch.gif", "https://c.tenor.com/5PyqOsngA00AAAAM/boku-no-hero-academia-my-hero-academia.gif", "https://c.tenor.com/xWqmJMePsqEAAAAM/weaboo-otaku.gif", "https://c.tenor.com/laW-dCBdPUgAAAAM/dragon-ball-super-goku.gif", "https://c.tenor.com/aEX1wE-WrEMAAAAC/anime-right-in-the-stomach.gif", "https://c.tenor.com/DKMb2QPU7aYAAAAC/rin243109-blue-exorcist.gif", "https://c.tenor.com/6Pzqw0wz28QAAAAC/shiki-granbell-shiki.gif", "https://c.tenor.com/1T5bgBYtMgUAAAAC/head-hit-anime.gif"]
        let randompunch = respuestapunch[Math.floor(respuestapunch.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' le ha pegado a **<@' + ment + '>**')
        .setColor("PURPLE")
        .setImage(randompunch)

        message.channel.send({embed: embedDatos});
    }
    if(message.content.startsWith(prefix + "kill")) {
        let user = message.author.username;
        let ment = message.mentions.users.first();
        if(!ment) return message.channel.send(`Menciona a la persona que quieras matar ${msgEmote}`)
        var respuestakill = ["https://c.tenor.com/NbBCakbfZnkAAAAC/die-kill.gif", "https://c.tenor.com/Ds187JeCgckAAAAC/animehit-fugirl.gif", "https://c.tenor.com/Ze50E1rW44UAAAAd/akudama-drive.gif", "https://c.tenor.com/t-0fYVPgg1YAAAAC/pink-hair-anime.gif", "https://c.tenor.com/AGTqt-wXyiEAAAAC/nichijou-minigun.gif", "https://c.tenor.com/Mn4W4D899WEAAAAC/ira-gamagoori-attack.gif", "https://c.tenor.com/bznBkYdhexcAAAAC/fire-arm-fire.gif", 
       "https://c.tenor.com/hkeM4Uie0bcAAAAd/anime-lick-anime-yandere.gif", "https://c.tenor.com/WxLl5mre8pYAAAAd/anime-kill.gif", "https://c.tenor.com/nTEMMozvRwIAAAAd/basil-basil-dies.gif", "https://c.tenor.com/wikodIpaz8oAAAAC/omori-basil.gif", "https://c.tenor.com/G9tCUL5OBcYAAAAC/stab-knife.gif", "https://c.tenor.com/FkxPkj7NOrQAAAAd/akame-akame-of-demon-sword-murasame.gif", "https://c.tenor.com/PFndSfQcmRUAAAAd/anime-kill.gif", "https://c.tenor.com/piK8t2UxKZMAAAAC/edward-elric-punch.gif", "https://c.tenor.com/ECYDNFQJHGgAAAAd/hk416-threat.gif", "https://c.tenor.com/6525cG5E7oQAAAAd/anime-kill-kill.gif",
       "https://c.tenor.com/yWEfaRb2Ly8AAAAd/jojo-meme.gif", "https://c.tenor.com/dq5TwO6YPpAAAAAd/giorno-giovanna-muda-muda-muda.gif"]
        let randomkill = respuestakill[Math.floor(respuestakill.length * Math.random())]

        const embedDatos = new Discord.MessageEmbed()
        .setTitle("")
        .setDescription('**' + user + '**' + ' ha matado a **<@' + ment + '>**')
        .setColor("PURPLE")
        .setImage(randomkill)

        message.channel.send({ embed: embedDatos });

    }
    if(message.content.startsWith(prefix +`wawa`)) {
        message.channel.send("wiwi")
    }
});
client.login(config.token);