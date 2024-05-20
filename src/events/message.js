const app = require("#configs/app");
const { WebClient } = require("@slack/web-api");
const { appLogger: logger, responseLogger } = require("#configs/logger");
const openAICommand = require("#configs/openai");
const env = require("#configs/env");

const slackClient = new WebClient(env.slack.botToken); // Ensure this uses the Bot User OAuth Token
const userCache = {};

async function getUserInfo(userId) {
  if (userCache[userId]) {
    return userCache[userId];
  }

  try {
    const result = await slackClient.users.info({ user: userId });
    logger.info(`Fetched user info: ${JSON.stringify(result)}`);

    if (!result.ok) {
      throw new Error(`Error fetching user info: ${result.error}`);
    }

    const userInfo = {
      id: userId,
      name: result.user.real_name || result.user.name,
    };

    userCache[userId] = userInfo;
    return userInfo;
  } catch (error) {
    logger.error(`Error fetching user info for ${userId}: ${error.message}`);
    logger.error(`Full error: ${JSON.stringify(error, null, 2)}`);
    return { id: userId, name: "Unknown User" };
  }
}

app.message(async ({ event, say }) => {
  const userId = event.user;
  const userInfo = await getUserInfo(userId);

  responseLogger.info(
    `Received message from ${userInfo.name} (${userInfo.id}): ${event.text}`
  );

  try {
    const answer = await openAICommand.chat(userId, event.text, {
      user: userId,
    });

    responseLogger.info(
      `Response to ${userInfo.name} (${userInfo.id}): ${answer}`
    );

    await say(answer);
    logger.debug("Message completed");
  } catch (error) {
    logger.error(error);

    const errorMessage =
      "Oops, something went wrong 😭. Please try again later.";

    responseLogger.info(
      `Response to ${userInfo.name} (${userInfo.id}): ${errorMessage}`
    );

    await say(errorMessage);
  }
});

module.exports = app;
