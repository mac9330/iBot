//  __   __  ___        ___
// |__) /  \  |  |__/ |  |
// |__) \__/  |  |  \ |  |

// This is the main file for the iBot bot.

// Import Botkit's core features
const { Botkit } = require("botkit");
const { BotkitCMSHelper } = require("botkit-plugin-cms");

// Import a platform-specific adapter for web.

const { WebAdapter } = require("botbuilder-adapter-web");

const { MongoDbStorage } = require("botbuilder-storage-mongodb");

// Load process.env values from .env file
require("dotenv").config();

let storage = null;
if (process.env.MONGO_URI) {
  storage = mongoStorage = new MongoDbStorage({
    url: process.env.MONGO_URI,
  });
}

const adapter = new WebAdapter({});

const controller = new Botkit({
  webhook_uri: "/api/messages",

  adapter: adapter,

  storage,
  debug: false,
  replyWithTyping: true,
  studio_token: process.env.studio_token,
  typingDelayFactor: 3.0,
});

// var controller = Botkit.anywhere({
//   debug: false,
//   replyWithTyping: true,
//   studio_token: process.env.studio_token,
//   typingDelayFactor: 1.3,
// });

if (process.env.CMS_URI) {
  controller.usePlugin(
    new BotkitCMSHelper({
      uri: process.env.CMS_URI,
      token: process.env.CMS_TOKEN,
    })
  );
}

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // load traditional developer-created local custom feature modules
  controller.loadModules(__dirname + "/features");

  /* catch-all that uses the CMS to trigger dialogs */
  if (controller.plugins.cms) {
    // controller.on("conversationStarted", async (bot, message) => {
    //   await console.log("hi");
    // });
    // controller.on("hello")
    // controller.trigger("welcome");

    // controller.trigger("my_custom_event", bot, message);

    // handle the custom event
    // controller.on('my_custom_event', async (bot, message) => {
    //     await bot.beginDialog("welcome");
    // });

    // controller.on("testing", )
    // controller.on("hello", async (bot, message) => {
    //   await bot.beginDialog(convo);
    // });

    controller.on("message,direct_message", async (bot, message) => {
      let results = false;
      results = await controller.plugins.cms.testTrigger(bot, message);

      if (results !== false) {
        // do not continue middleware!
        return false;
      }
    });
  }
});
