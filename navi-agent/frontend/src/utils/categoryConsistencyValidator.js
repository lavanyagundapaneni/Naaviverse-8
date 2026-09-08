/**
 * Category Consistency Validation Layer
 * 
 * Analyzes whether Current Position and Destination Goal semantically and logically
 * belong to the selected Category across all 4 system categories:
 *  - Academics (`academic`)
 *  - Practical Skills (`practical`)
 *  - Jobs & Careers (`jobs`)
 *  - Non-Academic Counselling (`non_academic`)
 */

import { SEGMENTS } from "../constants/segments.js";

export const CATEGORY_KEYS = {
  ACADEMICS: SEGMENTS.ACADEMICS || "academic",
  PRACTICAL: SEGMENTS.PRACTICAL || "practical",
  JOBS_CAREERS: SEGMENTS.JOBS_CAREERS || "jobs",
  NON_ACADEMIC: SEGMENTS.NON_ACADEMIC_COUNSELLING || "non_academic",
};

export const CATEGORY_META = {
  [CATEGORY_KEYS.ACADEMICS]: {
    key: CATEGORY_KEYS.ACADEMICS,
    label: "Academics",
    fullName: "Academic & Research",
    description: "Higher education, college degrees, universities, schools, grades, and academic research",
    color: "#4285F4",
  },
  [CATEGORY_KEYS.PRACTICAL]: {
    key: CATEGORY_KEYS.PRACTICAL,
    label: "Practical Skills",
    fullName: "Practical & Skills",
    description: "Hands-on skill learning, project portfolios, technical proficiency, and certifications",
    color: "#0F9D58",
  },
  [CATEGORY_KEYS.JOBS_CAREERS]: {
    key: CATEGORY_KEYS.JOBS_CAREERS,
    label: "Jobs & Careers",
    fullName: "Jobs & Careers",
    description: "Industry roles, employment, career transitions, promotions, and workplace readiness",
    color: "#F4B400",
  },
  [CATEGORY_KEYS.NON_ACADEMIC]: {
    key: CATEGORY_KEYS.NON_ACADEMIC,
    label: "Non-Academic Counselling",
    fullName: "Non-Academic Counselling",
    description: "Mental health, wellness, personal development, guidance, and stress management",
    color: "#AB47BC",
  },
};

export function normalizeCategoryKey(rawKey) {
  if (!rawKey) return "";
  const s = String(rawKey).toLowerCase().trim();
  if (s.includes("non_academic") || s.includes("non-academic") || s.includes("counsel") || s.includes("wellness") || s.includes("mental")) {
    return CATEGORY_KEYS.NON_ACADEMIC;
  }
  if (s === "jobs" || s.includes("job") || s.includes("career") || s.includes("profession")) {
    return CATEGORY_KEYS.JOBS_CAREERS;
  }
  if (s === "practical" || s.includes("practical") || s.includes("skill")) {
    return CATEGORY_KEYS.PRACTICAL;
  }
  if (s === "academic" || s.includes("academic") || s.includes("school") || s.includes("universit") || s.includes("degree")) {
    return CATEGORY_KEYS.ACADEMICS;
  }
  return s;
}

