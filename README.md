# AIChat-DiscordBOT
GroqCloudのAPIを使用したAI搭載DiscordBOT
# TOKEN取得
DiscordのToken<br>
https://discord.com/developers/applications<br>
GroqCloudのAPIキー<br>
https://console.groq.com/keys
# 起動
package.jsonの作成と、必要なパッケージのインストール
```
npm init -y
npm i discord.js dotenv groq-sdk
```
envファイルにTokenをいれる
```
TOKEN= DiscordBOTのToken
CLIENT_ID= BOTのID
GROQ_API_KEY= groqのAPIキー
```
起動
```
node index.js
```
# ディレクトリ構造
```
groqBOT/
├── index.js
├── ai/
│   └── groq.js
│   └── response.js
│   └── statuscode.js
├── events/
│   ├── Events-ClientReady.js
│   └── Events-InteractionCreate.js
│   └── Events-MessageCreate.js
│   └── rest.js
├── slashcommands/
│   └── ping.js
│   └── help.js
│   └── ai-channel.js
├── package.json
├── config.json
└── .env
```
