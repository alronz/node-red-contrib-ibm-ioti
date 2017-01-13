function JSCodeApiHandler() {

    this.handleMessage = function(msg, node, iotIJSCode) {

        var switchValue = msg.payload.api ? msg.payload.api : config.apisJSCode;
        switch (switchValue) {
            case 'createJSCode':
                iotIJSCode.createJSCode(msg.payload.jsCode, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'updateAll':
                iotIJSCode.updateAll(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getJSCodesPerShieldUUUID':
                iotIJSCode.getJSCodesPerShieldUUUID(msg.payload.shieldUUUID, msg.payload.queryParams, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getCommonJSCodes':
                iotIJSCode.getCommonJSCodes(msg.payload.queryParams, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getAllJSCodes':
                iotIJSCode.getAllJSCodes(msg.payload.queryParams, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getJSCodesPerUser':
                iotIJSCode.getJSCodesPerUser(msg.payload.username, msg.payload.queryParams, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'updateJSCode':
                iotIJSCode.updateJSCode(msg.payload.jsCodeId, msg.payload.code, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIJSCode',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            default:
                node.error("No matched API");
                break;
        }
    }

}

module.exports = JSCodeApiHandler;