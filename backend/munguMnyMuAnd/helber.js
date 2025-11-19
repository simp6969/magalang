const { model, Schema } = require("mongoose");

// Schema options to reduce memory overhead and add timestamps for better tracking
const schemaOpts = { timestamps: true, minimize: true, strict: true, versionKey: false };

const Score = new Schema(
  {
    score: { type: Number, index: true, required: true },
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    userid: { type: String, required: true, index: true },
  },
  schemaOpts
);

const Photo = new Schema(
  {
    userid: { type: String, required: true, index: true },
    // Keep as String for API compatibility; validate size at controller level
    base64: { type: String, required: true },
    // Optional metadata for future optimization
    mime: { type: String, default: "image/png" },
  },
  schemaOpts
);

// Compound index if we frequently query latest by user
Score.index({ userid: 1, score: -1 });
Photo.index({ userid: 1, createdAt: -1 });

const ScoreModel = model("Score", Score);
const PhotoModel = model("Photo", Photo);

module.exports = { PhotoModel, ScoreModel };
