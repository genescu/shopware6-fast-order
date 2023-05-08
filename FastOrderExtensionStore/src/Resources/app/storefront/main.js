import FastorderPlugin from "./src/fastorder/fastorder.plugin";

const PluginManager = window.PluginManager;
PluginManager.register('FastorderPlugin', FastorderPlugin, '[data-fastorder-plugin]');
console.log("FastorderPlugin init");
