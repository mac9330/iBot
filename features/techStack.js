const { BotkitConversation } = require("botkit");

module.exports = function (controller) {
  let tech = new BotkitConversation("technology", controller);

  let replies = Object.keys(controller.resume.technology);
  let quick = [];

  replies.forEach((element) => {
    quick.push({
      title: element,
      payload: element,
    });
  });

  tech.say({ type: "typing" });
  tech.addAction("tech");
  tech.addMessage(
    {
      text: "Would you like to hear about languages or frameworks",
      quick_replies: quick,
    },
    "next_thread"
  );
  tech.addAction("next_thread", "tech");

  tech.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  controller.addDialog(tech);

  controller.hears(
    [
      "technology",
      "stack",
      "code",
      "application",
      "projects",
      "sites",
      "websites",
      "website",
      "qualifications",
    ],
    "message",
    async (bot, message) => {
      await bot.beginDialog("technology");
    }
  );

  let languages = new BotkitConversation("languages", controller);
  let language = controller.resume.technology.languages.name;

  languages.say({ type: "typing" });
  languages.addAction("languages");
  languages.addMessage(
    `The programming languages I am proficient in are ${language}`,
    "next_thread"
  );
  languages.addAction("next_thread", "languages");
  languages.addMessage({ type: "typing" }, "next_thread");
  languages.addAction("middle_thread", "next_thread");
  languages.addMessage({ type: "typing" }, "languages");

  languages.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  controller.addDialog(languages);

  controller.hears("languages", "message", async (bot, message) => {
    await bot.beginDialog("languages");
    await bot.beginDialog("continuation");
  });

  let frameworks = new BotkitConversation("frameworks", controller);
  let framework = controller.resume.technology.frameworks.name;

  frameworks.say({ type: "typing" });
  frameworks.addAction("frameworks");
  frameworks.addMessage(
    `The programming frameworks I am proficient in are ${framework}`,
    "next_thread"
  );
  frameworks.addAction("next_thread", "frameworks");
  frameworks.addMessage({ type: "typing" }, "next_thread");
  frameworks.addAction("middle_thread", "next_thread");
  frameworks.addMessage({ type: "typing" }, "frameworks");

  frameworks.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  controller.addDialog(frameworks);

  controller.hears(
    ["frameworks", "react", "redux", "library"],
    "message",
    async (bot, message) => {
      await bot.beginDialog("frameworks");
      await bot.beginDialog("continuation");
    }
  );

  // job1.say({ type: "typing" });
  // job1.addAction("job1");
  // job1.addMessage(
  //   `The programming languages I am proficient in are ${languages}`,
  //   "next_thread"
  // );

  // tech.addAction("next_thread", "tech");
  // controller.hears("languages", "message", async (bot, message) => {
  //   let languages = controller.resume.technology.languages.name;
  //   await bot.reply(
  //     message,
  //     `The programming languages I am proficient in are ${languages}`
  //   );
  //   await bot.reply(
  //     message,
  //     `Link to my porfolio <a>https://danielguardado.com/</a> `
  //   );
  //   // await bot.beginDialog("languages")
  // });

  // tech.addAction("next_thread", "tech");
  // controller.hears("frameworks", "message", async (bot, message) => {
  //   let frameworks = controller.resume.technology.frameworks.name;
  //   await bot.reply(
  //     message,
  //     `The programming frameworks I am proficient in are ${frameworks}`
  //   );
  //   await bot.reply(
  //     message,
  //     `Link to my porfolio <a>https://danielguardado.com/</a> `
  //   );
  //   // await bot.beginDialog("languages")
  // });

  // controller.hears("frameworks", "message", async (bot, message) => {
  //   let frameworks = controller.resume.technology.frameworks.name;
  //   await bot.reply(
  //     message,
  //     `The programming frameworks I am proficient in are ${frameworks}`
  //   );
  //   await bot.reply(
  //     message,
  //     `Link to my porfolio <a>https://danielguardado.com/</a> `
  //   );
  //   // await bot.beginDialog("languages")
  // });

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
