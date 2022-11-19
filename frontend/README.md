### Running the frontend locally with Telegram OAuth Login

Telegram OAuth requires a domain to work properly. The following are some instructions on how you can test this out locally on your machine:

#### Telegram setup

1. Create a Telegram bot via @BotFather on Telegram (instructions [here](https://core.telegram.org/bots#3-how-do-i-create-a-bot))
2. Set the `OAUTH_TELEGRAM_BOT_TOKEN` environment variable in the backend
3. Set the `REACT_APP_TELEGRAM_OAUTH_BOT_USERNAME` environment variable in the frontend

#### ngrok tunnelling setup

1. Install ngrok and configure your ngrok auth token (instructions [here](https://dashboard.ngrok.com/get-started/setup))
2. Run `ngrok http 3000` to start the tunnel (you will be exposing your local machine port to the internet at the given URL)
3. On Telegram's @BotFather, run the `/setdomain` command. Select the corresponding bot in the 'Telegram setup' section above and paste the URL received when running step 2.
4. Access your local machine deployment via the URL received in step 2. The Telegram login widget should appear as a button.
