

module.exports = {
  capitalize: function (string) {
    if(typeof string !== "string"){throw new Error("A string is required as input - only letters")}
      let capitalCharacter = string.charAt(0).toUpperCase()
      let nonCapital = string.slice(1).toLowerCase();
      let result = capitalCharacter.concat(nonCapital);
  
      return result
  },

};
