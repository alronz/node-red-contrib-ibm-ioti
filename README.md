### Overview

This goal of this node is to invoke all APIs provided by IBM service [IoT for insurance](https://console.ng.bluemix.net/docs/services/IotInsurance/index.html). This node is built using the [ioti-nodejs-sdk](https://github.com/alronz/ioti-nodejs-sdk).

### Install

```npm i node-red-contrib-ibm-ioti```

### Configuring Node

The node requires three values to connect with IBM IoT for insurance service. The values are (uri,userid, and password) which can be found in the service dashboard. The node can be configured in three different ways:

- The node can take the service configuration from Bluemix if the app is deployed in Bluemix and connected with IoT4I service.
- They can be provided in the node itself.
- They can be sent as input inside <b>msg.payload.configs</b>


### Supported APIs

The APIs are divided to the below groups:

- Device Apis
- Global Apis
- HazardEvent Apis 
- JSCode Apis 
- Promotion Apis 
- Registration Apis 
- ShieldAssociation Apis 
- Shield Apis 
- User Apis 

Each API call needs some parameters and they should be provided inside the **msg.payload** object. For example, for calling createUser(user) API, you need to provide the user as **msg.payload.user**.

Below are the list of all the supported APIs with their required parameters:

### All (based on input)

You can call any Api by providing the **msg.payload.apiGroup** and **msg.payload.api** values as input to the node. 

**msg.payload.apiGroup** represents the group where the API exists which could be one of the following values (IotIUser,IotIDevice,IotIGlobal,IotIHazardEvent,IotIJSCode,IotIPromotion,IotIRegistration,IotIShieldAssociation,IotIShield) that represent the groups below.
**msg.payload.api** represents the API we want to call in each group, for example "createDevice,sendPayloadToMQTT,createHEvent, etc.."


### Device Apis

*   createDevice(device)
*   getDevicesPerId(deviceId)
*   getDevicesForAuthUser()
*   deleteDevicePerId(deviceId)
*   deleteDeviceAttribute(deviceId, attributeName)
*   setDeviceAttribute(deviceId, attributeName, attributeValue)
*   getAllDevices()
*   getDevicesPerUser(username)
*   updateDevice(deviceId, newDevice)

### Global Apis

*   sendPayloadToMQTT(outputType, deviceType, deviceId, type, payload)
*   sendPushNotification(pushNotification)

### HazardEvent Apis

*   createHEvent(hazardEvent)
*   getHEventPerHEventId(hazardEventId)
*   getHEventPerId(id)
*   getHEventsForAuthUser()
*   deleteHEventPerId(hazardEventId)
*   deleteHEventsPerUser(username)
*   deleteHEventAttribute(hazardEventId, attributeName)
*   setHEventAttribute(hazardEventId, attributeName, attributeValue)
*   getAllHEvents()
*   getHEventsAggregated(queryParams)
*   updateHEventValidationType(hazardEventId, validationType)

### JSCode Apis

*   createJSCode(jsCode)
*   updateAll()
*   getJSCodesPerShieldUUUID(shieldUUUID, queryParams)
*   getCommonJSCodes(queryParams)
*   getAllJSCodes(queryParams)
*   getJSCodesPerUser(username, queryParams)
*   updateJSCode(jsCodeId, code)

### Promotion Apis

*   createPromotion(promotion)
*   getPromotionsPerId(promotionId)
*   deletePromotionPerId(promotionId)
*   deletePromotionAttribute(promotionId, attributeName)
*   setPromotionAttribute(promotionId, attributeName, attributeValue)
*   getAllPromotions()

### Registration Apis

*   createRegistrationDevice(device)
*   getRegistrationDevicePerId(deviceId)
*   getRegistrationsPerUser(username)
*   getRegistrationsPerProvider(provider)
*   deleteRegistrationPerDeviceId(deviceId)
*   updateRegistrationDevice(deviceId, newDevice)

### ShieldAssociation Apis

*   createShieldAssociation(shieldAssociation)
*   getShieldAssociationsPerId(shieldAssociationId)
*   getShieldAssociationsForAuthUser()
*   deleteShieldAssociationPerId(shieldAssociationId)
*   deleteAllShieldAssociations()
*   deleteShieldAssociationAttribute(shieldAssociationId, attributeName)
*   setShieldAssociationAttribute(shieldAssociationId, attributeName, attributeValue)
*   getAllShieldAssociations()
*   getShieldAssociationsPerUser(username)
*   setShieldAssociationOnCloud(shieldAssociation)

### Shield Apis

*   createShield(shield)
*   getShieldsPerId(shieldId)
*   getShieldsPerUser(username)
*   getShieldsPerUUID(uuid)
*   deleteShieldPerId(shieldId)
*   deleteAllShields()
*   deleteShieldAttribute(shieldId, attributeName)
*   setShieldAttribute(shieldId, attributeName, attributeValue)
*   getAllShields()

### User Apis

*   createUser(user)
*   getAuthUser()
*   checkUserLogin()
*   checkUserLogout()
*   deleteUserPerUserName(username)
*   deleteUserAttribute(userName, attributeName)
*   setUserAttribute(userName, attributeName, attributeValue)
*   setUserAccessLevel(userName, accessLevel)
*   getAllUsers()
*   getUserPerUserName(userName)
*   getUserSensors()
*   updateUserDevice(userName, deviceId)


### Example Flows

<link to the other projects>