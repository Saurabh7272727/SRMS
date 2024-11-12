import crypto from 'crypto';
const OTPR = crypto.randomInt(100000, 999999);
const OTPR2 = crypto.randomInt(10000000, 1233999999);



export const keyadmin = `SRMS_KEY_ADMIN_${OTPR}_SECURE_KEY${OTPR2}`;
