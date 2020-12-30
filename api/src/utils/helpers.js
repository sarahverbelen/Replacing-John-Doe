const {
    v1: uuidv1
} = require('uuid');
const Helpers = {
    generateUUID: () => {
        const uuid = uuidv1();
        return uuid;
    },


}
module.exports = Helpers