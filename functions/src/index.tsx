/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
const {onSchedule} = require('firebase-functions/v2/scheduler');

const functions = require('firebase-functions');
exports.helloWorld = functions.https.onRequest(
  (request: any, response: {send: (arg0: string) => void}) => {
    response.send('Hello firebase-functions!');
  },
);
// exports.sendEmailsForRepayment = onSchedule(
//   'every 2 minutes',
//   async (event: any) => {
//     await getUsersWithDueRepayments();
//     const emailsWithRepaymentDetails = await getRepaymentDetailsForUsers();
//     await sendEmailToUsers(emailsWithRepaymentDetails);
//     console.log('Schedule done running');
//   },
// );

// function getRepaymentDetailsForUsers() {
//   throw new Error('Function not implemented.');
// }

// function getUsersWithDueRepayments() {
//   throw new Error('Function not implemented.');
// }

// function sendEmailToUsers(emailsWithRepaymentDetails: void) {
//   throw new Error('Function not implemented.');
// }
// exports.listProducts = functions.https.onCall((data: any, context: any) => {
//   console.log('oncall funcation ');
// });

// exports.scheduledFunction = functions.pubsub
//   .schedule('every 2 mints')
//   .onRun((context: any) => {
//     context.send('This will be run every 2 minutes!');
//     return null;
//   });

// exports.scheduledFunction = functions.pubsub
//   .schedule('every 1 minutes')
//   .onRun((context: any) => {
//     console.log('context', context);
//     console.log('This will be run every 1 minute!');
//     return null;
//   });

// const {faker} = require('@faker-js/faker');

// const products: {name: any; price: any}[] = [];
// const LIMIT = 100;
// for (let i = 0; i < LIMIT; i++) {
//   products.push({
//     name: faker.commerce.productName(),
//     price: faker.commerce.price(),
//   });
// }

// exports.listProducts = functions.https.onCall((data: any, context: any) => {
//   return products;
// });
