import FastorderPlugin from "./fastorder/fastorder.plugin";

const PluginManager = window.PluginManager;
PluginManager.register('FastorderPlugin', FastorderPlugin, '[data-fastorder]');

