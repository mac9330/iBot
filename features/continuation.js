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

  let continuation = new BotkitConversation("continuation", controller);

  continuation.say({ type: "typing" });
  continuation.addAction("continuation");
  continuation.addMessage(
    {
      text: "What else would you like to know about me?",
      quick_replies: quick,
    },
    "next_thread"
  );
  continuation.addAction("next_thread", "continuation");
  continuation.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });
  controller.addDialog(continuation);
};
