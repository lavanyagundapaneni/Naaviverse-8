const mongoose = require('mongoose');
const Program = require('../models/program.model');

// MongoDB connection string
const DATABASE_URL = 'mongodb+srv://adi:AGmChskREizfDNlc@cluster0.o9lpe.mongodb.net/naavi-mock';

  const programs = [
    {
      school: "Massachusetts Institute of Technology (MIT)",
      program: "Bachelor of Architecture",
      description:
        "MIT's School of Architecture and Planning offers a unique and rigorous Bachelor of Architecture program. Ranked #1 in the world for architecture (QS World University Rankings), this program combines design, technology, and art to prepare students for a career in architecture. Students learn through hands-on projects, collaborative studio work, and cutting-edge research.",
      grade: "Grade 12",
      curriculum: "IB",
      stream: "MPC",
      performance: "86%",
      financialSituation: "50 Lakhs",
      personality: "Realistic",
    },
    {
      school: "California Institute of Technology (Caltech)",
      program: "Doctor of Philosophy in Astronomy and Astrophysics",
      description:
        "Caltech's Astronomy and Astrophysics PhD program is renowned for its research excellence, with a focus on observational and theoretical astronomy. Ranked #1 in the world for astronomy and astrophysics (QS World University Rankings), this program provides students with the opportunity to work closely.",
      grade: "Grade 12",
      curriculum: "CBSE",
      stream: "MPC",
      performance: "92%",
      financialSituation: "30 Lakhs",
      personality: "Realistic",
    },
    {
      school: "Stanford University",
      program: "Ph.D. in Earth System Science - Atmospheric Sciences",
      description:
        "Stanford University's Department of Earth System Science provides a doctoral program in Atmospheric Sciences, which focuses on the physical, chemical, and biological processes that govern the atmosphere.",
      grade: "Grade 12",
      curriculum: "IGCSE",
      stream: "MPC",
      performance: "90%",
      financialSituation: "40 Lakhs",
      personality: "Realistic",
    },
    {
      school: "University of Cambridge, UK",
      program: "Master of Engineering in Advanced Manufacturing and Management",
      description:
        "The University of Cambridge offers a unique Master's program in Advanced Manufacturing and Management, where students learn cutting-edge engineering techniques and business skills. Ranked among the world's best universities, Cambridge provides access to state-of-the-art research facilities and industry partnerships.",
      grade: "Grade 12",
      curriculum: "CBSE",
      stream: "MEC",
      performance: "88%",
      financialSituation: "60 Lakhs",
      personality: "Realistic",
    },
    {
      school: "ETH Zurich – Swiss Federal Institute of Technology, Switzerland",
      program: "Master of Science in Environmental Science and Technology",
      description:
        "ETH Zurich's Master of Science in Environmental Science and Technology program focuses on sustainable solutions for pressing environmental challenges. Ranked among the top engineering universities, ETH Zurich provides students with a strong foundation in environmental science, engineering, and technology.",
      grade: "Grade 12",
      curriculum: "IB",
      stream: "Environmental Science",
      performance: "85%",
      financialSituation: "35 Lakhs",
      personality: "Realistic",
    },
    {
      school: "University of Tokyo",
      program: "Doctor of Philosophy in Robotics and Mechatronics",
      description:
        "As a global leader in robotics and mechatronics research, the University of Tokyo offers a Doctor of Philosophy program tailored for students seeking to advance in this field. Students will work alongside world-renowned researchers and have access to state-of-the-art laboratories, fostering groundbreaking research in robotics and automation.",
      grade: "Grade 12",
      curriculum: "CBSE",
      stream: "MPC",
      performance: "95%",
      financialSituation: "70 Lakhs",
      personality: "Realistic",
    },
    {
      school: "University of Oxford",
      program: "Master of Science in Global Health Sciences",
      description:
        "The University of Oxford, a world-renowned institution, offers a Master of Science in Global Health Sciences program that provides students with a comprehensive understanding of global health issues. With a focus on research and practical experience, students learn to address health challenges in low- and middle-income countries.",
      grade: "Grade 12",
      curriculum: "IB",
      stream: "Biology",
      performance: "91%",
      financialSituation: "45 Lakhs",
      personality: "Realistic",
    },
    {
      school: "National University of Singapore (NUS)",
      program: "Bachelor of Data Analytics and Business Intelligence",
      description:
        "NUS’s program integrates data science with business insights, preparing students for roles in global enterprises. With a focus on big data, machine learning, and predictive analytics, this program consistently ranks among Asia’s top data science offerings.",
      grade: "Grade 12",
      curriculum: "IB",
      stream: "Computer Science",
      performance: "89%",
      financialSituation: "55 Lakhs",
      personality: "Realistic",
    },
    {
      school: "University of British Columbia (UBC)",
      program: "Master of Forestry in Urban Forest Management",
      description:
        "UBC’s program addresses the challenges of sustainable urban forestry, combining ecological science with urban planning. Students work on projects in Vancouver’s renowned green spaces, gaining expertise in urban biodiversity and climate resilience.",
      grade: "Grade 12",
      curriculum: "CBSE",
      stream: "Environmental Science",
      performance: "84%",
      financialSituation: "30 Lakhs",
      personality: "Realistic",
    },
    {
      school: "Technische Universität Berlin (Berlin University of Technology)",
      program: "Master of Science in Mechanical Engineering (M.Sc. MASchI)",
      description:
        "TU Berlin is one of Germany's most renowned institutions for engineering education. The Master of Science in Mechanical Engineering (M.Sc. MASchI) program offers students a comprehensive education in mechanical engineering, focusing on the latest research and applications in areas such as mechatronics, materials science, thermodynamics, and control engineering.",
      grade: "Grade 12",
      curriculum: "ICSE",
      stream: "MEC",
      performance: "90%",
      financialSituation: "40 Lakhs",
      personality: "Realistic",
    },
    {
      school: "Harvard University",
      program: "Bachelor of Arts (A.B.) in Liberal Arts",
      description:
        "Harvard University, founded in 1636, offers a world-renowned liberal arts program that nurtures critical thinking, creativity, and leadership skills. Students explore diverse disciplines while benefiting from Harvard's extensive academic resources.",
      grade: "Grade 12",
      curriculum: "IB",
      stream: "Humanities",
      performance: "87%",
      financialSituation: "80 Lakhs",
      personality: "Realistic",
    },
    {
      school: "University of Cape Town",
      program: "Master of Science in Marine Biology",
      description:
        "The University of Cape Town offers a Marine Biology program, enabling students to study diverse marine ecosystems and engage in advanced research. This program is ideal for students interested in marine biodiversity and conservation.",
      grade: "Grade 12",
      curriculum: "CBSE",
      stream: "BIPC",
      performance: "80%",
      financialSituation: "25 Lakhs",
      personality: "Realistic",
    },
  ];
  
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return Program.insertMany(programs);
  })
  .then(() => {
    console.log('Data successfully inserted');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB or inserting data:', err);
  });
