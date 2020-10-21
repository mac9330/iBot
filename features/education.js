const { BotkitConversation } = require("botkit");

module.exports = function (controller) {
  const edu = controller.resume.education;
  let education = new BotkitConversation(["education"], controller);

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

  controller.hears(
    [
      "education",
      "school",
      "studies",
      "institue",
      "institution",
      "organization",
    ],
    "message",
    async (bot, message) => {
      await bot.beginDialog("education");
    }
  );

  controller.hears(
    ["App Academy", "a/A", "bootcamp", "software engineering"],
    "message",
    async (bot, message) => {
      let schoolStr = Object.values(edu)[0];
      await bot.beginDialog("school");
      await bot.beginDialog("continuation");
    }
  );

  // ! Education 1 dialog

  let school = new BotkitConversation("school", controller);
  let schoolStr = Object.keys(edu)[0]
  school.say({ type: "typing" });
  school.addAction("school");
  school.addMessage(
    `During my time at ${schoolStr} I studied ${edu.appAcademy.degree}`,
    "next_thread"
  );
  school.addAction("next_thread", "school");
  school.addMessage({ type: "typing" }, "next_thread");
  school.addAction("last_thread", "next_thread");
  school.addMessage({ type: "typing" }, "school");
  school.addMessage(
    `I studied at ${schoolStr} from ${edu.appAcademy.timeline}`,
    "last_thread"
  );

  school.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  school.before("middle_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  school.before("last_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  controller.addDialog(school);

  controller.hears(
    ["Binghamton University", "BU", "Binghamton", "University", "College"],
    "message",
    async (bot, message) => {
      schoolName = message.text;
      let schoolStr2 = Object.keys(edu)[1]
      await bot.beginDialog("schoolTwo");
      await bot.beginDialog("continuation");
    }
  );

  // ! Education 2 dialog

  let schoolTwo = new BotkitConversation("schoolTwo", controller);
  let schoolStr2 = Object.keys(edu)[1]
  schoolTwo.say({ type: "typing" });
  schoolTwo.addAction("schoolTwo");
  schoolTwo.addMessage(
    `During my time at ${schoolStr2} I studied ${edu.binghamton.degree}`,
    "next_thread"
  );
  schoolTwo.addAction("next_thread", "schoolTwo");
  schoolTwo.addMessage({ type: "typing" }, "next_thread");
  schoolTwo.addAction("last_thread", "next_thread");
  schoolTwo.addMessage({ type: "typing" }, "schoolTwo");
  schoolTwo.addMessage(
    `I studied at ${schoolStr2} from ${edu.binghamton.timeline}`,
    "last_thread"
  );

  schoolTwo.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  schoolTwo.before("middle_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  schoolTwo.before("last_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });
  controller.addDialog(schoolTwo);
};