// Domain semantic vocabularies with weighted signal strengths
const LEXICON = {
  [CATEGORY_KEYS.ACADEMICS]: {
    // High-weight indicators unique to academic paths
    strong: [
      "bachelor's", "bachelors", "bachelor", "master's", "masters", "master of", "phd", "ph.d", "doctorate",
      "undergraduate", "postgraduate", "b.tech", "m.tech", "btech", "mtech", "b.sc", "m.sc", "bsc", "msc",
      "bba", "mba", "associate degree", "diploma in", "cbse", "icse", "igcse", "ib diploma", "high school",
      "grade 10", "grade 11", "grade 12", "class 10", "class 12", "sat exam", "sat score", "act exam",
      "gre score", "gmat", "ielts", "toefl", "jee advanced", "jee main", "neet exam", "board exam",
      "admissions", "university admission", "college admission", "scholarship", "thesis", "dissertation",
      "academic research", "professorship", "honors program", "cgpa", "gpa 3.", "gpa 4.", "school student",
      "college student", "undergrad student", "pre-university", "lateral entry"
    ],
    // Medium-weight indicators
    medium: [
      "university", "college", "campus", "curriculum", "syllabus", "semester", "faculty", "dean",
      "freshman", "sophomore", "stanford", "harvard", "mit", "oxford", "cambridge", "iit", "bits pilani",
      "yale", "princeton", "columbia", "berkeley", "ucla", "nyu", "cornell", "caltech", "iim"
    ],
    // Structural Academic Regex: Degree • Program • University • Country
    regex: [
      /(?:bachelor|master|phd|b\.?tech|m\.?tech|bsc|msc|mba|undergraduate|postgraduate)\s+(?:in|of)\s+[^•]+•/i,
      /grade\s*(?:[1-9]|1[0-2])\b/i,
      /\b(?:cbse|icse|igcse|ib)\b/i,
      /\b(?:class\s*(?:[1-9]|1[0-2]))\b/i,
      /\b(?:sat|act|gre|gmat|ielts|toefl|jee|neet)\s*(?:prep|score|exam)?\b/i,
    ]
  },

  [CATEGORY_KEYS.PRACTICAL]: {
    strong: [
      "learn to code", "learn python", "learn react", "learn javascript", "build portfolio", "project portfolio",
      "hands-on project", "hands-on projects", "deployed project", "deployed projects", "open source contribution",
      "github portfolio", "behance portfolio", "aws certified", "cloud practitioner", "certified developer",
      "bootcamp", "coding bootcamp", "master blender", "master figma", "master prompt engineering",
      "build 5 projects", "build full-stack", "proof of work", "technical proficiency", "practical skills",
      "beginner learner", "self-study", "self-taught", "learning web development", "learn machine learning",
      "certifications", "certified solutions architect", "ui/ux design portfolio", "video editing skills"
    ],
    medium: [
      "beginner", "hands-on", "portfolio", "framework", "library", "tutorial", "mini project", "capstone project",
      "proficiency", "practical", "figma", "blender", "photoshop", "premiere pro", "docker", "kubernetes",
      "learn", "mastering", "skill set", "tooling"
    ],
    regex: [
      /\b(?:learn|learning|master|mastering|build|develop)\s+(?:python|javascript|react|full-stack|figma|blender|aws|cloud|ai|skills|projects?)\b/i,
      /\bbuild\s+(?:a\s+)?(?:\d+\s+)?(?:deployed\s+)?projects?\b/i,
      /\b(?:github|behance)\s+portfolio\b/i,
      /\b(?:aws|azure|gcp|meta|google)\s+certified\b/i,
      /\b(?:self-taught|beginner)\s+(?:developer|coder|learner|student)\b/i,
    ]
  },

  [CATEGORY_KEYS.JOBS_CAREERS]: {
    strong: [
      "software developer", "software engineer", "senior software engineer", "senior developer", "junior developer",
      "junior software developer", "frontend developer", "backend developer", "full stack developer",
      "data scientist", "machine learning engineer", "devops engineer", "cloud architect", "solutions architect",
      "product manager", "senior product manager", "associate product manager", "project manager",
      "business analyst", "management consultant", "investment banker", "marketing manager", "sales manager",
      "executive", "vp of", "director of", "cto", "ceo", "cfo", "chief technology officer",
      "years experience", "yrs experience", "years of experience", "yrs exp", "career transition", "job search",
      "get hired", "hiring", "salary", "compensation", "faang", "tech lead", "engineering manager",
      "staff engineer", "principal engineer", "workplace readiness", "corporate job", "switch career to"
    ],
    medium: [
      "engineer", "developer", "manager", "analyst", "consultant", "specialist", "coordinator", "officer",
      "associate", "lead", "promotion", "promoted", "employer", "industry", "company", "firm", "startup",
      "resume", "interview prep", "mock interview", "recruiter", "headhunter"
    ],
    regex: [
      /\b(?:junior|senior|lead|staff|principal|chief|associate|vp|director|head of)\s+[a-z\s]+(?:engineer|developer|manager|analyst|consultant|designer|officer)\b/i,
      /\b(?:software|frontend|backend|full[- ]?stack|data|devops|cloud|qa|ml|ai)\s+(?:engineer|developer)\b/i,
      /\b\d+\+?\s*(?:years?|yrs?)(?:\s+of)?\s+experience\b/i,
      /\b(?:get\s+hired|transition\s+to|switch\s+(?:careers?\s+)?to|promoted\s+to)\b/i,
      /\b(?:at|for)\s+(?:google|microsoft|amazon|apple|meta|faang|netflix|mckinsey|goldman|uber)\b/i,
    ]
  },

  [CATEGORY_KEYS.NON_ACADEMIC]: {
    strong: [
      "mental health", "wellbeing", "well-being", "wellness", "stress management", "stress resilience",
      "exam anxiety", "social anxiety", "overcome anxiety", "depression", "burnout", "overwhelmed",
      "procrastination", "study-life balance", "work-life balance", "time management", "habit building",
      "routine building", "mindfulness", "meditation", "emotional regulation", "self-esteem", "imposter syndrome",
      "life coaching", "counselling", "counseling", "relationship guidance", "family guidance", "family pressure",
      "personal development", "sleep schedule", "daily routine", "lack of clarity", "career confusion",
      "motivation issues", "burnout recovery", "decision support", "work-life harmony"
    ],
    medium: [
      "anxiety", "stress", "resilience", "habits", "routine", "coping", "emotions", "guidance",
      "focus", "clarity", "balance", "therapy", "counselor", "psychologist", "support", "mindset",
      "overcoming", "confidence"
    ],
    regex: [
      /\b(?:stress|anxiety|burnout|depression|overwhelm(?:ed)?)\b/i,
      /\b(?:study-life|work-life)\s+(?:balance|harmony)\b/i,
      /\b(?:mental|emotional)\s+(?:health|wellbeing|resilience|regulation)\b/i,
      /\b(?:time\s+management|routine\s+building|habit\s+formation|stop\s+procrastinat(?:ing|ion))\b/i,
      /\b(?:relationship|family)\s+(?:guidance|conflict|pressure)\b/i,
    ]
  }
};

