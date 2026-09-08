"""
Category Consistency Validation Layer (Backend Module)

Analyzes whether Current Position and Destination Goal semantically and logically
belong to the selected Category across all 4 system categories:
- Academics (`academic`)
- Practical Skills (`practical`)
- Jobs & Careers (`jobs`)
- Non-Academic Counselling (`non_academic`)
"""

import re
from typing import Dict, Any, Optional, Tuple, List

CATEGORIES = {
    "academic": {
        "key": "academic",
        "label": "Academics",
        "full_name": "Academic & Research",
        "description": "Higher education, college degrees, universities, school, K-12, and research",
    },
    "practical": {
        "key": "practical",
        "label": "Practical Skills",
        "full_name": "Practical & Skills",
        "description": "Hands-on skill learning, project portfolios, technical tools, and certifications",
    },
    "jobs": {
        "key": "jobs",
        "label": "Jobs & Careers",
        "full_name": "Jobs & Careers",
        "description": "Industry roles, corporate employment, promotions, and workplace transitions",
    },
    "non_academic": {
        "key": "non_academic",
        "label": "Non-Academic Counselling",
        "full_name": "Non-Academic Counselling",
        "description": "Mental health, wellness, personal development, guidance, and stress management",
    },
}

LEXICON = {
    "academic": {
        "strong": [
            "bachelor's", "bachelors", "bachelor", "master's", "masters", "master of", "phd", "ph.d", "doctorate",
            "undergraduate", "postgraduate", "b.tech", "m.tech", "btech", "mtech", "b.sc", "m.sc", "bsc", "msc",
            "bba", "mba", "associate degree", "diploma in", "cbse", "icse", "igcse", "ib diploma", "high school",
            "grade 10", "grade 11", "grade 12", "class 10", "class 12", "sat exam", "sat score", "act exam",
            "gre score", "gmat", "ielts", "toefl", "jee advanced", "jee main", "neet exam", "board exam",
            "admissions", "university admission", "college admission", "scholarship", "thesis", "dissertation",
            "academic research", "cgpa", "school student", "college student", "undergrad student"
        ],
        "medium": [
            "university", "college", "campus", "curriculum", "syllabus", "semester", "faculty", "dean",
            "freshman", "sophomore", "stanford", "harvard", "mit", "oxford", "cambridge", "iit", "yale",
            "princeton", "columbia", "berkeley", "ucla", "nyu", "cornell", "caltech"
        ],
        "regex": [
            r"(?:bachelor|master|phd|b\.?tech|m\.?tech|bsc|msc|mba|undergraduate|postgraduate)\s+(?:in|of)\s+[^•]+•",
            r"grade\s*(?:[1-9]|1[0-2])\b",
            r"\b(?:cbse|icse|igcse|ib)\b",
            r"\b(?:class\s*(?:[1-9]|1[0-2]))\b",
            r"\b(?:sat|act|gre|gmat|ielts|toefl|jee|neet)\s*(?:prep|score|exam)?\b",
        ],
    },
    "practical": {
        "strong": [
            "learn to code", "learn python", "learn react", "learn javascript", "build portfolio", "project portfolio",
            "hands-on project", "hands-on projects", "deployed project", "deployed projects", "open source contribution",
            "github portfolio", "behance portfolio", "aws certified", "cloud practitioner", "certified developer",
            "bootcamp", "coding bootcamp", "master blender", "master figma", "master prompt engineering",
            "build 5 projects", "build full-stack", "proof of work", "technical proficiency", "practical skills",
            "beginner learner", "self-study", "self-taught", "learning web development", "learn machine learning",
            "certifications", "ui/ux design portfolio", "video editing skills"
        ],
        "medium": [
            "beginner", "hands-on", "portfolio", "framework", "library", "tutorial", "mini project", "capstone project",
            "proficiency", "figma", "blender", "photoshop", "premiere pro", "docker", "kubernetes",
            "learn", "mastering", "tooling"
        ],
        "regex": [
            r"\b(?:learn|learning|master|mastering|build|develop)\s+(?:python|javascript|react|full-stack|figma|blender|aws|cloud|ai|skills|projects?)\b",
            r"\bbuild\s+(?:a\s+)?(?:\d+\s+)?(?:deployed\s+)?projects?\b",
            r"\b(?:github|behance)\s+portfolio\b",
            r"\b(?:aws|azure|gcp|meta|google)\s+certified\b",
            r"\b(?:self-taught|beginner)\s+(?:developer|coder|learner|student)\b",
        ],
    },
    "jobs": {
        "strong": [
            "software developer", "software engineer", "senior software engineer", "senior developer", "junior developer",
            "junior software developer", "frontend developer", "backend developer", "full stack developer",
            "data scientist", "machine learning engineer", "devops engineer", "cloud architect", "solutions architect",
            "product manager", "senior product manager", "associate product manager", "project manager",
            "business analyst", "management consultant", "investment banker", "marketing manager", "sales manager",
            "executive", "vp of", "director of", "cto", "ceo", "cfo", "chief technology officer",
            "years experience", "yrs experience", "years of experience", "yrs exp", "career transition", "job search",
            "get hired", "salary", "compensation", "faang", "tech lead", "engineering manager",
            "staff engineer", "principal engineer", "corporate job", "switch career to"
        ],
        "medium": [
            "engineer", "developer", "manager", "analyst", "consultant", "specialist", "officer",
            "associate", "lead", "promotion", "promoted", "employer", "industry", "company", "firm", "startup",
            "resume", "interview prep", "mock interview", "recruiter"
        ],
        "regex": [
            r"\b(?:junior|senior|lead|staff|principal|chief|associate|vp|director|head of)\s+[a-z\s]+(?:engineer|developer|manager|analyst|consultant|designer|officer)\b",
            r"\b(?:software|frontend|backend|full[- ]?stack|data|devops|cloud|qa|ml|ai)\s+(?:engineer|developer)\b",
            r"\b\d+\+?\s*(?:years?|yrs?)(?:\s+of)?\s+experience\b",
            r"\b(?:get\s+hired|transition\s+to|switch\s+(?:careers?\s+)?to|promoted\s+to)\b",
            r"\b(?:at|for)\s+(?:google|microsoft|amazon|apple|meta|faang|netflix|mckinsey|goldman|uber)\b",
        ],
    },
    "non_academic": {
        "strong": [
            "mental health", "wellbeing", "well-being", "wellness", "stress management", "stress resilience",
            "exam anxiety", "social anxiety", "overcome anxiety", "depression", "burnout", "overwhelmed",
            "procrastination", "study-life balance", "work-life balance", "time management", "habit building",
            "routine building", "mindfulness", "meditation", "emotional regulation", "self-esteem", "imposter syndrome",
            "life coaching", "counselling", "counseling", "relationship guidance", "family guidance", "family pressure",
            "personal development", "sleep schedule", "daily routine", "lack of clarity", "career confusion",
            "motivation issues", "burnout recovery", "decision support", "work-life harmony"
        ],
        "medium": [
            "anxiety", "stress", "resilience", "habits", "routine", "coping", "emotions", "guidance",
            "focus", "clarity", "balance", "therapy", "counselor", "psychologist", "support", "mindset",
            "overcoming", "confidence"
        ],
        "regex": [
            r"\b(?:stress|anxiety|burnout|depression|overwhelm(?:ed)?)\b",
            r"\b(?:study-life|work-life)\s+(?:balance|harmony)\b",
            r"\b(?:mental|emotional)\s+(?:health|wellbeing|resilience|regulation)\b",
            r"\b(?:time\s+management|routine\s+building|habit\s+formation|stop\s+procrastinat(?:ing|ion))\b",
            r"\b(?:relationship|family)\s+(?:guidance|conflict|pressure)\b",
        ],
    },
}

