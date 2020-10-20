const { BotkitConversation } = require("botkit");

module.exports = function (controller) {
  let contact = new BotkitConversation("contact", controller);
  let resumeContact = controller.resume.contact;

  contact.say({ type: "typing" });
  contact.addAction("contact");
  contact.addMessage(`My email is ${resumeContact.email}`, "next_thread");
  contact.addAction("next_thread", "contact");
  contact.addMessage({ type: "typing" }, "next_thread");
  contact.addAction("middle_thread", "next_thread");
  contact.addMessage({ type: "typing" }, "contact");
  contact.addMessage(
    `My phone number is ${resumeContact.phone}`,
    "middle_thread"
  );
  contact.addAction("middle_thread", "contact");
  contact.addMessage({ type: "typing" }, "middle_thread");
  contact.addAction("last_thread", "middle_thread");
  contact.addMessage({ type: "typing" }, "contact");
  contact.addMessage(
    `My linkedIn is <a href=${resumeContact.social}>${resumeContact.social}</a>`,
    "last_thread"
  );

  contact.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  contact.before("middle_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  contact.before("last_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });
  // convo.after(async (results, bot) => {
  //   // handle results.name, results.age, results.color
  // });

  controller.addDialog(contact);

  controller.hears("contact", "message", async (bot, message) => {
    await bot.beginDialog("contact");
    await bot.beginDialog("continuation");
  });
};
