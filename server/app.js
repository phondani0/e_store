const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

require("dotenv").config();

const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
    log: ["query", "info", "warn"],
});

const cloudinary = require("cloudinary").v2;

const Razorpay = require("razorpay");

const { cloud_name, api_key, api_secret } = require("./src/config/cloudinary");

const rzpConfig = require("./src/config/razorpay");

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
});

const razorpay = new Razorpay({
    key_id: rzpConfig.api_key,
    key_secret: rzpConfig.api_secret,
});

const users = require("./src/users");
const products = require("./src/products");
const orders = require("./src/orders");
const cart = require("./src/cart");

const { jwt_secret } = require("./src/config/index");

const getUser = (token) => {
    try {
        if (token) {
            return jwt.verify(token, jwt_secret);
        }
        return null;
    } catch (err) {
        return null;
    }
};

const server = new ApolloServer({
    typeDefs: [users.typeDef, products.typeDef, orders.typeDef, cart.typeDef],
    resolvers: [
        users.resolvers,
        products.resolvers,
        orders.resolvers,
        cart.resolvers,
    ],
    formatError: (error) => {
        console.log("Error", error);

        if (error) {
            const message = error.message || "An error occurred.";

            return {
                message,
            };
        }
        return error;
    },
});

const port = process.env.PORT || 3500;

// @ts-ignore
startStandaloneServer(server, {
    context: async ({ req }) => {
        const tokenWithBearer = req.headers.authorization || "";
        const token = tokenWithBearer.split(" ")[1];
        const user = getUser(token);
        return {
            prisma,
            user,
            cloudinary,
            razorpay,
        };
    },
    listen: { port },
}).then(({ url }) => {
    console.log("\x1b[32m", `Server started at ${url}`, "\x1b[0m");
});