AMBIGUOUS_TERMS = {
    "data science", "computer science", "artificial intelligence", "machine learning",
    "business", "design", "marketing", "finance", "management", "consulting",
    "technology", "tech", "student", "learning", "study", "skills", "goals"
}


def normalize_category(cat: Optional[str]) -> str:
    if not cat:
        return "academic"
    s = str(cat).lower().strip()
    if any(k in s for k in ["non_academic", "non-academic", "counsel", "wellness", "mental"]):
        return "non_academic"
    if any(k in s for k in ["job", "career", "profession"]):
        return "jobs"
    if any(k in s for k in ["practical", "skill"]):
        return "practical"
    if any(k in s for k in ["academic", "school", "universit", "degree"]):
        return "academic"
    return s


def score_text(text: Optional[str]) -> Dict[str, Any]:
    if not text or not str(text).strip():
        return {
            "scores": {k: 0.0 for k in CATEGORIES},
            "top_category": None,
            "top_score": 0.0,
            "margin": 0.0,
            "is_ambiguous": True,
        }

    raw = str(text).lower().strip()
    if len(raw) < 3:
        return {
            "scores": {k: 0.0 for k in CATEGORIES},
            "top_category": None,
            "top_score": 0.0,
            "margin": 0.0,
            "is_ambiguous": True,
        }

    scores = {k: 0.0 for k in CATEGORIES}

    # 1. Strong matches (weight 4.0)
    for cat, cfg in LEXICON.items():
        for phrase in cfg["strong"]:
            if phrase in raw:
                scores[cat] += 4.0

    # 2. Medium matches (weight 1.5)
    for cat, cfg in LEXICON.items():
        for term in cfg["medium"]:
            if re.search(rf"\b{re.escape(term)}\b", raw, re.IGNORECASE):
                scores[cat] += 1.5

    # 3. Regex matches (weight 3.5)
    for cat, cfg in LEXICON.items():
        for pattern in cfg["regex"]:
            if re.search(pattern, raw, re.IGNORECASE):
                scores[cat] += 3.5

    has_only_ambiguous = raw in AMBIGUOUS_TERMS or raw in {f"{t} student" for t in AMBIGUOUS_TERMS}

    sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    top_cat, top_score = sorted_scores[0]
    _, runner_up_score = sorted_scores[1]
    margin = top_score - runner_up_score

    is_ambiguous = top_score < 2.5 or (top_score < 4.0 and margin < 1.2) or has_only_ambiguous

    return {
        "scores": scores,
        "top_category": top_cat if top_score > 0 else None,
        "top_score": top_score,
        "margin": margin,
        "is_ambiguous": is_ambiguous,
    }


