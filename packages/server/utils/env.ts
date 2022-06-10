import { config } from "dotenv";

config();

const dev = process.env.NODE_ENV !== "production";

const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_EXPIRY = process.env.SESSION_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
const PORT = process.env.PORT;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const JWT_SECRET = process.env.SESSION_EXPIRY;
const WHITELISTED_DOMAINS = process.env.WHITELISTED_DOMAINS;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;

if (REFRESH_TOKEN_EXPIRY === undefined) {
    throw Error("REFRESH_TOKEN_EXPIRY not set in .env");
}

if (REFRESH_TOKEN_SECRET === undefined) {
    throw Error("REFRESH_TOKEN_SECRET not set in .env");
}

if (JWT_SECRET === undefined) {
    throw Error("JWT_SECRET not set in .env");
}

if (SESSION_EXPIRY === undefined) {
    throw Error("SESSION_EXPIRY not set in .env");
}

if (MONGODB_URI === undefined) {
    throw Error("MONGODB_URI not set in .env");
}

if (PORT === undefined) {
    throw Error("PORT not set in .env");
}

if (WHITELISTED_DOMAINS === undefined) {
    throw Error("WHITELISTED_DOMAINS not set in .env");
}

if (COOKIE_SECRET === undefined) {
    throw Error("COOKIE_SECRET not set in .env");
}

if (EXPRESS_SESSION_SECRET === undefined) {
    throw Error("EXPRESS_SESSION_SECRET not set in .env");
}

export default {
    REFRESH_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET,
    JWT_SECRET,
    SESSION_EXPIRY,
    MONGODB_URI,
    WHITELISTED_DOMAINS,
    PORT,
    COOKIE_SECRET,
    EXPRESS_SESSION_SECRET,
    dev,
};
