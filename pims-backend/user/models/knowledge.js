const mongoose = require("mongoose");

const knowledgeSchema = new mongoose.Schema({
  text: { type: String, required: true },
  tags: [{ type: String, lowercase: true }],
  createdAt: { type: Date, default: Date.now },
});

const Knowledge = mongoose.model("Knowledge", knowledgeSchema);

async function seedKnowledge() {
  const count = await Knowledge.countDocuments();
  if (count === 0) {
    const knowledgeData = [
      { text: "Hello! How can I assist you today?", tags: ["greeting"] },
      { text: "Our office hours are 9am - 5pm, Monday to Friday.", tags: ["hours", "office"] },
      { text: "You can report issues from your user dashboard.", tags: ["report", "dashboard"] },
      { text: "Feedback helps us improve our services.", tags: ["feedback", "improve"] },
      { text: "Our team resolves user issues within 24 hours.", tags: ["support", "timing"] },
    ];
    await Knowledge.insertMany(knowledgeData);
    console.log("✅ Knowledge seeded successfully!");
  }
}

module.exports = { Knowledge, seedKnowledge };
