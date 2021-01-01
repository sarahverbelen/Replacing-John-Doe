const {
    v1: uuidv1
} = require('uuid');
const Helpers = {
    generateUUID: () => {
        const uuid = uuidv1();
        return uuid;
    },
    checkDataLength: (data) => {
        if(typeof(data) == typeof('string')) {
            if(data.length > 1 && data.length < 25) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
module.exports = Helpers