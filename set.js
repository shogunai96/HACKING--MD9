const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0hvUm92LzRVVHlmV3krckhkWWo0RTA3aWRxM3BNRHZUb3hOQ1hxWnJXcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRlBHNER5dGV1a2dRRkF4Tm1vRVpiR2lMSzV3d2NjT1dmOSs0NGExc2h6ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFQlVzbUR2c1NGRGVHZXR0cHhtNWJpbWRDczV5V2VaY1kyQUlNL2RrT1cwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwTWo5WHY0OXJBaE9UaU14a1ZiMm1tdjhpb241b0xyalc0MGQrUW9tVlVFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRFNFhtRkRsSUwyRXB5dlNtQ1RFUE5oUFJ5WTJjbGhUcmdoRTdkUEgwVnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZSTzZZMnk5TVA2N2pJTE1pM3JaWXBtdXYwd3R2TkFGSjNwNnZiSEh3aTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUdGYmM1TmhiUzVvN3hVQ2VMR0IrdFFQV0Q0N2UrT2RmbjJoZ3F4dlVVaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSWQ1UFhiK3hFc1BiUXBxNFNWS3ZMbGxYSDZHakN6NFpxN1VndHRWcFRSOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpxWDJmTEpvbUUzTTRjSWtaWFB6SG9NRHhMZmlKS1JJb1NoMVFkb21rNi94RS8wT1dPUEI3TXZlRjZUZ1JlOWwyVWZEV01XejRsYlhXVW8xMDMwbGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjU0LCJhZHZTZWNyZXRLZXkiOiJ0SDJqQXppTGlNOU9jWUIycW5pdGRGK1RiU0x3REVHdWVlZjZ5SmZnMml3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMiwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJhaE1sMWFvalMyQ0tnX0dDQ0N4RndnIiwicGhvbmVJZCI6ImMxNGVkOWY4LTZhY2MtNDJkYy05ODE1LTVlZDBkOGVkNjA0OCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEbXl2S2xhbXRkSEVYWjNWV1NsbTM0VUIyUDA9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVZQjROT0hoM1NXVk1LYWdYcldXdzV4Ky9BWT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pyUzJLd0dFTDdBaTdVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlJFM0x3MEczRHI1LzdQU1lxMEhaQWs4bndoLyttUmVvQ3VZTnRHRFlKd0k9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjRCczlpSG5oalduTkNBTG1zZFRzc2N1VXlNYVR5VndaODVxUGNINHF5SXRCVXdFdDNObWpEMGJ1TWdMMDBpb3pKTlYrQ01wZm1LMmorWmpBN2tTbkJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ5TDh5alU0VGNyanVDK3dLWVNkYU43OUtXRHJrOS9vM3pxNHV3VXhBeGNuYmRGQU9GL1I3eEQyaVVUalZGakpEeVJDakFGVFBobmFUZzFYSFVIYUVpUT09In0sIm1lIjp7ImlkIjoiMjIxNzYwMjYzNjMxOjEyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuODk+ODvOOCs+ODnuODqy5CaWNvbWFydSBTaG9ndW5hxKsifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjIxNzYwMjYzNjMxOjEyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVSTnk4TkJ0dzYrZit6MG1LdEIyUUpQSjhJZi9wa1hxQXJtRGJSZzJDY0MifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE5NTAyNzMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTEpLIn0=',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "bicom Lab",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Hacking_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
