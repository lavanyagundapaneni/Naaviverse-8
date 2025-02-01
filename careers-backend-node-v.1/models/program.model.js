const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  school: { type: String, required: true },
  program: { type: String, required: true },
  description: { type: String, required: true },
  grade: { type: String, required: false }, // e.g., "Grade 10", "Grade 12"
  curriculum: { type: String, required: false }, // e.g., "CBSE", "IB", "IGCSE"
  stream: { type: String, required: false }, // e.g., "Science", "Commerce", "Arts"
  performance: { type: String, required: false }, // e.g., "High", "Medium", "Low"
  financialSituation: { type: String, required: false }, // e.g., ">25 Lakhs", "<25 Lakhs"
  personality: { type: String, required: false }, // e.g., "Analytical", "Creative"
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
