var IotIClient = require('ibmioti');

module.exports = function(RED) {

    function IBMIoTI(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.status({fill: "red", shape: "ring", text: "disconnected"});

        var serviceConfig =
        {
            uri: config.uri,
            userid: config.userid,
            password: config.password
        };

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
                node.log("successfully connected to IBM IoTI service !")

                start();

            } catch (error) {
                node.status({fill: "red", shape: "ring", text: "disconnected"});
                node.error("Something went wrong, error:", error);
            }
        }

        function handleDeviceApis(msg) {

            switch (config.apisDevice) {
                case 'createDevice':
                    iotIDevice.createDevice(msg.payload.device, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getDevicesPerId':
                    iotIDevice.getDevicesPerId(msg.payload.deviceId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getDevicesForAuthUser':
                    iotIDevice.getDevicesForAuthUser(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteDevicePerId':
                    iotIDevice.deleteDevicePerId(msg.payload.deviceId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteDeviceAttribute':
                    iotIDevice.deleteDeviceAttribute(msg.payload.deviceId, msg.payload.attributeName, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'setDeviceAttribute':
                    iotIDevice.setDeviceAttribute(msg.payload.deviceId, msg.payload.attributeName, msg.payload.attributeValue, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getAllDevices':
                    iotIDevice.getAllDevices(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getDevicesPerUser':
                    iotIDevice.getDevicesPerUser(msg.payload.username, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'updateDevice':
                    iotIDevice.updateDevice(msg.payload.deviceId, msg.payload.newDevice, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                default:
                    node.error("No matched API");
                    break;
            }
        }

        function handleGlobalApis(msg) {

            switch (config.apisGlobal) {
                case 'sendPayloadToMQTT':
                    iotIGlobal.sendPayloadToMQTT(msg.payload.outputType, msg.payload.deviceType, msg.payload.deviceId, msg.payload.type, msg.payload.payload, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'sendPushNotification':
                    iotIGlobal.sendPushNotification(msg.payload.pushNotification, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                default:
                    node.error("No matched API");
                    break;
            }

        }

        function handleHEventApis(msg) {

            switch (config.apisHazardEvent) {
                case 'createHEvent':
                    iotIHazardEvent.createHEvent(msg.payload.hazardEvent, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getHEventPerHEventId':
                    iotIHazardEvent.getHEventPerHEventId(msg.payload.hazardEventId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getHEventPerId':
                    iotIHazardEvent.getHEventPerId(msg.payload.id, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getHEventsForAuthUser':
                    iotIHazardEvent.getHEventsForAuthUser(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteHEventPerId':
                    iotIHazardEvent.deleteHEventPerId(msg.payload.hazardEventId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteHEventsPerUser':
                    iotIHazardEvent.deleteHEventsPerUser(msg.payload.username, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteHEventAttribute':
                    iotIHazardEvent.deleteHEventAttribute(msg.payload.hazardEventId, msg.payload.attributeName, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'setHEventAttribute':
                    iotIHazardEvent.setHEventAttribute(msg.payload.hazardEventId, msg.payload.attributeName, msg.payload.attributeValue, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getAllHEvents':
                    iotIHazardEvent.getAllHEvents(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getHEventsAggregated':
                    iotIHazardEvent.getHEventsAggregated(msg.payload.queryParams, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'updateHEventValidationType':
                    iotIHazardEvent.updateHEventValidationType(msg.payload.hazardEventId, msg.payload.validationType, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                default:
                    node.error("No matched API");
                    break;
            }

        }

        function handleJSCodeApis(msg) {

            switch (config.apisJSCode) {
                case 'createJSCode':
                    iotIJSCode.createJSCode(msg.payload.jsCode, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'updateAll':
                    iotIJSCode.updateAll(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getJSCodesPerShieldUUUID':
                    iotIJSCode.getJSCodesPerShieldUUUID(msg.payload.shieldUUUID, msg.payload.queryParams, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getCommonJSCodes':
                    iotIJSCode.getCommonJSCodes(msg.payload.queryParams, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getAllJSCodes':
                    iotIJSCode.getAllJSCodes(msg.payload.queryParams, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getJSCodesPerUser':
                    iotIJSCode.getJSCodesPerUser(msg.payload.username, msg.payload.queryParams, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'updateJSCode':
                    iotIJSCode.updateJSCode(msg.payload.jsCodeId, msg.payload.code, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                default:
                    node.error("No matched API");
                    break;
            }

        }

        function handlePromotionApis(msg) {

            switch (config.apisPromotion) {
                case 'createPromotion':
                    iotIPromotion.createPromotion(msg.payload.promotion, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getPromotionsPerId':
                    iotIPromotion.getPromotionsPerId(msg.payload.promotionId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deletePromotionPerId':
                    iotIPromotion.deletePromotionPerId(msg.payload.promotionId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deletePromotionAttribute':
                    iotIPromotion.deletePromotionAttribute(msg.payload.promotionId, msg.payload.attributeName, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'setPromotionAttribute':
                    iotIPromotion.setPromotionAttribute(msg.payload.promotionId, msg.payload.attributeName, msg.payload.attributeValue, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getAllPromotions':
                    iotIPromotion.getAllPromotions(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                default:
                    node.error("No matched API");
                    break;
            }

        }

        function handleRegistrationApis(msg) {

            switch (config.apisRegistration) {
                case 'createRegistrationDevice':
                    iotIRegistration.createRegistrationDevice(msg.payload.device, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getRegistrationDevicePerId':
                    iotIRegistration.getRegistrationDevicePerId(msg.payload.deviceId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getRegistrationsPerUser':
                    iotIRegistration.getRegistrationsPerUser(msg.payload.username, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getRegistrationsPerProvider':
                    iotIRegistration.getRegistrationsPerProvider(msg.payload.provider, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteRegistrationPerDeviceId':
                    iotIRegistration.deleteRegistrationPerDeviceId(msg.payload.deviceId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'updateRegistrationDevice':
                    iotIRegistration.updateRegistrationDevice(msg.payload.deviceId, msg.payload.newDevice, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                default:
                    node.error("No matched API");
                    break;
            }

        }

        function handleShieldAssociationApis(msg) {

            switch (config.apisShieldAssociation) {
                case 'createShieldAssociation':
                    iotIShieldAssociation.createShieldAssociation(msg.payload.shieldAssociation, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getShieldAssociationsPerId':
                    iotIShieldAssociation.getShieldAssociationsPerId(msg.payload.shieldAssociationId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getShieldAssociationsForAuthUser':
                    iotIShieldAssociation.getShieldAssociationsForAuthUser(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteShieldAssociationPerId':
                    iotIShieldAssociation.deleteShieldAssociationPerId(msg.payload.shieldAssociationId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteAllShieldAssociations':
                    iotIShieldAssociation.deleteAllShieldAssociations(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteShieldAssociationAttribute':
                    iotIShieldAssociation.deleteShieldAssociationAttribute(msg.payload.shieldAssociationId, msg.payload.attributeName, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'setShieldAssociationAttribute':
                    iotIShieldAssociation.setShieldAssociationAttribute(msg.payload.shieldAssociationId, msg.payload.attributeName, msg.payload.attributeValue, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getAllShieldAssociations':
                    iotIShieldAssociation.getAllShieldAssociations(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getShieldAssociationsPerUser':
                    iotIShieldAssociation.getShieldAssociationsPerUser(msg.payload.username, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'setShieldAssociationOnCloud':
                    iotIShieldAssociation.setShieldAssociationOnCloud(msg.payload.shieldAssociation, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                default:
                    node.error("No matched API");
                    break;
            }
        }

        function handleShieldApis(msg) {

            switch (config.apisShield) {
                case 'createShield':
                    iotIShield.createShield(msg.payload.shield, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getShieldsPerId':
                    iotIShield.getShieldsPerId(msg.payload.shieldId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getShieldsPerUser':
                    iotIShield.getShieldsPerUser(msg.payload.username, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getShieldsPerUUID':
                    iotIShield.getShieldsPerUUID(msg.payload.uuid, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteShieldPerId':
                    iotIShield.deleteShieldPerId(msg.payload.shieldId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteAllShields':
                    iotIShield.deleteAllShields(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteShieldAttribute':
                    iotIShield.deleteShieldAttribute(msg.payload.shieldId, msg.payload.attributeName, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'setShieldAttribute':
                    iotIShield.setShieldAttribute(msg.payload.shieldId, msg.payload.attributeName, msg.payload.attributeValue, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getAllShields':
                    iotIShield.getAllShields(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                default:
                    node.error("No matched API");
                    break;
            }

        }

        function handleUserApis(msg) {

            switch (config.apisUser) {
                case 'createUser':
                    iotIUser.createUser(msg.payload.user, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getAuthUser':
                    iotIUser.getAuthUser(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'checkUserLogin':
                    iotIUser.checkUserLogin(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'checkUserLogout':
                    iotIUser.checkUserLogout(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteUserPerUserName':
                    iotIUser.deleteUserPerUserName(msg.payload.username, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'deleteUserAttribute':
                    iotIUser.deleteUserAttribute(msg.payload.userName, msg.payload.attributeName, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'setUserAttribute':
                    iotIUser.setUserAttribute(msg.payload.userName, msg.payload.attributeName, msg.payload.attributeValue, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'setUserAccessLevel':
                    iotIUser.setUserAccessLevel(msg.payload.userName, msg.payload.accessLevel, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getAllUsers':
                    iotIUser.getAllUsers(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getUserPerUserName':
                    iotIUser.getUserPerUserName(msg.payload.userName, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'getUserSensors':
                    iotIUser.getUserSensors(function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                case 'updateUserDevice':
                    iotIUser.updateUserDevice(msg.payload.userName, msg.payload.deviceId, function(error, body, response) {
                        if (error) {
                            node.error("Api call failed, error:", error);
                        } else {
                            node.send({body: body, response: response});
                        }
                    });
                    break;
                default:
                    node.error("No matched API");
                    break;
            }

        }

        function start() {
            node.on('input', function(msg) {
                if (config.apisDevice) {
                    handleDeviceApis(msg);
                } else if (config.apisGlobal) {
                    handleGlobalApis(msg);
                } else if (config.apisHazardEvent) {
                    handleHEventApis(msg);
                } else if (config.apisJSCode) {
                    handleJSCodeApis(msg);
                } else if (config.apisPromotion) {
                    handlePromotionApis(msg);
                } else if (config.apisRegistration) {
                    handleRegistrationApis(msg);
                } else if (config.apisShieldAssociation) {
                    handleShieldAssociationApis(msg);
                } else if (config.apisShield) {
                    handleShieldApis(msg);
                } else if (config.apisUser) {
                    handleUserApis(msg);
                }
            });
        }

        node.on('close', function() {
        });
    }

    RED.nodes.registerType("IBMIoTI", IBMIoTI);
};