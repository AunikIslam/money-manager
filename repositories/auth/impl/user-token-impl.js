const {generateAccessToken, generateRefreshToken} = require("../../../utils/jwt");
const User = require('../../../schemas/user')
exports.getToken = async function (email) {
    try {
        const user = await User.findOne({email});
        if (!user) {
            throw Error('User not found');
        }
        return {
            access_token: generateAccessToken({id: user._id}),
            refresh_token: generateRefreshToken({id: user._id})
        }
    } catch (error) {
        console.log(error.message);
    }
}