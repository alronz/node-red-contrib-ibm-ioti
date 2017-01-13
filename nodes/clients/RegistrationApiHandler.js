function RegistrationApiHandler() {

    this.handleMessage = function(msg, node, iotIRegistration) {

        var switchValue = msg.payload.api ? msg.payload.api : config.apisRegistration;
        switch (switchValue) {
            case 'createRegistrationDevice':
                iotIRegistration.createRegistrationDevice(msg.payload.device, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIRegistration',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIRegistration',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getRegistrationDevicePerId':
                iotIRegistration.getRegistrationDevicePerId(msg.payload.deviceId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIRegistration',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIRegistration',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getRegistrationsPerUser':
                iotIRegistration.getRegistrationsPerUser(msg.payload.username, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIRegistration',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIRegistration',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getRegistrationsPerProvider':
                iotIRegistration.getRegistrationsPerProvider(msg.payload.provider, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIRegistration',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIRegistration',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteRegistrationPerDeviceId':
                iotIRegistration.deleteRegistrationPerDeviceId(msg.payload.deviceId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIRegistration',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIRegistration',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'updateRegistrationDevice':
                iotIRegistration.updateRegistrationDevice(msg.payload.deviceId, msg.payload.newDevice, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIRegistration',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIRegistration',
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

module.exports = RegistrationApiHandler;