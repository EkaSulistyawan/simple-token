const simple = artifacts.require("simple_smart_contract");

module.exports = function(deployer) {
  deployer.deploy(simple);
};
