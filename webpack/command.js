const command = process.argv[process.argv.length - 1];
// 获取指令
module.exports = {
    isDev: command.startsWith("dev"),
    isPro: command.startsWith("build"),
    isProDev: command.startsWith("build-dev"),
    isAnalysis: command.includes("analysis"),
    isLib: command.startsWith("lib"),
};
