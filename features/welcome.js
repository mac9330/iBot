const { BotkitConversation } = require("botkit");
const typing = require("./typing");

module.exports = function (controller) {
  const replies = [
    {
      title: 'Hello',
      payload: 'hello'
    },
    {
      title: 'Help',
      payload: 'help'
    },
  ]

  let convo = new BotkitConversation("welcome", controller);

  convo.say({ type: "typing" })
  convo.addAction("welcome")
  convo.addMessage("Hi my name is Daniel!", "next_thread")
  convo.addAction("next_thread", "welcome")
  convo.addMessage({ type: "typing" }, "next_thread")
  convo.addAction("last_thread", "next_thread")
  convo.addMessage({ type: "typing" }, "welcome")
  convo.addMessage({
    text: "what do you want to know?", quick_replies: replies
  }, "last_thread")

  convo.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500)
    })
  });

  convo.before("last_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500)
    })
  });

  controller.addDialog(convo);

  controller.on("hello", async (bot, message) => {
    await bot.beginDialog("welcome");
  });

}

