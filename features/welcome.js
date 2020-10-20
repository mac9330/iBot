const { BotkitConversation } = require("botkit");

module.exports = function (controller) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let replies = Object.keys(controller.resume);
  let quick = [];

  replies.forEach((element) => {
    quick.push({ title: capitalizeFirstLetter(element), payload: element });
  });

  let convo = new BotkitConversation("welcome", controller);

  let name = "Daniel Guardado";

  convo.say({ type: "typing" });
  convo.addAction("welcome");
  convo.addMessage(
    `Hi my name is ${name} and I am currently looking for a job!`,
    "next_thread"
  );
  convo.addAction("next_thread", "welcome");
  convo.addMessage({ type: "typing" }, "next_thread");
  convo.addAction("last_thread", "next_thread");
  convo.addMessage({ type: "typing" }, "welcome");
  convo.addMessage(
    {
      text: "What would you like to know about me?",
      quick_replies: quick,
    },
    "last_thread"
  );

  convo.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  convo.before("last_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  controller.addDialog(convo);

  controller.on("hello", async (bot, message) => {
    await bot.beginDialog("welcome");
  });
};
