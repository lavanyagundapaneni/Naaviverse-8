import React, { useState, useEffect } from "react";
import axios from 'axios';

const EditPathForm = ({ selectedPath, onSave, onCancel }) => {
  console.log("EditPathForm is rendering...");
  console.log("Received selectedPath:", selectedPath);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(true);

  const [formData, setFormData] = useState({
    nameOfPath: "",
    description: "",
    program: "",
    path_type: "",
    path_cat: "",
    personality: "",
    financialSituation: [],
    curriculum: [],
    grade: [],
    stream: [],
  });

  useEffect(() => {
    if (selectedPath) {
      setFormData({
        nameOfPath: selectedPath?.nameOfPath || "",
        description: selectedPath?.description || "",
        program: selectedPath?.program || "",
        path_type: selectedPath?.path_type || "",
        path_cat: selectedPath?.path_cat || "",
        personality: selectedPath?.personality || "",
        financialSituation: selectedPath?.financialSituation || [],
        curriculum: selectedPath?.curriculum || [],
        grade: selectedPath?.grade || [],
        stream: selectedPath?.stream || [],
      });
      setShowForm(true); // Ensure form is visible when a new path is selected
    }
  }, [selectedPath]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (e, fieldName) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, [fieldName]: selectedValues });
  };

  const handleSave = async () => {
    if (!selectedPath || !selectedPath._id) {
      setMessage('No path selected.');
      return;
    }

    setLoading(true);

    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== selectedPath[key]) {
        updatedFields[key] = typeof formData[key] === 'string' ? formData[key].toLowerCase() : formData[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      setMessage('No changes made.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(`/api/paths/edit`, {
        pathId: selectedPath._id,
        ...updatedFields,
      });

      console.log("✅ Response:", response.data);
      setMessage('Path updated successfully!');

      setTimeout(() => {
        setMessage('');
        setShowForm(false); // Hide form after success
        onCancel(); // Close form automatically
      }, 2000);
    } catch (error) {
      console.error("❌ API call failed", error.response?.data || error.message);
      setMessage('Failed to update path.');
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) return null; // Hide the form when showForm is false

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      {/* Display message */}
      {message && <p className="text-center text-sm text-green-600">{message}</p>}

      {/* Name */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Name of the Path</label>
        <input
          type="text"
          name="nameOfPath"
          value={formData.nameOfPath}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Program */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Program</label>
        <input
          type="text"
          name="program"
          value={formData.program}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Path Type */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Path Type</label>
        <select
          name="path_type"
          value={formData.path_type}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="immigration">immigration</option>
          <option value="education">education</option>
          <option value="career">career</option>
        </select>
      </div>

      {/* Personality */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Personality</label>
        <select
          name="personality"
          value={formData.personality}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Select Personality</option>
          <option value="Realistic">realistic</option>
          <option value="Investigative">investigative</option>
          <option value="Artistic">artistic</option>
          <option value="Social">social</option>
          <option value="Enterprising">enterprising</option>
          <option value="Conventional">conventional</option>
        </select>
      </div>

      {/* Financial Situation */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Financial Situation</label>
        <select
          multiple
          value={formData.financialSituation}
          onChange={(e) => handleMultiSelectChange(e, "financialSituation")}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="0-25L">0-25L</option>
          <option value="25L-75L">25L-75L</option>
          <option value="75L-3CR">75L-3CR</option>
          <option value="3CR+">3CR+</option>
        </select>
      </div>

       {/* Stream */}
       <div className="mb-3">
        <label className="block text-sm font-medium">Stream</label>
        <select
          multiple
          value={formData.stream}
          onChange={(e) => handleMultiSelectChange(e, "stream")}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="MPC">MPC</option>
          <option value="BIPC">BIPC</option>
          <option value="CEC">CEC</option>
          <option value="MEC">MEC</option>
          <option value="HEC">HEC</option>
        </select>
      </div>

      {/* Curriculum */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Curriculum</label>
        <select
          multiple
          value={formData.curriculum}
          onChange={(e) => handleMultiSelectChange(e, "curriculum")}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="IB">IB</option>
          <option value="IGCSE">IGCSE</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
          <option value="Nordic">Nordic</option>
        </select>
      </div>

      {/* Grade */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Grade</label>
        <select
          multiple
          value={formData.grade}
          onChange={(e) => handleMultiSelectChange(e, "grade")}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="9th">9th</option>
          <option value="10th">10th</option>
          <option value="11th">11th</option>
          <option value="12th">12th</option>
        </select>
      </div>





      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button className="border px-4 py-2 rounded bg-gray-200" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="border px-4 py-2 rounded bg-blue-500 text-white"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditPathForm;
