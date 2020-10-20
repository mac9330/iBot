const { BotkitConversation } = require("botkit");

module.exports = function (controller) {
  let state = {
    schoolName: "App Academy",
    eduObj: {
      name: "App Academy",
      degree: "We did things",
      timeline: "April 2020 - July 2020",
    },
  };
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

  controller.hears("App Academy", "message", async (bot, message) => {
    state.schoolName = message.text;
    let schoolStr = message.text
      .split(" ")
      .map((word, idx) => {
        word =
          idx === 0
            ? word.toLowerCase()
            : word[0].toUpperCase() + word.slice(1);
        return word;
      })
      .join("");
    state.eduObj = controller.resume.education[schoolStr];
    await bot.beginDialog("school");
    await bot.beginDialog("continuation");
  });

  // ! Education 1 dialog

  let school = new BotkitConversation("school", controller);

  school.say({ type: "typing" });
  school.addAction("school");
  console.log(state);
  school.addMessage(
    `During my time at ${state.schoolName} I studied ${state.eduObj.degree}`,
    "next_thread"
  );
  school.addAction("next_thread", "school");
  school.addMessage({ type: "typing" }, "next_thread");
  school.addAction("last_thread", "next_thread");
  school.addMessage({ type: "typing" }, "school");
  school.addMessage(
    `I studied here from ${state.eduObj.timeline}`,
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
    "Nassau Community College",
    "message",
    async (bot, message) => {
      state.schoolName = message.text;
      let schoolStr = message.text
        .split(" ")
        .map((word, idx) => {
          word =
            idx === 0
              ? word.toLowerCase()
              : word[0].toUpperCase() + word.slice(1);
          return word;
        })
        .join("");
      state.eduObj = controller.resume.education[schoolStr];
      await bot.beginDialog("schoolTwo");
      await bot.beginDialog("continuation");
    }
  );

  // ! Education 2 dialog

  let schoolTwo = new BotkitConversation("schoolTwo", controller);

  schoolTwo.say({ type: "typing" });
  schoolTwo.addAction("schoolTwo");
  console.log(state);
  schoolTwo.addMessage(
    `During my time at Nassau Community College I studied English Lit`,
    "next_thread"
  );
  schoolTwo.addAction("next_thread", "schoolTwo");
  schoolTwo.addMessage({ type: "typing" }, "next_thread");
  schoolTwo.addAction("last_thread", "next_thread");
  schoolTwo.addMessage({ type: "typing" }, "schoolTwo");
  schoolTwo.addMessage(`I studied here from 2014-2018`, "last_thread");

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
