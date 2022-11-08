var MachineManagement = artifacts.require("./MachineManagement.sol");

module.exports = function(deployer) {
  deployer.deploy(MachineManagement);
};