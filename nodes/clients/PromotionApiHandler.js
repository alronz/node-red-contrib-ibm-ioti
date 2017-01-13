function PromotionApiHandler() {

    this.handleMessage = function(msg, node, iotIPromotion) {

        var switchValue = msg.payload.api ? msg.payload.api : config.apisPromotion;
        switch (switchValue) {
            case 'createPromotion':
                iotIPromotion.createPromotion(msg.payload.promotion, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIPromotion',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIPromotion',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getPromotionsPerId':
                iotIPromotion.getPromotionsPerId(msg.payload.promotionId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIPromotion',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIPromotion',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deletePromotionPerId':
                iotIPromotion.deletePromotionPerId(msg.payload.promotionId, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIPromotion',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIPromotion',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'deletePromotionAttribute':
                iotIPromotion.deletePromotionAttribute(msg.payload.promotionId, msg.payload.attributeName, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIPromotion',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIPromotion',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'setPromotionAttribute':
                iotIPromotion.setPromotionAttribute(msg.payload.promotionId, msg.payload.attributeName, msg.payload.attributeValue, function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIPromotion',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIPromotion',
                            api: switchValue,
                            body: JSON.stringify(body, undefined, 2)

                        });
                    }
                });
                break;
            case 'getAllPromotions':
                iotIPromotion.getAllPromotions(function(error, body, response) {
                    if (error) {
                        node.send({
                            apiGroup: 'IotIPromotion',
                            api: switchValue,
                            error: 'Api call failed, error:' + JSON.stringify(error, undefined, 2)
                        });
                    } else {
                        node.send({
                            apiGroup: 'IotIPromotion',
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

module.exports = PromotionApiHandler;