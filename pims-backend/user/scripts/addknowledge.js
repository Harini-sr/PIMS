// // // scripts/addKnowledgeSimple.js
// // require("dotenv").config();
// // const mongoose = require("mongoose");
// // const Knowledge = require("../models/knowledge");

// // const entries = [
// //   { text: "You can report issues from your user dashboard.", tags: ["report", "dashboard"] },
// //   { text: "Feedback helps us improve our services.", tags: ["feedback", "improve"] },
// //   { text: "Our team resolves user issues within 24 hours.", tags: ["support", "timing"] },
// // ];

// // (async () => {
// //   await mongoose.connect(process.env.MONGO_URI);
// //   for (const entry of entries) {
// //     await Knowledge.create(entry);
// //     console.log("✅ Added:", entry.text);
// //   }
// //   mongoose.connection.close();
// // })();

// // scripts/addKnowledgeSimple.js
// require("dotenv").config();
// const mongoose = require("mongoose");
// const { Knowledge } = require("../models/knowledge"); // Destructure correctly if exported as { Knowledge }

// const entries = [
//   { text: "You can report issues from your user dashboard.", tags: ["report", "dashboard"] },
//   { text: "Feedback helps us improve our services.", tags: ["feedback", "improve"] },
//   { text: "Our team resolves user issues within 24 hours.", tags: ["support", "timing"] },
// ];

// (async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB connected");

//     for (const entry of entries) {
//       await Knowledge.create(entry);
//       console.log("✅ Added:", entry.text);
//     }
//   } catch (err) {
//     console.error("❌ Error adding knowledge entries:", err);
//   } finally {
//     await mongoose.connection.close();
//     console.log("🔒 MongoDB connection closed");
//   }
// })();

require("dotenv").config();
const mongoose = require("mongoose");
const { Knowledge } = require("../models/knowledge"); // adjust based on your export

const entries = [
  { text: "You can report issues from your user dashboard.", tags: ["report", "dashboard"] },
  { text: "Feedback helps us improve our services.", tags: ["feedback", "improve"] },
  { text: "Our team resolves user issues within 24 hours.", tags: ["support", "timing"] },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    for (const entry of entries) {
      await Knowledge.create(entry);
      console.log("✅ Added:", entry.text);
    }
  } catch (err) {
    console.error("❌ Error adding knowledge entries:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed");
  }
})();
