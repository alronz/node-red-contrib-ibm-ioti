module.exports = function (RED) {

    function IBMIoTI(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.status({fill: "red", shape: "ring", text: "disconnected"});

        node.status({fill: "green", shape: "dot", text: "connected"});

        node.on('input', function (msg) {
        });

        node.on('close', function () {
        });
    }

    RED.nodes.registerType("IBMIoTI", IBMIoTI);
};