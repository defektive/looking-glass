

let hooks = {
  beforeSendRequest: [
    function (requestDetail) {
      return new Promise((resolve, reject) => {
        let requestOptions = requestDetail.requestOptions;
        requestOptions.headers['User-Agent'] += ' DFKT/1';

        resolve({requestOptions});
      });
    },
  ],

  beforeSendResponse: [
    function (requestDetail, responseDetail, modifiedResponse) {
      modifiedResponse.response = responseDetail.response;
      if (modifiedResponse.response.body.indexOf('<head>') !== -1) {
        modifiedResponse.response.body = modifiedResponse.response.body.toString().replace('<head>', '<head><script>console.log("dfkt loaded")</script>');
      }
    },
  ],
}

async function handleBeforeSendHooks(requestDetail, resolve, reject) {
  const promises = hooks.beforeSendRequest.map(hook => hook(requestDetail));
  let results = await Promise.all(promises);

  resolve(Object.assign.apply({}, results));
}

const rules = {

  summary: 'DFKT rules for web testing',

  *beforeSendRequest(requestDetail) {
    return new Promise((resolve, reject) => {
      handleBeforeSendHooks(requestDetail, resolve, reject);
    });
  },

  // deal response before send to client
  *beforeSendResponse(requestDetail, responseDetail) {
    let responseDetailModifications = {};
    for (let hook in hooks.beforeSendResponse) {
      hooks.beforeSendResponse[hook](requestDetail, responseDetail, responseDetailModifications);
    }

    return responseDetailModifications;
  },

  // // if deal https request
  // *beforeDealHttpsRequest(requestDetail) {
  //
  // },
  // error happened when dealing requests
  *onError(requestDetail, error) {

  },

  // error happened when connect to https server
  *onConnectError(requestDetail, error) {

  }
};

let proxyServer;
const patch = function (ps) {
  proxyServer = ps;
}

module.exports = {
  patch,
  hooks,
  rules
}
