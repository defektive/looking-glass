
const LookingGlass = require('./api/app');
const AnyProxy = require('./anyproxy/proxy');
const options = {
  port: 8080,
  rule: LookingGlass.rules,
  webInterface: {
    enable: true,
    webPort: 8002
  },
  throttle: 10000,
  forceProxyHttps: true,
  wsIntercept: true,
  silent: false
};

global._dirtyHack = {
  interactiveIntercept: false,
  interceptedRequests: {}
}

const proxyServer = new AnyProxy.ProxyServer(options);
proxyServer.on('ready', () => { console.log('ready')});
proxyServer.on('error', (e) => { console.error(e) });
proxyServer.start();

LookingGlass.patch(proxyServer)
