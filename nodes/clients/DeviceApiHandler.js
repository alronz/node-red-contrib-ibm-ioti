function DeviceApiHandler() {

    this.handleMessage = function(msg, node, iotIDevice) {

        var switchValue = msg.payload.api ? msg.payload.api : config.apisDevice;
        switch (switchValue) {
            case 'createDevice':
                iotIDevice.createDevice(msg.payload.device, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getDevicesPerId':
                iotIDevice.getDevicesPerId(msg.payload.deviceId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getDevicesForAuthUser':
                iotIDevice.getDevicesForAuthUser(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteDevicePerId':
                iotIDevice.deleteDevicePerId(msg.payload.deviceId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteDeviceAttribute':
                iotIDevice.deleteDeviceAttribute(msg.payload.deviceId, msg.payload.attributeName, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'setDeviceAttribute':
                iotIDevice.setDeviceAttribute(msg.payload.deviceId, msg.payload.attributeName, msg.payload.attributeValue, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)
                        });
                    }
                });
                break;
            case 'getAllDevices':
                iotIDevice.getAllDevices(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)
                        });
                    }
                });
                break;
            case 'getDevicesPerUser':
                iotIDevice.getDevicesPerUser(msg.payload.username, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'updateDevice':
                iotIDevice.updateDevice(msg.payload.deviceId, msg.payload.newDevice, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIDevice',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIDevice',
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


module.exports = DeviceApiHandler;