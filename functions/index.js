const functions = require("firebase-functions");
const {LanguageServiceClient} = require("@google-cloud/language");

exports.analyseComment = functions.
    firestore.document("comments/{commentId}").onCreate((snap, context) => {
      const {comment} = snap.data();

      const client = new LanguageServiceClient();
      const request = {
        document: {
          content: comment,
          type: "PLAIN_TEXT",
        },
        encodingType: "UTF8",
      };

      client.analyzeSentiment(request).then((results) => {
        const {documentSentiment} = results[0];
        const {score, magnitude} = documentSentiment;
        return snap.ref.set({score, magnitude}, {merge: true});
      }
      ).catch((err) => {
        console.error("ERROR:", err);
      }
      );
    });
