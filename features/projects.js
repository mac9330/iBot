const { BotkitConversation } = require("botkit");

module.exports = function (controller) {
  let projects = new BotkitConversation("projects", controller);

  let replies = Object.keys(controller.resume.projects);
  let quick = [];

  replies.forEach((element) => {
    quick.push({
      title: controller.resume.projects[element].name,
      payload: controller.resume.projects[element].name,
    });
  });

  projects.say({ type: "typing" });
  projects.addAction("projects");
  projects.addMessage(
    {
      text: "Which project would you like to know about?",
      quick_replies: quick,
    },
    "next_thread"
  );
  projects.addAction("next_thread", "projects");

  projects.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  controller.addDialog(projects);

  controller.hears("projects", "message", async (bot, message) => {
    await bot.beginDialog("projects");
  });

  // ! Projects ^^
  // ! Project1 dialog

  let project1 = new BotkitConversation("project1", controller);
  let resumeProjects = controller.resume.projects;

  project1.say({ type: "typing" });
  project1.addAction("project1");
  project1.addMessage(
    `I built ${resumeProjects.project1.name} using ${resumeProjects.project1.technologies}`,
    "next_thread"
  );
  project1.addAction("next_thread", "project1");
  project1.addMessage({ type: "typing" }, "next_thread");
  project1.addAction("middle_thread", "next_thread");
  project1.addMessage({ type: "typing" }, "project1");
  project1.addMessage(
    `<img src=${resumeProjects.project1.pic}/>`,
    "middle_thread"
  );
  project1.addAction("middle_thread", "project1");
  project1.addMessage({ type: "typing" }, "middle_thread");
  project1.addAction("last_thread", "middle_thread");
  project1.addMessage({ type: "typing" }, "project1");
  project1.addMessage(
    `Here's a link to my project <a href="${resumeProjects.project1.link}">${resumeProjects.project1.link}</a>`,
    "last_thread"
  );

  project1.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  project1.before("middle_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  project1.before("last_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  controller.addDialog(project1);

  controller.hears(
    resumeProjects.project1.name,
    "message",
    async (bot, message) => {
      await bot.beginDialog("project1");
      await bot.beginDialog("continuation");
    }
  );

  let project2 = new BotkitConversation("project2", controller);

  project2.say({ type: "typing" });
  project2.addAction("project2");
  project2.addMessage(
    `I built ${resumeProjects.project2.name} using ${resumeProjects.project2.technologies}`,
    "next_thread"
  );
  project2.addAction("next_thread", "project2");
  project2.addMessage({ type: "typing" }, "next_thread");
  project2.addAction("middle_thread", "next_thread");
  project2.addMessage({ type: "typing" }, "project2");
  project2.addMessage(
    `<img src=${resumeProjects.project2.pic}/>`,
    "middle_thread"
  );
  project2.addAction("middle_thread", "project2");
  project2.addMessage({ type: "typing" }, "middle_thread");
  project2.addAction("last_thread", "middle_thread");
  project2.addMessage({ type: "typing" }, "project2");
  project2.addMessage(
    `Here's a link to my project <a href="${resumeProjects.project2.link}">${resumeProjects.project2.link}</a>`,
    "last_thread"
  );

  project2.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  project2.before("middle_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  project2.before("last_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  controller.addDialog(project2);

  controller.hears(
    resumeProjects.project2.name,
    "message",
    async (bot, message) => {
      await bot.beginDialog("project2");
      await bot.beginDialog("continuation");
    }
  );

  let project3 = new BotkitConversation("project3", controller);

  project3.say({ type: "typing" });
  project3.addAction("project3");
  project3.addMessage(
    `I built ${resumeProjects.project3.name} using ${resumeProjects.project3.technologies}`,
    "next_thread"
  );
  project3.addAction("next_thread", "project3");
  project3.addMessage({ type: "typing" }, "next_thread");
  project3.addAction("middle_thread", "next_thread");
  project3.addMessage({ type: "typing" }, "project3");
  project3.addMessage(
    `<img src=${resumeProjects.project3.pic}/>`,
    "middle_thread"
  );
  project3.addAction("middle_thread", "project3");
  project3.addMessage({ type: "typing" }, "middle_thread");
  project3.addAction("last_thread", "middle_thread");
  project3.addMessage({ type: "typing" }, "project3");
  project3.addMessage(
    `Here's a link to my project <a href="${resumeProjects.project3.link}">${resumeProjects.project3.link}</a>`,
    "last_thread"
  );

  project3.before("next_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  project3.before("middle_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  project3.before("last_thread", async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  });

  controller.addDialog(project3);

  controller.hears(
    resumeProjects.project3.name,
    "message",
    async (bot, message) => {
      await bot.beginDialog("project3");
      await bot.beginDialog("continuation");
    }
  );
};
