const { BotkitConversation } = require("botkit");

module.exports = function (controller) {
  let work = new BotkitConversation("work", controller);

  let replies = Object.keys(controller.resume.work);
  let quick = [];

  replies.forEach((element) => {
    quick.push({
      title: controller.resume.work[element].name,
      payload: controller.resume.work[element].name,
    });
  });

  work.say({ type: "typing" });
  work.addAction("work");
  work.addMessage(
    {
      text: "Which job would you like to know about.",
      quick_replies: quick,
    },
    "next_thread"
  );
  work.addAction("next_thread", "work");

  work.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  controller.addDialog(work);

  controller.hears(
    [
      "work",
      "career",
      "experience",
      "job",
      "background",
      "professional",
      "business",
      "trade",
      "postion",
    ],
    "message",
    async (bot, message) => {
      await bot.beginDialog("work");
    }
  );

  // ! Work ^^
  // ! Job1 dialog

  let job1 = new BotkitConversation("job1", controller);
  let resumeJob = controller.resume.work;

  job1.say({ type: "typing" });
  job1.addAction("job1");
  job1.addMessage(
    `During my time at ${resumeJob.job1.name} i was an ${resumeJob.job1.title}.`,
    "next_thread"
  );
  job1.addAction("next_thread", "job1");
  job1.addMessage({ type: "typing" }, "next_thread");
  job1.addAction("middle_thread", "next_thread");
  job1.addMessage({ type: "typing" }, "job1");
  job1.addMessage(
    `At ${resumeJob.job1.name} I ${resumeJob.job1.description}`,
    "middle_thread"
  );
  job1.addAction("middle_thread", "job1");
  job1.addMessage({ type: "typing" }, "middle_thread");
  job1.addAction("last_thread", "middle_thread");
  job1.addMessage({ type: "typing" }, "job1");
  job1.addMessage(
    `I worked here from ${resumeJob.job1.timeline}`,
    "last_thread"
  );

  job1.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  job1.before("middle_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  job1.before("last_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  controller.addDialog(job1);

  controller.hears(resumeJob.job1.name, "message", async (bot, message) => {
    await bot.beginDialog("job1");
    await bot.beginDialog("continuation");
  });

  // ! Job2 dialog

  let job2 = new BotkitConversation("job2", controller);

  job2.say({ type: "typing" });
  job2.addAction("job2");
  job2.addMessage(
    `During my time at ${resumeJob.job2.name} I was a ${resumeJob.job2.title}`,
    "next_thread"
  );
  job2.addAction("next_thread", "job2");
  job2.addMessage({ type: "typing" }, "next_thread");
  job2.addAction("middle_thread", "next_thread");
  job2.addMessage({ type: "typing" }, "job2");
  job2.addMessage(
    `At ${resumeJob.job2.name} I ${resumeJob.job2.description}`,
    "middle_thread"
  );
  job2.addAction("middle_thread", "job2");
  job2.addMessage({ type: "typing" }, "middle_thread");
  job2.addAction("last_thread", "middle_thread");
  job2.addMessage({ type: "typing" }, "job2");
  job2.addMessage(
    `I worked here from ${resumeJob.job2.timeline}`,
    "last_thread"
  );

  job2.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  job2.before("middle_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  job2.before("last_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  controller.addDialog(job2);

  controller.hears(resumeJob.job2.name, "message", async (bot, message) => {
    await bot.beginDialog("job2");
    await bot.beginDialog("continuation");
  });
};
