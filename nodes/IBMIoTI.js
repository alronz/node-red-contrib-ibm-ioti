var IotIClient = require('ibmioti');

module.exports = function(RED) {

    function IBMIoTI(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // get config from bluemix if app is connected to IoT4I service
        var vcapServices = {};
        if (process.env.VCAP_SERVICES) {
            vcapServices = JSON.parse(process.env.VCAP_SERVICES);
        }
        var serviceConfig;

        if (vcapServices["iot-for-insurance"] && vcapServices["iot-for-insurance"][0]) {
            serviceConfig = vcapServices["iot-for-insurance"][0].credentials;
        } else {
            serviceConfig =
            {
                uri: config.uri,
                userid: config.userid,
                password: config.password
            };
        }

        node.status({fill: "red", shape: "ring", text: "disconnected"});

        verifyCredentials(serviceConfig);

        var iotIUser, iotIDevice, iotIGlobal, iotIHazardEvent, iotIJSCode, iotIPromotion, iotIRegistration, iotIShieldAssociation, iotIShield;

        function verifyCredentials(serviceConfig) {
            if (serviceConfig.uri && serviceConfig.userid && serviceConfig.password) {
                testCredentials(serviceConfig)
            } else {
                node.status({fill: "red", shape: "ring", text: "disconnected"});
                node.error("Credentials are not provided !")
            }
        }

        function testCredentials(serviceConfig) {
            var iotIUser = new IotIClient.IotIUser(serviceConfig);
            iotIUser.checkUserLogin(function(error, body, response) {
                if (error) {
                    node.status({fill: "red", shape: "ring", text: "disconnected"});
                    node.error("Credentials are not valid !")
                } else {
                    initializeClients(serviceConfig);
                }
            })
        }

        function initializeClients(serviceConfig) {
            try {
                // initialize all clients using the configuration
                iotIUser = new IotIClient.IotIUser(serviceConfig);
                iotIDevice = new IotIClient.IotIDevice(serviceConfig);
                iotIGlobal = new IotIClient.IotIGlobal(serviceConfig);
                iotIHazardEvent = new IotIClient.IotIHazardEvent(serviceConfig);
                iotIJSCode = new IotIClient.IotIJSCode(serviceConfig);
                iotIPromotion = new IotIClient.IotIPromotion(serviceConfig);
                iotIRegistration = new IotIClient.IotIRegistration(serviceConfig);
                iotIShieldAssociation = new IotIClient.IotIShieldAssociation(serviceConfig);
                iotIShield = new IotIClient.IotIShield(serviceConfig);

                // all are set, start node
                node.status({fill: "green", shape: "dot", text: "connected"});
                node.log("successfully connected to IBM IoTI service !");

                start();

            } catch (error) {
                node.status({fill: "red", shape: "ring", text: "disconnected"});
                node.error("Something went wrong, error: " + JSON.stringify(error));
            }
        }

        function handleDeviceApis(msg) {
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

        function handleGlobalApis(msg) {
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

        function handleHEventApis(msg) {
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

        function handleJSCodeApis(msg) {
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

        function handlePromotionApis(msg) {
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

        function handleRegistrationApis(msg) {
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

        function handleShieldAssociationApis(msg) {
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

        function handleShieldApis(msg) {

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

        function handleUserApis(msg) {
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

        function handleAll(msg) {

            switch (msg.payload.apiGroup) {
                case 'IotIUser':
                    handleUserApis(msg);
                    break;
                case 'IotIDevice':
                    handleDeviceApis(msg);
                    break;
                case 'IotIGlobal':
                    handleGlobalApis(msg);
                    break;
                case 'IotIHazardEvent':
                    handleHEventApis(msg);
                    break;
                case 'IotIJSCode':
                    handleJSCodeApis(msg);
                    break;
                case 'IotIPromotion':
                    handlePromotionApis(msg);
                    break;
                case 'IotIRegistration':
                    handleRegistrationApis(msg);
                    break;
                case 'IotIShieldAssociation':
                    handleShieldAssociationApis(msg);
                    break;
                case 'IotIShield':
                    handleShieldApis(msg);
                    break;
                default:
                    node.error("No matched apiGroup (msg.payload.apiGroup)");
                    break;
            }

        }

        function start() {
            node.on('input', function(msg) {
                if (config.client === "IotIDevice") {
                    handleDeviceApis(msg);
                } else if (config.client === "IotIGlobal") {
                    handleGlobalApis(msg);
                } else if (config.client === "IotIHazardEvent") {
                    handleHEventApis(msg);
                } else if (config.client === "IotIJSCode") {
                    handleJSCodeApis(msg);
                } else if (config.client === "IotIPromotion") {
                    handlePromotionApis(msg);
                } else if (config.client === "IotIRegistration") {
                    handleRegistrationApis(msg);
                } else if (config.client === "IotIShieldAssociation") {
                    handleShieldAssociationApis(msg);
                } else if (config.client === "IotIShield") {
                    handleShieldApis(msg);
                } else if (config.client === "IotIUser") {
                    handleUserApis(msg);
                } else if (config.client === 'based_on_input') {
                    handleAll(msg);
                }
            });
        }

        node.on('close', function() {
        });
    }

    RED.nodes.registerType("IBMIoTI", IBMIoTI);
};