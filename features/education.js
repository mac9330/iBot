const { BotkitConversation } = require("botkit");

module.exports = function (controller) {
  let education = new BotkitConversation("education", controller);

  let replies = Object.keys(controller.resume.education);
  let quick = [];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  education.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  replies.forEach((element) => {
    quick.push({
      title: controller.resume.education[element].name,
      payload: controller.resume.education[element].name,
    });
  });

  education.say({ type: "typing" });
  education.addAction("education");
  education.addMessage({
    text: "which degree/certification are you interested in?",
    quick_replies: quick,
  });

  controller.addDialog(education);

  controller.hears("education", "message", async (bot, message) => {
    await bot.beginDialog("education");
  });

  // controller.hears("University", "message", async (bot, message) => {
  //   let edu = controller.resume.education.message;
  //   await bot.addMessage({
  //     text: `During my time in University I studied
  //     ${edu.degree}`,
  //   });
  // });
  let edu = controller.resume.education;
  Object.keys(edu);

  // controller.hears();
};
