function ShieldApiHandler() {

    this.handleMessage = function(msg, node, iotIShield) {

        var switchValue = msg.payload.api ? msg.payload.api : config.apisShield;
        switch (switchValue) {
            case 'createShield':
                iotIShield.createShield(msg.payload.shield, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getShieldsPerId':
                iotIShield.getShieldsPerId(msg.payload.shieldId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getShieldsPerUser':
                iotIShield.getShieldsPerUser(msg.payload.username, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getShieldsPerUUID':
                iotIShield.getShieldsPerUUID(msg.payload.uuid, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteShieldPerId':
                iotIShield.deleteShieldPerId(msg.payload.shieldId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteAllShields':
                iotIShield.deleteAllShields(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteShieldAttribute':
                iotIShield.deleteShieldAttribute(msg.payload.shieldId, msg.payload.attributeName, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'setShieldAttribute':
                iotIShield.setShieldAttribute(msg.payload.shieldId, msg.payload.attributeName, msg.payload.attributeValue, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getAllShields':
                iotIShield.getAllShields(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShield',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShield',
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

module.exports = ShieldApiHandler;