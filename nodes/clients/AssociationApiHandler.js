function AssociationApiHandler() {

    this.handleMessage = function(msg, node, iotIShieldAssociation) {

        var switchValue = msg.payload.api ? msg.payload.api : config.apisShieldAssociation;
        switch (switchValue) {
            case 'createShieldAssociation':
                iotIShieldAssociation.createShieldAssociation(msg.payload.shieldAssociation, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getShieldAssociationsPerId':
                iotIShieldAssociation.getShieldAssociationsPerId(msg.payload.shieldAssociationId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getShieldAssociationsForAuthUser':
                iotIShieldAssociation.getShieldAssociationsForAuthUser(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteShieldAssociationPerId':
                iotIShieldAssociation.deleteShieldAssociationPerId(msg.payload.shieldAssociationId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteAllShieldAssociations':
                iotIShieldAssociation.deleteAllShieldAssociations(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteShieldAssociationAttribute':
                iotIShieldAssociation.deleteShieldAssociationAttribute(msg.payload.shieldAssociationId, msg.payload.attributeName, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'setShieldAssociationAttribute':
                iotIShieldAssociation.setShieldAssociationAttribute(msg.payload.shieldAssociationId, msg.payload.attributeName, msg.payload.attributeValue, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getAllShieldAssociations':
                iotIShieldAssociation.getAllShieldAssociations(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getShieldAssociationsPerUser':
                iotIShieldAssociation.getShieldAssociationsPerUser(msg.payload.username, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'setShieldAssociationOnCloud':
                iotIShieldAssociation.setShieldAssociationOnCloud(msg.payload.shieldAssociation, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIShieldAssociation',
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

module.exports = AssociationApiHandler;