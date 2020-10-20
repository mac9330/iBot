const { BotkitConversation } = require("botkit");

module.exports = function (controller) {
  let work = new BotkitConversation("work", controller);

  let replies = Object.keys(controller.resume.work);
  let quick = [];

  work.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  replies.forEach((element) => {
    quick.push({
      title: controller.resume.work[element].name,
      payload: controller.resume.work[element].name,
    });
  });

  work.say({ type: "typing" });
  work.addAction("work");
  work.addMessage({
    text: "which job would you like to know about.",
    quick_replies: quick,
  });

  controller.addDialog(work);

  controller.hears("work", "message", async (bot, message) => {
    await bot.beginDialog("work");
  });

  controller.hears(
    async (message) =>
      message.text && message.text.toLowerCase() === "rite aid",
    ["message"],
    async (bot, message) => {
      let role = controller.resume.work.riteAid;
      await bot.reply(
        message,
        `During my time working at Rite Aid I was a 
        ${role.title}`
      );
      await bot.reply(
        message,
        `During my time working at Rite Aid I was a 
        ${role.description}`
      );
      await bot.reply(message, `I worked here from ${role.timeline}`);
      await bot.beginDialog("continuation");
    }
  );

  controller.hears(
    async (message) =>
      message.text && message.text.toLowerCase() === "spot with theratalk",
    ["message"],
    async (bot, message) => {
      let role = controller.resume.work.riteAid;
      await bot.reply(
        message,
        `During my time working at Spot with TheraTalk I was a 
        ${role.title}`
      );
      await bot.reply(
        message,
        `During my time working at Spot with TheraTalk I was a 
        ${role.description}`
      );
      await bot.reply(message, `I worked here from ${role.timeline}`);
      await bot.beginDialog("continuation");
    }
  );
};