/**
 * Common shared / ambiguous terms that should NOT trigger a confident mismatch on their own
 */
const AMBIGUOUS_TERMS = [
  "data science", "computer science", "artificial intelligence", "machine learning",
  "business", "design", "marketing", "finance", "management", "consulting",
  "technology", "tech", "student", "learning", "study", "skills", "goals"
];

/**
 * Score a single text string against all 4 categories.
 */
export function scoreTextCategories(text) {
  if (!text || typeof text !== "string") {
    return {
      scores: {
        [CATEGORY_KEYS.ACADEMICS]: 0,
        [CATEGORY_KEYS.PRACTICAL]: 0,
        [CATEGORY_KEYS.JOBS_CAREERS]: 0,
        [CATEGORY_KEYS.NON_ACADEMIC]: 0,
      },
      topCategory: null,
      topScore: 0,
      margin: 0,
      isAmbiguous: true,
      matches: {},
    };
  }

  const rawLower = text.toLowerCase().trim();
  if (rawLower.length < 3) {
    return {
      scores: {
        [CATEGORY_KEYS.ACADEMICS]: 0,
        [CATEGORY_KEYS.PRACTICAL]: 0,
        [CATEGORY_KEYS.JOBS_CAREERS]: 0,
        [CATEGORY_KEYS.NON_ACADEMIC]: 0,
      },
      topCategory: null,
      topScore: 0,
      margin: 0,
      isAmbiguous: true,
      matches: {},
    };
  }

  const scores = {
    [CATEGORY_KEYS.ACADEMICS]: 0,
    [CATEGORY_KEYS.PRACTICAL]: 0,
    [CATEGORY_KEYS.JOBS_CAREERS]: 0,
    [CATEGORY_KEYS.NON_ACADEMIC]: 0,
  };

  const matches = {
    [CATEGORY_KEYS.ACADEMICS]: [],
    [CATEGORY_KEYS.PRACTICAL]: [],
    [CATEGORY_KEYS.JOBS_CAREERS]: [],
    [CATEGORY_KEYS.NON_ACADEMIC]: [],
  };

  // 1. Evaluate strong indicators (weight 4)
  for (const catKey of Object.keys(LEXICON)) {
    const config = LEXICON[catKey];
    for (const phrase of config.strong) {
      if (rawLower.includes(phrase)) {
        scores[catKey] += 4;
        matches[catKey].push(phrase);
      }
    }
  }

  // 2. Evaluate medium indicators (weight 1.5)
  for (const catKey of Object.keys(LEXICON)) {
    const config = LEXICON[catKey];
    for (const term of config.medium) {
      // Use boundary match where appropriate so substring doesn't trigger falsely
      const pattern = new RegExp(`\\b${term}\\b`, 'i');
      if (pattern.test(rawLower)) {
        scores[catKey] += 1.5;
        matches[catKey].push(term);
      }
    }
  }

  // 3. Evaluate regex patterns (weight 3.5)
  for (const catKey of Object.keys(LEXICON)) {
    const config = LEXICON[catKey];
    for (const reg of config.regex) {
      if (reg.test(rawLower)) {
        scores[catKey] += 3.5;
        matches[catKey].push("pattern_match");
      }
    }
  }

  // 4. Check for ambiguous keywords that alone shouldn't cause overconfidence
  let hasOnlyAmbiguous = false;
  const isBareAmbiguous = AMBIGUOUS_TERMS.some(t => rawLower === t || rawLower === `${t} student` || rawLower === `beginner ${t}`);
  if (isBareAmbiguous) {
    hasOnlyAmbiguous = true;
  }

  // Sort scores to find top candidate and runner up
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [topCat, topScore] = sorted[0];
  const [runnerUpCat, runnerUpScore] = sorted[1];
  const margin = topScore - runnerUpScore;

  // A score below 2.5 or margin below 1.0 or bare ambiguous term indicates low confidence
  const isAmbiguous = topScore < 2.5 || (topScore < 4.0 && margin < 1.2) || hasOnlyAmbiguous;

  return {
    scores,
    topCategory: topScore > 0 ? topCat : null,
    topScore,
    runnerUpCat,
    runnerUpScore,
    margin,
    isAmbiguous,
    matches,
  };
}

