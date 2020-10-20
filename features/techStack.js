const { BotkitConversation } = require("botkit");

module.exports = function (controller) {
  let tech = new BotkitConversation("technology", controller);

  let replies = Object.keys(controller.resume.technology);
  let quick = [];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  tech.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  replies.forEach((element) => {
    quick.push({
      title: element,
      payload: element,
    });
  });

  tech.say({ type: "typing" });
  tech.addAction("tech");
  tech.addMessage({
    text: "which part of my tech stack would you like to hear about?",
    quick_replies: quick,
  });

  controller.addDialog(tech);

  // let jobDesc = new BotkitConversation("jobDesc", controller);

  // jobDesc.say({ type: "typing" });
  // jobDesc.addAction("welcome");
  // jobDesc.addMessage("Hi my name is Daniel!", "next_thread");
  // jobDesc.addAction("next_thread", "welcome");
  // jobDesc.addMessage({ type: "typing" }, "next_thread");
  // jobDesc.addAction("last_thread", "next_thread");
  // jobDesc.addMessage({ type: "typing" }, "welcome");

  // controller.hears(
  //   async (message) => message.text && message.text.toLowerCase() === "work",
  //   ["message"],
  //   async (bot, message) => {
  //     await bot.beginDialog("work");
  //   }
  // );

  controller.hears("technology", "message", async (bot, message) => {
    await bot.beginDialog("technology");
  });

  controller.hears("languages", "message", async (bot, message) => {
    let languages = controller.resume.technology.languages.name;
    await bot.reply(
      message,
      `The programming languages I am proficient in are ${languages}`
    );
    await bot.reply(
      message,
      `Link to my porfolio <a>https://danielguardado.com/</a> `
    );
    // await bot.beginDialog("languages")
  });

  // controller.hears(
  //   async (message) =>
  //     message.text && message.text.toLowerCase() === "rite aid",
  //   ["message"],
  //   // async (bot, message) => {
  //   // let role = controller.resume.work.riteAid;
  //   //   await bot.reply(message, "During my time working at Rite Aid I was a");
  //   // };
  //   async (bot, message) => {
  //     let role = controller.resume.work.riteAid;
  //     await bot.reply(
  //       message,
  //       `During my time working at Rite Aid I was a
  //       ${role.title}`
  //     );
  //     await bot.reply(
  //       message,
  //       `During my time working at Rite Aid I was a
  //       ${role.description}`
  //     );
  //     await bot.say(
  //       {
  //         text: `I worked here from ${role.timeline}`,
  //       },
  //       await setTimeout(async () => {
  //         await next();
  //       }, 3000)
  //     );
  //     await bot.beginDialog("continuation");
  //   }
  // );
};
