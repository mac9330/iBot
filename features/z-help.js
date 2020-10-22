

module.exports = (controller) => {
    resume = controller.resume;
    const Keys = Object.keys(resume).filter((field) => resume[field].toString());
    const resumeKeys =
        `${Keys.slice(0, Keys.length - 2).join(", ")} or ${Keys[Keys.length - 1]}`

    controller.hears(new RegExp(/.*help.*/i), ['message', 'direct_message'], async function (bot, message) {

        await bot.reply(message, `Ask me anything you'd like to know about me, such as ${resumeKeys}`);
    });

    controller.hears(new RegExp(/.*/i), ['message', 'direct_message'], async function (bot, message) {

        await bot.reply(message, `I'm sorry, I didn't understand that. However I can anwser questions related to ${resumeKeys}?`);

    });
}