function HazardEventApiHandler() {

    this.handleMessage = function(msg, node, iotIHazardEvent) {

        var switchValue = msg.payload.api ? msg.payload.api : config.apisHazardEvent;
        switch (switchValue) {
            case 'createHEvent':
                iotIHazardEvent.createHEvent(msg.payload.hazardEvent, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getHEventPerHEventId':
                iotIHazardEvent.getHEventPerHEventId(msg.payload.hazardEventId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getHEventPerId':
                iotIHazardEvent.getHEventPerId(msg.payload.id, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getHEventsForAuthUser':
                iotIHazardEvent.getHEventsForAuthUser(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteHEventPerId':
                iotIHazardEvent.deleteHEventPerId(msg.payload.hazardEventId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteHEventsPerUser':
                iotIHazardEvent.deleteHEventsPerUser(msg.payload.username, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deleteHEventAttribute':
                iotIHazardEvent.deleteHEventAttribute(msg.payload.hazardEventId, msg.payload.attributeName, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'setHEventAttribute':
                iotIHazardEvent.setHEventAttribute(msg.payload.hazardEventId, msg.payload.attributeName, msg.payload.attributeValue, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getAllHEvents':
                iotIHazardEvent.getAllHEvents(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getHEventsAggregated':
                iotIHazardEvent.getHEventsAggregated(msg.payload.queryParams, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'updateHEventValidationType':
                iotIHazardEvent.updateHEventValidationType(msg.payload.hazardEventId, msg.payload.validationType, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIHazardEvent',
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

module.exports = HazardEventApiHandler;