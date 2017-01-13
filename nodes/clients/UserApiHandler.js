function UserApiHandler() {

    this.handleMessage = function(msg, node, iotIUser) {

        var switchValue = msg.payload.api ? msg.payload.api : config.apisUser;
        switch (switchValue) {
            case 'createUser':
                iotIUser.createUser(msg.payload.user, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getAuthUser':
                iotIUser.getAuthUser(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'checkUserLogin':
                iotIUser.checkUserLogin(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)
                        });
                    }
                });
                break;
            case 'checkUserLogout':
                iotIUser.checkUserLogout(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteUserPerUserName':
                iotIUser.deleteUserPerUserName(msg.payload.username, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteUserAttribute':
                iotIUser.deleteUserAttribute(msg.payload.userName, msg.payload.attributeName, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'setUserAttribute':
                iotIUser.setUserAttribute(msg.payload.userName, msg.payload.attributeName, msg.payload.attributeValue, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'setUserAccessLevel':
                iotIUser.setUserAccessLevel(msg.payload.userName, msg.payload.accessLevel, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getAllUsers':
                iotIUser.getAllUsers(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getUserPerUserName':
                iotIUser.getUserPerUserName(msg.payload.userName, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getUserSensors':
                iotIUser.getUserSensors(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'updateUserDevice':
                iotIUser.updateUserDevice(msg.payload.userName, msg.payload.deviceId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIUser',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIUser',
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

module.exports = UserApiHandler;