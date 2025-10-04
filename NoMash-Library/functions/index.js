// const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
// const logger = require("firebase-functions/logger");
const cors = require("cors")({origin: true});
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.getBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(books);
    } catch (error) {
      console.error("Error fetching books:", error.message);
      res.status(500).send("Error fetching books");
    }
  });
});

exports.capitalizeBook = onDocumentCreated(
    "books/{bookId}", async (event) => {
      // Get the snapshot of the new book document
      const snapshot = event.data;
      if (!snapshot) {
        console.log("No data found in snapshot.");
        return;
      }

      const bookId = snapshot.id;
      const bookData = snapshot.data();

      // Convert all string fields in the document to uppercase
      const updatedData = {};
      for (const field in bookData) {
        if (typeof bookData[field] === "string") {
          updatedData[field] = bookData[field].toUpperCase();
        } else {
          updatedData[field] = bookData[field];
        }
      }

      // Update the same document in Firestore with capitalized values
      try {
        await admin.firestore().
            collection("books").doc(bookId).update(updatedData);
        console.log(
            `Book "${bookId}" updated with capitalized fields:`,
            updatedData);
      } catch (error) {
        console.error("Error updating book data:", error);
      }
    });