def validate_category_consistency(
    selected_category: str,
    current_position: str,
    destination_goal: str
) -> Dict[str, Any]:
    norm_selected = normalize_category(selected_category)
    sel_meta = CATEGORIES.get(norm_selected, {
        "key": norm_selected,
        "label": selected_category,
        "full_name": selected_category,
        "description": "",
    })

    curr_text = str(current_position or "").strip()
    goal_text = str(destination_goal or "").strip()

    if not curr_text and not goal_text:
        return {
            "status": "consistent",
            "selected_category": sel_meta,
            "detected_category": sel_meta,
            "confidence": "none",
            "has_mismatch": False,
            "reason": "",
            "warning_title": "",
            "warning_message": "",
            "should_warn": False,
        }

    curr_eval = score_text(curr_text)
    goal_eval = score_text(goal_text)

    combined_scores = {
        cat: curr_eval["scores"][cat] + (goal_eval["scores"][cat] * 1.2)
        for cat in CATEGORIES
    }

    sorted_comb = sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)
    top_cat, top_score = sorted_comb[0]
    runner_cat, runner_score = sorted_comb[1]
    comb_margin = top_score - runner_score

    detected_meta = CATEGORIES.get(top_cat, sel_meta)
    sel_comb_score = combined_scores.get(norm_selected, 0.0)

    # 1. Consistent
    if top_cat == norm_selected or (sel_comb_score >= 3.0 and (top_score - sel_comb_score) < 2.0):
        return {
            "status": "consistent",
            "selected_category": sel_meta,
            "detected_category": sel_meta,
            "confidence": "high",
            "has_mismatch": False,
            "reason": f"The inputs align consistently with {sel_meta['label']}.",
            "warning_title": "Category Consistent",
            "warning_message": "Category and Current/Destination are consistent.",
            "should_warn": False,
        }

    # 2. Ambiguous Edge Cases
    if curr_eval["is_ambiguous"] and goal_eval["is_ambiguous"] and top_score < 3.5:
        return {
            "status": "ambiguous",
            "selected_category": sel_meta,
            "detected_category": detected_meta if top_score > 0 else None,
            "confidence": "low",
            "has_mismatch": False,
            "reason": "The inputs are broad or ambiguous, so the exact category cannot be determined with certainty.",
            "warning_title": "Please Verify",
            "warning_message": f"We could not confidently determine whether the Current Position and Destination Goal match {sel_meta['label']}. Please review the information before continuing.",
            "should_warn": True,
            "soft_notice": True,
        }

    # 3. Strong Mismatch
    curr_differs = not curr_eval["is_ambiguous"] and curr_eval["top_category"] and curr_eval["top_category"] != norm_selected
    goal_differs = not goal_eval["is_ambiguous"] and goal_eval["top_category"] and goal_eval["top_category"] != norm_selected
    both_agree_elsewhere = curr_differs and goal_differs and curr_eval["top_category"] == goal_eval["top_category"]
    overwhelming = (top_score >= 7.0 and sel_comb_score <= 1.0) or (curr_differs and goal_differs)

    if both_agree_elsewhere or overwhelming:
        dominant_cat = curr_eval["top_category"] if both_agree_elsewhere else top_cat
        target_meta = CATEGORIES.get(dominant_cat, detected_meta)

        if norm_selected == "academic" and dominant_cat == "jobs":
            reason = "The entered inputs specify employment roles, industry experience, or workplace positions rather than university degrees, school grades, or academic curricula."
        elif norm_selected == "jobs" and dominant_cat == "academic":
            reason = "The entered inputs describe academic qualifications, degrees, or university admissions rather than job roles or workplace career progressions."
        elif dominant_cat == "non_academic":
            reason = "The entered inputs focus on mental wellbeing, stress management, or personal life coaching rather than career milestones or educational degrees."
        elif dominant_cat == "practical":
            reason = "The entered inputs focus on hands-on skill learning, project portfolios, and technical tools rather than structured college degrees or corporate employment roles."
        else:
            reason = f"Both Current Position and Destination Goal strongly reflect the {target_meta['label']} domain rather than {sel_meta['label']}."

        return {
            "status": "strong_mismatch",
            "selected_category": sel_meta,
            "detected_category": target_meta,
            "confidence": "high",
            "has_mismatch": True,
            "reason": reason,
            "warning_title": "Category Mismatch Detected",
            "warning_message": f"You selected {sel_meta['label']}, but the Current Position and Destination Goal appear to belong to {target_meta['label']}.",
            "should_warn": True,
        }

    # 4. Possible Mismatch
    if curr_differs or goal_differs or (top_score >= 4.0 and comb_margin >= 1.5):
        mismatch_field = "Current Position" if curr_differs and not goal_differs else ("Destination Goal" if not curr_differs and goal_differs else "entered information")
        likely_cat = curr_eval["top_category"] if curr_differs else (goal_eval["top_category"] if goal_differs else top_cat)
        target_meta = CATEGORIES.get(likely_cat, detected_meta)

        return {
            "status": "possible_mismatch",
            "selected_category": sel_meta,
            "detected_category": target_meta,
            "confidence": "medium",
            "has_mismatch": True,
            "reason": f"The {mismatch_field} appears related to {target_meta['label']}, which differs from the selected {sel_meta['label']}.",
            "warning_title": "Please Verify Category",
            "warning_message": f"The entered Current/Destination information may belong to {target_meta['label']} rather than {sel_meta['label']}.",
            "should_warn": True,
        }

    return {
        "status": "consistent",
        "selected_category": sel_meta,
        "detected_category": sel_meta,
        "confidence": "low",
        "has_mismatch": False,
        "reason": "No strong mismatch detected.",
        "warning_title": "",
        "warning_message": "",
        "should_warn": False,
    }
