

const express = require("express");
const router = express.Router();
const UserPathSelection = require("../models/userpaths.model");
const Path = require("../models/program.model");

// API to store or return selected path
router.post("/selectpath", async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        const { email, pathId } = req.body;

        if (!email || !pathId) {
            return res.status(400).json({ message: "User email and pathId are required" });
        }

        // Check if the path is already selected by the user
        let existingSelection = await UserPathSelection.findOne({ userEmail: email, pathId });

        if (existingSelection) {
            return res.status(200).json({
                message: "Path already selected",
                data: existingSelection,
            });
        }

        // Fetch path details to get steps
        const path = await Path.findById(pathId);
        if (!path) {
            return res.status(404).json({ message: "Path not found" });
        }

        // Prepare steps data
        const steps = path.steps.map(step => ({
            stepId: step._id,
            name: step.name,
            description: step.description,
        }));

        // Create a new UserPathSelection entry
        const newSelection = new UserPathSelection({
            userEmail: email,
            pathId,
            steps,
        });

        console.log("New Selection Object before saving:", newSelection);

        // Save to DB
        await newSelection.save();

        console.log("New Selection saved successfully!");

        res.status(201).json({ message: "Path selected successfully", data: newSelection });

    } catch (error) {
        console.error("Error selecting path:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/steps/get", async (req, res) => {
    try {
        const { step_id } = req.query;
        if (!step_id) {
            return res.status(400).json({ status: false, message: "Step ID is required" });
        }

        // Find the document containing the step
        const userPath = await UserPathSelection.findOne({ "steps.stepId": step_id });

        if (!userPath) {
            return res.status(404).json({ status: false, message: "Step not found" });
        }

        // Extract the step with the given stepId
        const step = userPath.steps.find(s => s.stepId.toString() === step_id);

        if (!step) {
            return res.status(404).json({ status: false, message: "Step not found" });
        }

        return res.status(200).json({ status: true, data: step });
    } catch (error) {
        console.error("Error fetching step:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
});


module.exports = router;

