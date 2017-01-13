function GlobalApiHandler() {

    this.handleMessage = function(msg, node, iotIGlobal) {

        var switchValue = msg.payload.api ? msg.payload.api : config.apisGlobal;
        switch (switchValue) {
            case 'sendPayloadToMQTT':
                iotIGlobal.sendPayloadToMQTT(msg.payload.outputType, msg.payload.deviceType, msg.payload.deviceId, msg.payload.type, msg.payload.payload, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIGlobal',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIGlobal',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'sendPushNotification':
                iotIGlobal.sendPushNotification(msg.payload.pushNotification, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIGlobal',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIGlobal',
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

module.exports = GlobalApiHandler;