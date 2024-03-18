/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe") (
    "sk_test_51OvDEVSDDMKhnuJa4jGPeS7C4XM0y3GP6jjbxxlVeLwd0FLOTOie8cz3dsDbzMcTq6b5kGDjmrmgzbTKYPWSGdWE00Nr68y95M"
);
//API

// APP config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());


//API routes
app.get('/', (request, response) => response.status(200).send
('hello world'))

app.post('/payments/create', async (request, response)=>{
    const total = request.query.total;

    console.log("Payemnet Request recieved ", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
    })

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//Listen command
exports.api = functions.https.onRequest(app)

// (http://127.0.0.1:5001/challenge-8388d/us-central1/api).

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
