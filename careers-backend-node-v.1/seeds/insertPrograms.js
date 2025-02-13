const mongoose = require('mongoose');
const Program = require('../models/program.model');

// MongoDB connection string
const DATABASE_URL = 'mongodb+srv://adi:AGmChskREizfDNlc@cluster0.o9lpe.mongodb.net/naavi-mock';

const programs = [
  {
    school: "Massachusetts Institute of Technology (MIT)",
    program: "Bachelor of Architecture",
    description: "MIT's School of Architecture and Planning offers a unique and rigorous Bachelor of Architecture program. Ranked #1 in the world for architecture (QS World University Rankings), this program combines design, technology, and art to prepare students for a career in architecture. Students learn through hands-on projects, collaborative studio work, and cutting-edge research.",
    grade: "Grade 10",
    curriculum: "IB",
    stream: "MPC",
    performance: "86%",
    financialSituation: "50 Lakhs",
    personality: "realistic",
    steps: [
      { _id: new mongoose.Types.ObjectId(), name:"Build a Strong Academic and Creative Foundation:", description:"Focus on excelling in key Grade 12 subjects relevant to architecture, preparing for standardized tests, and compiling a creative portfolio that showcases your design projects and academic achievements."},
      { _id: new mongoose.Types.ObjectId(), name:"Master the University Application Process:", description: "Thoroughly research MIT's Bachelor of Architecture program requirements, develop a compelling personal statement and portfolio, and prepare confidently for interviews to clearly communicate your passion and long-term goals."},
      { _id: new mongoose.Types.ObjectId(), name:"Leverage Opportunities Toward Your Dream Job:", description: "Engage in hands-on projects and research during your university studies, secure internships for real-world experience, and actively network with professionals and mentors in the architecture industry."}
    ]
  },
  {
    school: "California Institute of Technology (Caltech)",
    program: "PhD in Astronomy and Astrophysics",
    description: "Caltech's Astronomy and Astrophysics PhD program is renowned for its research excellence, with a focus on observational and theoretical astronomy. Ranked #1 in the world for astronomy and astrophysics (QS World University Rankings), this program provides students with the opportunity to work closely.",
    grade: "Grade 11",
    curriculum: "CBSE",
    stream: "Science",
    performance: "90%",
    financialSituation: "50 Lakhs",
    personality: "realistic",
    steps: [
      { _id: new mongoose.Types.ObjectId(), name:"Build a Strong Academic and Research Foundation:", description: "Focus on excelling in Grade 12 with a solid performance in CBSE subjects, preparing for any standardized tests, and engaging in preliminary research or astronomy-related projects to build a compelling academic profile."},
      { _id: new mongoose.Types.ObjectId(), name:"Master the PhD Application Process:", description: "Thoroughly research Caltech’s Doctor of Philosophy in Astronomy and Astrophysics program requirements, craft a persuasive statement of purpose that reflects your passion for observational and theoretical astronomy, and compile a robust academic portfolio highlighting your achievements."},
      { _id: new mongoose.Types.ObjectId(), name:"Leverage Opportunities Toward a Distinguished Research Career:", description: "Engage in advanced research projects, internships, and collaborative studies during your undergraduate studies, and actively network with astronomy professionals and mentors to pave the way for a successful career in astrophysics."}
    ]
  },
  {
    school: "Stanford University",
    program: "PhD in Earth System Science - Atmospheric Sciences",
    description: "Stanford University's Department of Earth System Science provides a doctoral program in Atmospheric Sciences, which focuses on the physical, chemical, and biological processes that govern the atmosphere.",
    grade: "Grade 12",
    curriculum: "IGCSE",
    stream: "Science",
    performance: "95%",
    financialSituation: "40 Lakhs",
    personality: "realistic",
    steps: [
      { _id: new mongoose.Types.ObjectId(), name:"Build a Strong Academic and Research Foundation:", description: "Focus on excelling in Grade 12 IGCSE subjects with an emphasis on math, science, and research, while actively engaging in projects or coursework that deepens your understanding of atmospheric sciences."},
      { _id: new mongoose.Types.ObjectId(), name:"Master the PhD Application Process:", description: "Thoroughly research Stanford’s Ph.D. program requirements in Earth System Science - Atmospheric Sciences, craft a compelling statement of purpose that highlights your passion and aptitude for studying the atmosphere, and gather strong academic and research references."},
      { _id: new mongoose.Types.ObjectId(), name:"Leverage Opportunities Toward a Distinguished Research Career:", description: "Engage in advanced research projects, seek internships or collaborative studies in atmospheric sciences, and build a professional network with mentors and industry experts to pave the way for a successful research career."}
    ]
  },
  {
    school: "University of Cambridge",
    program: "Master of Engineering in Advanced Manufacturing and Management",
    description: "The University of Cambridge offers a unique Master's program in Advanced Manufacturing and Management, where students learn cutting-edge engineering techniques and business skills. Ranked among the world's best universities, Cambridge provides access to state-of-the-art research facilities and industry partnerships.",
    grade: "Grade 11",
    curriculum: "CBSE",
    stream: "MPC",
    performance: "80%",
    financialSituation: "60 Lakhs",
    personality: "realistic",
    steps: [
      { _id: new mongoose.Types.ObjectId(), name:"Build a Strong Academic and Technical Foundation:", description: "Focus on excelling in Grade 12 CBSE subjects with a strong emphasis on mathematics, physics, and engineering principles, while also gaining exposure to modern manufacturing concepts through projects or coursework."},
      { _id: new mongoose.Types.ObjectId(), name:"Master the Master's Application Process:", description: "Thoroughly research the University of Cambridge’s Master of Engineering in Advanced Manufacturing and Management program requirements, craft a compelling personal statement that highlights your technical and managerial aspirations, and secure strong academic references."},
      { _id: new mongoose.Types.ObjectId(), name:"Leverage Opportunities Toward a Successful Career in Advanced Manufacturing:", description: "Engage in hands-on projects, internships, and research initiatives that bridge engineering and management, and build a network with industry professionals and mentors to pave the way for future leadership roles in advanced manufacturing."}
    ]
  },
  {
    school: "ETH Zurich",
    program: "Master's in Environmental Science and Sustainability",
    description: "ETH Zurich's Master of Science in Environmental Science and Technology program focuses on sustainable solutions for pressing environmental challenges. Ranked among the top engineering universities, ETH Zurich provides students with a strong foundation in environmental science, engineering, and technology.",
    grade: "Grade 11",
    curriculum: "IB",
    stream: "Environmental Science",
    performance: "88%",
    financialSituation: "50 Lakhs",
    personality: "realistic",
    steps: [
      { _id: new mongoose.Types.ObjectId(), name:"Build a Strong Academic and Scientific Foundation:", description: "Focus on excelling in your Grade 12 IB curriculum, particularly in subjects that strengthen your background in environmental science and technology, and engage in projects that reflect your passion for sustainability."},
      { _id: new mongoose.Types.ObjectId(), name:"Master the Master's Application Process:", description: "Thoroughly research ETH Zurich’s program requirements, craft a compelling personal statement that highlights your commitment to sustainable solutions, and secure strong academic references that attest to your technical and scientific aptitude."},
      { _id: new mongoose.Types.ObjectId(), name:"Leverage Opportunities Toward a Leading Career in Environmental Science:", description: "Engage in hands-on research, internships, and collaborative projects that address real-world environmental challenges, and build a network with professionals and mentors to pave the way for a successful career in environmental science and technology."}
    ]
  },
  {
    school: "University of Tokyo",
    program: "PhD in Robotics and Mechatronics",
    description: "As a global leader in robotics and mechatronics research, the University of Tokyo offers a Doctor of Philosophy program tailored for students seeking to advance in this field. Students will work alongside world-renowned researchers and have access to state-of-the-art laboratories, fostering groundbreaking research in robotics and automation.",
    grade: "Grade 12",
    curriculum: "CBSE",
    stream: "Engineering",
    performance: "90%",
    financialSituation: "55 Lakhs",
    personality: "realistic",
    steps: [
      { _id: new mongoose.Types.ObjectId(), name:"Build a Strong Academic and Technical Foundation:", description: "Focus on excelling in your Grade 12 CBSE curriculum with an emphasis on subjects that foster strong analytical and technical skills, and engage in robotics or automation projects to build a solid foundation."},
      { _id: new mongoose.Types.ObjectId(), name:"Master the PhD Application Process:", description: "Thoroughly research the University of Tokyo’s PhD program requirements in Robotics and Mechatronics, craft a compelling statement of purpose that highlights your passion and aptitude for robotics research, and secure strong academic references."},
      { _id: new mongoose.Types.ObjectId(), name:"Leverage Opportunities for Cutting-Edge Research in Robotics:", description: "Engage in advanced research projects, internships, and collaborative initiatives in robotics and automation, and build a network with industry experts and mentors to pave the way for a groundbreaking research career."}
    ]
  },
  {
    school: "University of Oxford",
    program: "MSc in Global Health Sciences",
    description: "The University of Oxford, a world-renowned institution, offers a Master of Science in Global Health Sciences program that provides students with a comprehensive understanding of global health issues. With a focus on research and practical experience, students learn to address health challenges in low- and middle-income countries.",
    grade: "Grade 12",
    curriculum: "IB",
    stream: "Biology",
    performance: "92%",
    financialSituation: "60 Lakhs",
    personality: "realistic",
    steps: [
      { _id: new mongoose.Types.ObjectId(), name:"Build a Strong Academic and Research Foundation:", description: "Focus on excelling in your Grade 12 IB curriculum, particularly in biology and related sciences, while gaining exposure to global health challenges through research projects, internships, or volunteer work in healthcare settings."},
      { _id: new mongoose.Types.ObjectId(), name:"Master the Master's Application Process:", description: "Thoroughly research the University of Oxford’s MSc in Global Health Sciences requirements, craft a compelling personal statement highlighting your passion for public health and research experience, and secure strong academic references from mentors or professionals in the field."},
      { _id: new mongoose.Types.ObjectId(), name:"Leverage Opportunities for a Global Health Career:", description: "Engage in hands-on research, fieldwork, and collaborations with international health organizations, and build a strong network with professionals and mentors to pave the way for a successful career in global health policy, epidemiology, or public health leadership."}
    ]
  },
  {
    school: "National University of Singapore",
    program: "Bachelor of Data Analytics and Business Intelligence",
    description: "NUS’s program integrates data science with business insights, preparing students for roles in global enterprises. With a focus on big data, machine learning, and predictive analytics, this program consistently ranks among Asia’s top data science offerings.",
    grade: "Grade 12",
    curriculum: "IB",
    stream: "MPC",
    performance: "76%-85%",
    financialSituation: "25%-75% Lakhs",
    personality: "realistic",
    steps: [
      { _id: new mongoose.Types.ObjectId(), name:"Build a Strong Academic and Technical Foundation:", description: "Focus on excelling in Grade 12 IB subjects, particularly in computer science, mathematics, and statistics, while gaining hands-on experience with data analytics tools and programming languages like Python, R, and SQL."},
      { _id: new mongoose.Types.ObjectId(), name:"Master the University Application Process:", description: "Thoroughly research the National University of Singapore’s Bachelor of Data Analytics and Business Intelligence program requirements, craft a compelling personal statement showcasing your analytical skills and passion for data science, and secure strong academic references."},
      { _id: new mongoose.Types.ObjectId(), name:"Leverage Opportunities Toward a Career in Data Analytics:", description: "Engage in internships, research projects, and competitions focused on data analytics and machine learning, and build a strong professional network to secure opportunities in top global enterprises and tech-driven industries."}
    ]
  },
  {
    school: "University of British Columbia",
    program: "Master of Forestry in Urban Forest Management",
    description: "UBC’s program addresses the challenges of sustainable urban forestry, combining ecological science with urban planning. Students work on projects in Vancouver’s renowned green spaces, gaining expertise in urban biodiversity and climate resilience.",
    grade: "Grade 12",
    curriculum: "CBSE",
    stream: "Environmental Science",
    performance: "96%-100%",
    financialSituation: "50 Lakhs",
    personality: "realistic",
    steps: [
      { _id: new mongoose.Types.ObjectId(), name:"Build a Strong Academic and Environmental Science Foundation:", description: "Focus on excelling in Grade 12 CBSE subjects, particularly in environmental science and biology, while gaining hands-on experience through conservation projects, ecological research, or sustainability initiatives."},
      { _id: new mongoose.Types.ObjectId(), name:"Master the Master's Application Process:", description: "Thoroughly research the University of British Columbia’s Master of Forestry in Urban Forest Management program requirements, craft a compelling personal statement showcasing your passion for urban biodiversity and climate resilience, and secure strong academic references."},
      { _id: new mongoose.Types.ObjectId(), name:"Leverage Opportunities Toward a Career in Urban Forestry:", description: "Engage in field research, internships, and collaborative projects on sustainable forestry and urban planning, and build a strong network with professionals and mentors to establish a career in environmental conservation and urban forest management."}
    ]
  },
  {
    school: "Technische Universität Berlin",
    program: "Master of Science in Mechanical Engineering",
    description: "TU Berlin is one of Germany's most renowned institutions for engineering education. The Master of Science in Mechanical Engineering (M.Sc. MASchI) program offers students a comprehensive education in mechanical engineering, focusing on the latest research and applications in areas such as mechatronics, materials science, thermodynamics, and control engineering.",
    grade: "Grade 12",
    curriculum: "ICSE",
    stream: "MPC",
    performance: "86%-95%",
    financialSituation: "75 Lakhs-3CR",
    personality: "realistic",
    steps: [
      { _id: new mongoose.Types.ObjectId(), name:"Build a Strong Academic and Engineering Foundation:", description: "Focus on excelling in Grade 12 ICSE subjects, particularly in mathematics, physics, and mechanical engineering fundamentals, while gaining hands-on experience through technical projects, robotics competitions, or research initiatives."},
      { _id: new mongoose.Types.ObjectId(), name:"Master the Master's Application Process:", description: "Thoroughly research Technische Universität Berlin’s Master of Science in Mechanical Engineering program requirements, craft a compelling personal statement highlighting your expertise in mechatronics, materials science, or thermodynamics, and secure strong academic references."},
      { _id: new mongoose.Types.ObjectId(), name:"Leverage Opportunities Toward a Career in Mechanical Engineering:", description: "Engage in research projects, internships, and collaborative studies in advanced mechanical systems, and build a strong professional network with industry experts and mentors to secure roles in top engineering firms or pursue doctoral research."}
    ]
  },
  {
    school: "Harvard University",
    program: "Bachelor of Arts in Liberal Arts",
    description: "Harvard University, founded in 1636, offers a world-renowned liberal arts program that nurtures critical thinking, creativity, and leadership skills. Students explore diverse disciplines while benefiting from Harvard's extensive academic resources.",
    grade: "Grade 12",
    curriculum: "IB",
    stream: "Humanities",
    performance: "76%-85%",
    financialSituation: "25 Lakhs - 75 Lakhs",
    personality: "realistic",
    steps: [
      { _id: new mongoose.Types.ObjectId(), name:"Build a Strong Academic and Critical Thinking Foundation:", description: "Focus on excelling in Grade 12 IB subjects, particularly in humanities and social sciences, while engaging in extracurricular activities, leadership roles, and community projects that demonstrate critical thinking and creativity."},
      { _id: new mongoose.Types.ObjectId(), name:"Master the University Application Process:", description: "Thoroughly research Harvard University’s Bachelor of Arts (A.B.) in Liberal Arts program requirements, craft a compelling personal statement that highlights your intellectual curiosity and leadership potential, and secure strong letters of recommendation from mentors or educators."},
      { _id: new mongoose.Types.ObjectId(), name:"Leverage Opportunities Toward a Distinguished Career in Humanities:", description: "Engage in interdisciplinary research, internships, and networking opportunities across various fields, and build connections with professionals and mentors to prepare for a career in academia, media, policymaking, or entrepreneurship."}
    ]
  },

  {
    school: "University of Cape Town",
    program: "Master of Science in Marine Biology",
    description:
      "The University of Cape Town offers a Marine Biology program, enabling students to study diverse marine ecosystems and engage in advanced research. This program is ideal for students interested in marine biodiversity and conservation.",
    grade: "Grade 12",
    curriculum: "CBSE",
    stream: "BIPC",
    performance: "76%-85%",
    financialSituation: "25 Lakhs - 75 Lakhs",
    personality: "realistic",
    steps: [
      { _id: new mongoose.Types.ObjectId(), name:"Build a Strong Academic and Scientific Foundation:", description: "Excel in Grade 12 CBSE subjects, particularly in biology and environmental science, while gaining hands-on experience through marine conservation projects, internships, or research initiatives focused on marine biodiversity."},
      { _id: new mongoose.Types.ObjectId(), name:"Master the Master's Application Process:", description: "Thoroughly research the University of Cape Town’s Master of Science in Marine Biology program requirements, craft a compelling personal statement showcasing your passion for marine ecosystems and conservation, and secure strong academic recommendations from mentors or professors."},
      { _id: new mongoose.Types.ObjectId(), name:"Leverage Opportunities for a Career in Marine Biology:", description: "Engage in field research, internships, and collaborations with marine research institutions, participate in global conservation initiatives, and build a strong professional network with scientists and policymakers to establish a successful career in marine ecology, oceanography, or environmental sustainability."}
    ]
  }
  // Remaining programs...
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
