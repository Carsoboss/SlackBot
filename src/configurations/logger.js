const log4js = require("log4js");
const env = require("./env");

log4js.configure({
  appenders: {
    console: { type: "console" },
    appFile: { type: "file", filename: "app.log" }, // App log file appender
    slackbotFile: { type: "file", filename: "slackbot-responses.log" }, // Slackbot responses log file appender
  },
  categories: {
    default: {
      appenders: ["console", "appFile"], // Default category for app logs
      level: env.logLevel,
    },
    slackbot: {
      appenders: ["console", "slackbotFile"], // Slackbot responses category
      level: env.logLevel,
    },
  },
});

module.exports = {
  log4js,
  appLogger: log4js.getLogger("app"),
  slackbotLogger: log4js.getLogger("slackbot"),
};