/**
 * Main Category Consistency Analyzer
 * 
 * @param {string} selectedCategoryKey - e.g. "academic", "jobs", "practical", "non_academic"
 * @param {string} currentPosition - user input for current position
 * @param {string} destinationGoal - user input for destination / future goal
 * 
 * @returns {Object} Analysis result with status, detectedCategory, warning text, and actionable options
 */
export function analyzeCategoryConsistency(selectedCategoryKey, currentPosition, destinationGoal) {
  const normSelected = normalizeCategoryKey(selectedCategoryKey);
  const selectedMeta = CATEGORY_META[normSelected] || {
    key: normSelected || "unknown",
    label: selectedCategoryKey || "Selected Category",
    fullName: selectedCategoryKey || "Selected Category",
    color: "#6B7280"
  };

  const currText = (currentPosition || "").trim();
  const goalText = (destinationGoal || "").trim();

  // If inputs are empty, no validation can be conducted yet
  if (!currText && !goalText) {
    return {
      status: "consistent",
      selectedCategory: selectedMeta,
      detectedCategory: selectedMeta,
      confidence: "none",
      hasMismatch: false,
      reason: "",
      warningTitle: "",
      warningMessage: "",
      shouldWarn: false,
    };
  }

  const currEval = scoreTextCategories(currText);
  const goalEval = scoreTextCategories(goalText);

  // Combined score for both fields
  const combinedScores = {};
  for (const catKey of Object.keys(CATEGORY_META)) {
    // Weight destination slightly higher (1.2x) as it strongly defines the trajectory target
    combinedScores[catKey] = (currEval.scores[catKey] || 0) + ((goalEval.scores[catKey] || 0) * 1.2);
  }

  const sortedCombined = Object.entries(combinedScores).sort((a, b) => b[1] - a[1]);
  const [topCombCat, topCombScore] = sortedCombined[0];
  const [runnerUpCombCat, runnerUpCombScore] = sortedCombined[1];
  const combinedMargin = topCombScore - runnerUpCombScore;

  const detectedMeta = CATEGORY_META[topCombCat] || selectedMeta;

  // Check if selected category is directly supported by either field
  const selectedCurrScore = currEval.scores[normSelected] || 0;
  const selectedGoalScore = goalEval.scores[normSelected] || 0;
  const selectedCombScore = combinedScores[normSelected] || 0;

  // Case A: Selected category matches top detected category, or inputs adequately fit selected
  const isSelectedTop = topCombCat === normSelected;
  const isSelectedSufficient = selectedCombScore >= 3.0 && (topCombScore - selectedCombScore) < 2.0;

  if (isSelectedTop || isSelectedSufficient) {
    return {
      status: "consistent",
      selectedCategory: selectedMeta,
      detectedCategory: selectedMeta,
      confidence: "high",
      hasMismatch: false,
      reason: `The inputs align consistently with ${selectedMeta.label}.`,
      warningTitle: "Category Consistent",
      warningMessage: "Category and Current/Destination are consistent.",
      shouldWarn: false,
    };
  }

  // Case B: Both inputs are very ambiguous or empty
  if (currEval.isAmbiguous && goalEval.isAmbiguous && topCombScore < 3.5) {
    return {
      status: "ambiguous",
      selectedCategory: selectedMeta,
      detectedCategory: topCombScore > 0 ? detectedMeta : null,
      confidence: "low",
      hasMismatch: false,
      reason: "The inputs are broad or ambiguous, so the exact category cannot be determined with certainty.",
      warningTitle: "Please Verify",
      warningMessage: `We could not confidently determine whether the Current Position and Destination Goal match ${selectedMeta.label}. Please review the information before continuing.`,
      shouldWarn: true,
      softNotice: true,
    };
  }

  // Case C: Strong Mismatch
  // Condition: Both fields indicate a different category, or one has overwhelming score and neither supports selected
  const currBelongsElsewhere = !currEval.isAmbiguous && currEval.topCategory && currEval.topCategory !== normSelected;
  const goalBelongsElsewhere = !goalEval.isAmbiguous && goalEval.topCategory && goalEval.topCategory !== normSelected;

  const bothPointToSameDifferent = currBelongsElsewhere && goalBelongsElsewhere && currEval.topCategory === goalEval.topCategory;
  const overwhelmingSingleField = (topCombScore >= 7.0 && selectedCombScore <= 1.0) || (currBelongsElsewhere && goalBelongsElsewhere);

  if (bothPointToSameDifferent || overwhelmingSingleField) {
    const dominantCat = bothPointToSameDifferent ? currEval.topCategory : topCombCat;
    const targetMeta = CATEGORY_META[dominantCat] || detectedMeta;

    let specificReason = "";
    if (normSelected === CATEGORY_KEYS.ACADEMICS && dominantCat === CATEGORY_KEYS.JOBS_CAREERS) {
      specificReason = "The entered inputs specify employment roles, industry experience, or workplace positions rather than university degrees, school grades, or academic curricula.";
    } else if (normSelected === CATEGORY_KEYS.JOBS_CAREERS && dominantCat === CATEGORY_KEYS.ACADEMICS) {
      specificReason = "The entered inputs describe academic qualifications, degrees, or university admissions rather than job roles or workplace career progressions.";
    } else if (dominantCat === CATEGORY_KEYS.NON_ACADEMIC) {
      specificReason = "The entered inputs focus on mental wellbeing, stress management, or personal life coaching rather than career milestones or educational degrees.";
    } else if (dominantCat === CATEGORY_KEYS.PRACTICAL) {
      specificReason = "The entered inputs focus on hands-on skill learning, project portfolios, and technical tools rather than structured college degrees or corporate employment roles.";
    } else {
      specificReason = `Both Current Position and Destination Goal strongly reflect the ${targetMeta.label} domain rather than ${selectedMeta.label}.`;
    }

    return {
      status: "strong_mismatch",
      selectedCategory: selectedMeta,
      detectedCategory: targetMeta,
      confidence: "high",
      hasMismatch: true,
      reason: specificReason,
      warningTitle: "Category Mismatch Detected",
      warningMessage: `You selected ${selectedMeta.label}, but the Current Position and Destination Goal appear to belong to ${targetMeta.label}.`,
      shouldWarn: true,
      currMismatchCat: currEval.topCategory,
      goalMismatchCat: goalEval.topCategory,
    };
  }

  // Case D: Possible Mismatch (Softer Warning)
  // Only ONE field appears mismatched with confidence, while the other is ambiguous, or one field points to another category
  if (currBelongsElsewhere || goalBelongsElsewhere || (topCombScore >= 4.0 && combinedMargin >= 1.5)) {
    const mismatchField = currBelongsElsewhere && !goalBelongsElsewhere ? "Current Position" : (!currBelongsElsewhere && goalBelongsElsewhere ? "Destination Goal" : "entered information");
    const likelyCat = currBelongsElsewhere ? currEval.topCategory : (goalBelongsElsewhere ? goalEval.topCategory : topCombCat);
    const targetMeta = CATEGORY_META[likelyCat] || detectedMeta;

    return {
      status: "possible_mismatch",
      selectedCategory: selectedMeta,
      detectedCategory: targetMeta,
      confidence: "medium",
      hasMismatch: true,
      reason: `The ${mismatchField} appears related to ${targetMeta.label}, which differs from the selected ${selectedMeta.label}.`,
      warningTitle: "Please Verify Category",
      warningMessage: `The entered Current/Destination information may belong to ${targetMeta.label} rather than ${selectedMeta.label}.`,
      shouldWarn: true,
      mismatchField,
    };
  }

  // Fallback: Consistent / no clear contradiction
  return {
    status: "consistent",
    selectedCategory: selectedMeta,
    detectedCategory: selectedMeta,
    confidence: "low",
    hasMismatch: false,
    reason: "No strong mismatch detected.",
    warningTitle: "",
    warningMessage: "",
    shouldWarn: false,
  };
}
