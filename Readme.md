# Template for a GCP Telegram Bot

This template allows an easy deployment of a telegram bot hosted on GCP cloud functions, receiving updates from Telegram by webhook

## Deployment

To deploy a new bot using this template, you need a GCP project.
Deployment is done automatically on every push to the master branch, using github actions.
The deployment workflow at `.github/workflows/deploy-to-gcp.uml` must be updated with the bot parameters.

### Authentication

The bot must be authenticated, both on GCP and on the telegram API.

Follow the telegram guide to create a new bot: https://core.telegram.org/bots#6-botfather

In order to deploy cloud functions from github, you need to create a GCP service account and give it the following roles:
- Cloud Functions Admin
- Cloud Build Service Account
- Service Account User

The following secrets must be set at the github project level:
- **GCP_SERVICE_KEY**: contains a keyfile for the GCP service account
- **BOT_TOKEN**: contains the telegram bot token

## Local testing

This bot uses nodejs and the node package manager to manage dependencies.
To install required dependencies, run `npm install`

A local nodejs server can be run for local testing.
To allow the bot to post messages, the bot token must be set as an environment variable.
Furthermore, a service account is used to access the firestore database. A key for the service account
must be downloaded and its path set as an environment variable for authentication of the local server.
```
export TOKEN=<your-bot-token>
export GOOGLE_APPLICATION_CREDENTIALS=<path-to-key-file>
```

The local server can be run with the following command:
```
node local_server.js
```

**Using local requests**

You can send mocked update to the local server by sending the following `POST` request to `localhost:8080`:

```json
{
  "update_id": 1234,
  "message": {
    "message_id": 1234,
    "from": {
      "id": <your_chat_id>,
      "is_bot": false,
      "first_name": "John",
      "last_name": "Doe",
      "username": "johndoe",
      "language_code": "en"
    },
    "chat": {
      "id": <your_chat_id>,
      "first_name": "John",
      "last_name": "Doe",
      "username": "johndoe",
      "type": "private"
    },
    "date": 1234,
    "text": "/cmd message text",
    "entities": [
        {
            "length": 4,
            "offset": 0,
            "type": "bot_command"
        }
    ]
  }
}
```

The chat id field for your telegram account can be discovered using the following method: https://www.alphr.com/find-chat-id-telegram/

You may also wish to change the text and entities parameters to test out other message formats.

**Receiving real updates**

To allow the bot to receive actual updates from telegram, the local port must be exposed on
a secured endpoint over the internet. For this I recommend using [ngrok](https://ngrok.com/).
The local endpoint must then be set as a hook to the telegram API:
```
ngrok http 8080
bash set_hook.sh <ngrok-https-endpoint> <your-bot-token>
```