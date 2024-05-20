const app = require("#configs/app");
const openAICommand = require("#configs/openai");
const { appLogger: logger, slackbotLogger } = require("#configs/logger");
const { WebClient } = require("@slack/web-api");

const web = new WebClient(process.env.SLACK_BOT_TOKEN);

app.message(async ({ event, say }) => {
  logger.debug("Received message", event);

  try {
    const userId = event.user;

    // Fetch user's profile information
    const userInfo = await web.users.info({ user: userId });
    const userName = userInfo.user.profile.real_name || userInfo.user.name;

    const userMessage = event.text;

    // Log the user's message with the username
    slackbotLogger.info(`User (${userName}): ${userMessage}`);

    const answer = await openAICommand.chat(userId, userMessage, {
      user: userId,
    });

    await say(answer);

    // Log the bot's response
    slackbotLogger.info(`Bot: ${answer}`);

    logger.debug("Message processing completed");
  } catch (error) {
    logger.error(error);

    await say("Oops, something went wrong 😭. Please try again later.");
  }
});
