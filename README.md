### Overview

This goal of this node is to invoke all APIs provided by IBM service [IoT for insurance](https://console.ng.bluemix.net/docs/services/IotInsurance/index.html).


### Install

```npm i node-red-contrib-ibm-ioti```

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
*   getHEventsForAuthUser(callback)
*   deleteHEventPerId(hazardEventId)
*   deleteHEventsPerUser(username)
*   deleteHEventAttribute(hazardEventId, attributeName)
*   setHEventAttribute(hazardEventId, attributeName, attributeValue)
*   getAllHEvents(callback)
*   getHEventsAggregated(queryParams)
*   updateHEventValidationType(hazardEventId, validationType)

### JSCode Apis

*   createJSCode(jsCode)
*   updateAll(callback)
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
*   getAllPromotions(callback)

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
*   getShieldAssociationsForAuthUser(callback)
*   deleteShieldAssociationPerId(shieldAssociationId)
*   deleteAllShieldAssociations(callback)
*   deleteShieldAssociationAttribute(shieldAssociationId, attributeName)
*   setShieldAssociationAttribute(shieldAssociationId, attributeName, attributeValue)
*   getAllShieldAssociations(callback)
*   getShieldAssociationsPerUser(username)
*   setShieldAssociationOnCloud(shieldAssociation)

### Shield Apis

*   createShield(shield)
*   getShieldsPerId(shieldId)
*   getShieldsPerUser(username)
*   getShieldsPerUUID(uuid)
*   deleteShieldPerId(shieldId)
*   deleteAllShields(callback)
*   deleteShieldAttribute(shieldId, attributeName)
*   setShieldAttribute(shieldId, attributeName, attributeValue)
*   getAllShields(callback)

### User Apis

*   createUser(user)
*   getAuthUser(callback)
*   checkUserLogin(callback)
*   checkUserLogout(callback)
*   deleteUserPerUserName(username)
*   deleteUserAttribute(userName, attributeName)
*   setUserAttribute(userName, attributeName, attributeValue)
*   setUserAccessLevel(userName, accessLevel)
*   getAllUsers(callback)
*   getUserPerUserName(userName)
*   getUserSensors(callback)
*   updateUserDevice(userName, deviceId)


### Example Flows
To Be Added