const PROXY_CONFIG = {
  "/farmen": {
    "target": "http://vl-farmenutv01:8080/",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
    "bypass": function (req, res, proxyOptions) {
      if (req.headers.accept.indexOf("html") !== -1) {
        console.log("Skipping proxy for browser request.");
        return "/hemsida.html";
      }
      req.headers["X-USERID"] = "MNIL";
    }
  }
}

module.exports = PROXY_CONFIG;
