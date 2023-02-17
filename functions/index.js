const functions = require("firebase-functions");
const {LanguageServiceClient} = require("@google-cloud/language");

exports.analyseComment = functions.region("europe-west2").
    firestore.document("comments/{commentId}")
    .onCreate((snap, context) => {
      // TO-DO: analyse the comment
    });
