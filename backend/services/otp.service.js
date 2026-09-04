const crypto = require('crypto');
const { redis } = require('../config/redis.Config.js');

const OTP_EXPIRY = 2 * 60;  // 2 minutes
const RESET_TOKEN_EXPIRY = 4 * 60;  // 4 minutes

module.exports.generateOtp = () => {
    return crypto.randomInt(100000, 1000000).toString();
};

const hashOtp = (otp) => {
    return crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");
};

module.exports.saveOtp = async (email, otp, purpose) => {
    const hashedOtp = hashOtp(otp);
    const key = `otp:${purpose}:${email}`;

    await redis.set(
        key,
        hashedOtp,
        "EX",
        OTP_EXPIRY
    );
};

module.exports.verifyOtp = async (email, otp, purpose) => {
    const key = `otp:${purpose}:${email}`;
    const storedOtp = await redis.get(key);

    if (!storedOtp) {
        return false;
    }

    const hashedOtp = hashOtp(otp);

    if (hashedOtp !== storedOtp) {
        return false;
    }

    await redis.del(key);
    return true;
};

module.exports.deleteOtp = async (email, purpose) => {
    const key = `otp:${purpose}:${email}`;
    await redis.del(key);
};

// Create token for resetting password
module.exports.createResetToken = async (email) => {
    const token = crypto.randomBytes(32).toString("hex");
    const key = `password-reset:${token}`;
    
    await redis.set(
        key,
        email,
        "EX",
        RESET_TOKEN_EXPIRY
    );
    
    return token;
};

module.exports.verifyResetToken = async (token) => {
    const key = `password-reset:${token}`;
    const email = await redis.get(key);
    
    if (!email) {
        return null;
    }
    
    return email;
};

module.exports.deleteResetToken = async (token) => {
    const key = `password-reset:${token}`;
    await redis.del(key);
};