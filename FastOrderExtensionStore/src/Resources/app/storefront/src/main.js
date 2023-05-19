import FastorderPlugin from './fastorder/fastorder.storefront'

const PluginManager = window.PluginManager
PluginManager.register('FastorderPlugin', FastorderPlugin, '[data-fastorder]')
