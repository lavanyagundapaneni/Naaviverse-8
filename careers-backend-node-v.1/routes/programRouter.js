const express = require('express');
const router = express.Router();
const Program = require('../models/program.model');

// Fetch programs with filters
router.get('/programs', async (req, res) => {
  try {
    const { grade, curriculum, stream, performance, financialSituation, personality } = req.query;
    
    // Build the query object
    const query = {};

    if (grade) query.grade = new RegExp(grade, 'i');  // Case-insensitive match for grade
    if (curriculum) query.curriculum = new RegExp(curriculum, 'i');  // Case-insensitive match for curriculum
    if (stream) query.stream = new RegExp(stream, 'i');  // Case-insensitive match for stream
    if (performance) query.performance = new RegExp(performance, 'i');  // Case-insensitive match for performance
    if (financialSituation) query.financialSituation = new RegExp(financialSituation, 'i');  // Case-insensitive match for financialSituation
    if (personality) query.personality = new RegExp(personality, 'i');  // Case-insensitive match for personality

    console.log('Query:', query);  // Log the query for debugging

    // Fetch programs matching the query
    const programs = await Program.find(query);
    
    // Return the result
    res.status(200).json({ data: programs });
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'Failed to fetch programs', error });
  }
});




// Endpoint to fetch steps for a specific path
router.get("/steps", async (req, res) => {
  try {
    const pathId = req.query.pathId;

    if (!pathId) {
      return res.status(400).json({
        success: false,
        message: "pathId is required in the query parameters.",
      });
    }

    // Fetch the full path details from the database
    const path = await Program.findById(pathId);

    if (!path) {
      return res.status(404).json({
        success: false,
        message: "Path not found.",
      });
    }

    // Return full details including steps
    res.status(200).json({
      success: true,
      data: {
        _id: path._id,
        school: path.school,
        program: path.program,
        description: path.description,
        steps: path.steps,
      },
    });
  } catch (error) {
    console.error("Error fetching path details and steps:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});




module.exports = router;
