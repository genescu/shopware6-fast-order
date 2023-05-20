import FastorderPlugin from './fastorder/index'

const PluginManager = window.PluginManager
PluginManager.register('FastorderPlugin', FastorderPlugin, '[data-fastorder]')
