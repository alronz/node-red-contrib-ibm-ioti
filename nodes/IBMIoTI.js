var IotIClient = require('ibmioti');
var AssociationApiHandler = require('./clients/AssociationApiHandler');
var DeviceApiHandler = require('./clients/DeviceApiHandler');
var GlobalApiHandler = require('./clients/GlobalApiHandler');
var HazardEventApiHandler = require('./clients/HazardEventApiHandler');
var JSCodeApiHandler = require('./clients/JSCodeApiHandler');
var PromotionApiHandler = require('./clients/PromotionApiHandler');
var RegistrationApiHandler = require('./clients/RegistrationApiHandler');
var ShieldApiHandler = require('./clients/ShieldApiHandler');
var UserApiHandler = require('./clients/UserApiHandler');

var associationApiHandler = new AssociationApiHandler();
var deviceApiHandler = new DeviceApiHandler();
var globalApiHandler = new GlobalApiHandler();
var hazardEventApiHandler = new HazardEventApiHandler();
var jsCodeApiHandler = new JSCodeApiHandler();
var promotionApiHandler = new PromotionApiHandler();
var registrationApiHandler = new RegistrationApiHandler();
var shieldApiHandler = new ShieldApiHandler();
var userApiHandler = new UserApiHandler();

module.exports = function (RED) {

    function IBMIoTI(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var connected = false;
        var basedOnInput = false;
        // get config from bluemix if app is connected to IoT4I service
        var vcapServices = {};
        if (process.env.VCAP_SERVICES) {
            vcapServices = JSON.parse(process.env.VCAP_SERVICES);
        }
        var globalServiceConfig;

        if (vcapServices["iot-for-insurance"] && vcapServices["iot-for-insurance"][0]) {
            globalServiceConfig = vcapServices["iot-for-insurance"][0].credentials;
        } else {
            globalServiceConfig =
            {
                uri: config.uri,
                userid: config.userid,
                password: config.password
            };
        }

        node.status({fill: "red", shape: "ring", text: "disconnected"});

        verifyCredentials(globalServiceConfig);

        var iotIUser, iotIDevice, iotIGlobal, iotIHazardEvent, iotIJSCode, iotIPromotion, iotIRegistration, iotIShieldAssociation, iotIShield;

        function verifyCredentials(serviceConfig, type) {
            if (basedOnInput && typeof serviceConfig.uri === 'undefined') {
                serviceConfig.uri = globalServiceConfig.uri;
            }
            if (serviceConfig.uri && serviceConfig.userid && serviceConfig.password) {
                testCredentials(serviceConfig)
            } else {
                node.status({fill: "red", shape: "ring", text: "disconnected"});
                node.error("Credentials are not provided !");
                connected = false;
                node.on('input', function (msg) {
                    handleAll(msg);
                });
            }
        }

        function testCredentials(serviceConfig) {
            var iotIUser = new IotIClient.IotIUser(serviceConfig);
            iotIUser.checkUserLogin(function (error, body, response) {
                if (error) {
                    node.status({fill: "red", shape: "ring", text: "disconnected"});
                    node.error("Credentials are not valid !")
                    connected = false;
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
                connected = true;

                if (!basedOnInput) {
                    start();
                } else {
                    node.send({connect: true});
                }

            } catch (error) {
                node.status({fill: "red", shape: "ring", text: "disconnected"});
                node.error("Something went wrong, error: " + JSON.stringify(error));
                connected = false
            }
        }

        function handleAll(msg) {

            if (connected) {
                if (msg.payload.configs) {
                    basedOnInput = true;
                    verifyCredentials(msg.payload.configs);
                } else {
                    switch (msg.payload.apiGroup) {
                        case 'IotIUser':
                            userApiHandler.handleMessage(msg, node, iotIUser);
                            break;
                        case 'IotIDevice':
                            deviceApiHandler.handleMessage(msg, node, iotIUser);
                            break;
                        case 'IotIGlobal':
                            globalApiHandler.handleMessage(msg, node, iotIGlobal);
                            break;
                        case 'IotIHazardEvent':
                            hazardEventApiHandler.handleMessage(msg, node, iotIHazardEvent);
                            break;
                        case 'IotIJSCode':
                            jsCodeApiHandler.handleMessage(msg, node, iotIJSCode);
                            break;
                        case 'IotIPromotion':
                            promotionApiHandler.handleMessage(msg, node, iotIPromotion);
                            break;
                        case 'IotIRegistration':
                            registrationApiHandler.handleMessage(msg, node, iotIRegistration);
                            break;
                        case 'IotIShieldAssociation':
                            associationApiHandler.handleMessage(msg, node, iotIShieldAssociation);
                            break;
                        case 'IotIShield':
                            shieldApiHandler.handleMessage(msg, node, iotIShield);
                            break;
                        default:
                            node.error("No matched apiGroup (msg.payload.apiGroup)");
                            break;
                    }
                }
            } else {
                if (msg.payload.configs) {
                    basedOnInput = true;
                    verifyCredentials(msg.payload.configs);
                } else {
                    node.send({connect: false});
                }
            }
        }

        function start() {
            node.on('input', function (msg) {
                if (msg.payload.configs) {
                    basedOnInput = true;
                    verifyCredentials(msg.payload.configs);
                } else {
                    if (config.client === "IotIDevice") {
                        deviceApiHandler.handleMessage(msg, node, iotIUser);
                    } else if (config.client === "IotIGlobal") {
                        globalApiHandler.handleMessage(msg, node, iotIGlobal);
                    } else if (config.client === "IotIHazardEvent") {
                        hazardEventApiHandler.handleMessage(msg, node, iotIHazardEvent);
                    } else if (config.client === "IotIJSCode") {
                        jsCodeApiHandler.handleMessage(msg, node, iotIJSCode);
                    } else if (config.client === "IotIPromotion") {
                        promotionApiHandler.handleMessage(msg, node, iotIPromotion);
                    } else if (config.client === "IotIRegistration") {
                        registrationApiHandler.handleMessage(msg, node, iotIRegistration);
                    } else if (config.client === "IotIShieldAssociation") {
                        associationApiHandler.handleMessage(msg, node, iotIShieldAssociation);
                    } else if (config.client === "IotIShield") {
                        shieldApiHandler.handleMessage(msg, node, iotIShield);
                    } else if (config.client === "IotIUser") {
                        userApiHandler.handleMessage(msg, node, iotIUser);
                    } else if (config.client === 'based_on_input') {
                        handleAll(msg);
                    }
                }
            });
        }

        node.on('close', function () {
            connected = false;
            basedOnInput = false;
        });
    }

    RED.nodes.registerType("IBMIoTI", IBMIoTI);
};