const { BotkitConversation } = require("botkit");
const typing = require("./typing");

module.exports = function (controller) {
  let convo = new BotkitConversation("welcome", controller);
  // send a greeting
  // convo.addAction("typing");

  // convo.addMessage({ type: "typing" }, "typing");

  // convo.addAction("next_thread", "typing");

  convo.say("Hi my name is Daniel!", "next_thread");

  convo.addAction("typing1");

  convo.addMessage({ type: "typing" }, "typing1");

  convo.addAction("next_thread1", "typing1");

  convo.addMessage("What would you like to know about me?", "next_thread1");

  convo.before("next_thread", async () => {
    return new Promise((resolve) => {
      // simulate some long running process
      setTimeout(resolve, 3000);
    });
  });

  convo.before("next_thread1", async () => {
    return new Promise((resolve) => {
      // simulate some long running process
      setTimeout(resolve, 2000);
    });
  });

  controller.addDialog(convo);

  controller.on("hello", async (bot, message) => {
    await bot.beginDialog("welcome");
  });

  controller.hears("hello", "message", async (bot, message) => {
    await bot.beginDialog("welcome");
  });
};

// let iBot = new BotkitConversation("welcome", controller);

// iBot.say({ type: "typing" });
// iBot.addAction("welcome");

// iBot.addMessage("Hello i am iBot", "next_action");
// iBot.addAction("next_action", "welcome");
// iBot.addMessage({ type: "typing" }, "next_action");
// iBot.addAction("last_thread", "next_action");

// iBot.addMessage({ type: "typing" }, "welcome");

// iBot.addMessage(
//   {
//     text: "What you want b",
//     quick_replies: "hi",
//   },
//   "last_thread"
// );

// iBot.before("next_thread", async () => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 1500);
//   });
// });
// iBot.before("last_thread", async () => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 1500);
//   });
// });
// controller.on("testing", async (bot, message) => {
//   // await bot.beginDialog("welcome");
//   bot.say("hello");
// });
