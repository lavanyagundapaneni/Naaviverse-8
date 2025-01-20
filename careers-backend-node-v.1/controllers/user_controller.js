const User = require('../models/users.model') // Your User model for saving profile data

// Controller to add profile data for Level 1
const addUserProfile = async (req, res) => {
    const { email, name, country, state, city, postalCode, profilePicture, username, phoneNumber } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        // Check if the profile is incomplete
        const isProfileComplete =
          existingUser.name &&
          existingUser.country &&
          existingUser.state &&
          existingUser.city &&
          existingUser.postalCode &&
          existingUser.profilePicture &&
          existingUser.username &&
          existingUser.phoneNumber;
  
        if (isProfileComplete) {
          return res.status(400).json({ status: false, message: 'User profile is already complete' });
        }
  
        // Update the existing incomplete profile
        existingUser.name = name;
        existingUser.country = country;
        existingUser.state = state;
        existingUser.city = city;
        existingUser.postalCode = postalCode;
        existingUser.profilePicture = profilePicture;
        existingUser.username = username;
        existingUser.phoneNumber = phoneNumber;
  
        const updatedUser = await existingUser.save();
  
        return res.status(200).json({
          status: true,
          message: 'Profile updated successfully',
          data: updatedUser,
        });
      }
  
      // Create a new user profile if it doesn't exist
      const newUser = new User({
        email,
        name,
        country,
        state,
        city,
        postalCode,
        profilePicture,
        username,
        phoneNumber,
      });
  
      const savedUser = await newUser.save();
  
      res.status(200).json({
        status: true,
        message: 'Profile created successfully',
        data: savedUser,
      });
    } catch (error) {
      console.error('Error in addUserProfile:', error);
      res.status(500).json({ status: false, message: 'Internal server error' });
    }
  };
  

const getUserProfile = async (req, res) => {
    const { email } = req.params;  // Retrieve the email from the request params
  
    try {
      // Find the user profile by email
      const user = await User.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
      }
  
      // Check if all required profile details are present
      const isProfileComplete =
        user.name &&
        user.country &&
        user.state &&
        user.city &&
        user.postalCode &&
        user.profilePicture &&
        user.username &&
        user.phoneNumber;
  
      if (isProfileComplete) {
        // If profile is complete, return the profile data
        return res.status(200).json({
          status: true,
          message: 'Profile retrieved successfully',
          data: user,
        });
      } else {
        // If profile is incomplete, return the profile data with an indication that the profile is incomplete
        return res.status(200).json({
          status: true,
          message: 'Profile exists but is incomplete. Please update your profile.',
          data: user,
          profileIncomplete: true,  // Indicate that the profile is incomplete
        });
      }
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      res.status(500).json({ status: false, message: 'Internal server error' });
    }
  };
  

module.exports = { 
    addUserProfile,
    getUserProfile,
 };
