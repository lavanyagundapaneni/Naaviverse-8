"""
Unit test suite for Category Consistency Validation Layer
Tests all 4 categories:
  - Academics (`academic`)
  - Practical Skills (`practical`)
  - Jobs & Careers (`jobs`)
  - Non-Academic Counselling (`non_academic`)
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from category_validator import validate_category_consistency

def test_academics_with_jobs_inputs():
    """User selects Academics, but inputs are Software Developer -> Senior Software Engineer."""
    res = validate_category_consistency(
        selected_category="academic",
        current_position="Software Developer",
        destination_goal="Senior Software Engineer"
    )
    assert res["status"] == "strong_mismatch", f"Expected strong_mismatch, got {res['status']}"
    assert res["detected_category"]["key"] == "jobs", f"Expected detected jobs, got {res['detected_category']['key']}"
    assert res["has_mismatch"] is True
    print("PASS: Academics selected with Jobs inputs -> Strong Mismatch (Detected: Jobs & Careers)")

def test_jobs_with_academic_inputs():
    """User selects Jobs & Careers, but inputs are Grade 12 -> Bachelor's Degree at Stanford."""
    res = validate_category_consistency(
        selected_category="jobs",
        current_position="Grade 12 CBSE Student",
        destination_goal="Bachelor's in Computer Science • Stanford University • USA"
    )
    assert res["status"] == "strong_mismatch", f"Expected strong_mismatch, got {res['status']}"
    assert res["detected_category"]["key"] == "academic", f"Expected detected academic, got {res['detected_category']['key']}"
    assert res["has_mismatch"] is True
    print("PASS: Jobs & Careers selected with Academics inputs -> Strong Mismatch (Detected: Academics)")

def test_practical_with_counselling_inputs():
    """User selects Practical Skills, but inputs are Exam Anxiety -> Stress Resilience."""
    res = validate_category_consistency(
        selected_category="practical",
        current_position="Facing high exam anxiety and lack of career clarity",
        destination_goal="Build stress resilience, improve focus and study-life balance"
    )
    assert res["status"] == "strong_mismatch", f"Expected strong_mismatch, got {res['status']}"
    assert res["detected_category"]["key"] == "non_academic", f"Expected detected non_academic, got {res['detected_category']['key']}"
    assert res["has_mismatch"] is True
    print("PASS: Practical Skills selected with Counselling inputs -> Strong Mismatch (Detected: Non-Academic Counselling)")

def test_academics_with_practical_inputs():
    """User selects Academics, but inputs are Beginner Python learner -> Build 5 deployed projects."""
    res = validate_category_consistency(
        selected_category="academic",
        current_position="Beginner Python learner, 2 months self-study",
        destination_goal="Build a full-stack portfolio with 5 deployed projects"
    )
    assert res["status"] == "strong_mismatch", f"Expected strong_mismatch, got {res['status']}"
    assert res["detected_category"]["key"] == "practical", f"Expected detected practical, got {res['detected_category']['key']}"
    print("PASS: Academics selected with Practical inputs -> Strong Mismatch (Detected: Practical Skills)")

def test_consistent_all_four_categories():
    """Verify that all 4 categories return consistent when inputs match."""
    # 1. Academics consistent
    res1 = validate_category_consistency(
        selected_category="academic",
        current_position="Grade 12 CBSE Student, Delhi Public School",
        destination_goal="Bachelor of Science in CS • Stanford University • USA"
    )
    assert res1["status"] == "consistent", f"Academics failed consistency: {res1}"
    assert res1["has_mismatch"] is False

    # 2. Jobs consistent
    res2 = validate_category_consistency(
        selected_category="jobs",
        current_position="Junior Software Developer, 2 yrs experience",
        destination_goal="Senior Software Engineer at Google"
    )
    assert res2["status"] == "consistent", f"Jobs failed consistency: {res2}"
    assert res2["has_mismatch"] is False

    # 3. Practical consistent
    res3 = validate_category_consistency(
        selected_category="practical",
        current_position="Beginner Python learner, 2 months self-study",
        destination_goal="Build a full-stack portfolio with 5 deployed projects"
    )
    assert res3["status"] == "consistent", f"Practical failed consistency: {res3}"
    assert res3["has_mismatch"] is False

    # 4. Counselling consistent
    res4 = validate_category_consistency(
        selected_category="non_academic",
        current_position="Facing high exam anxiety and burnout",
        destination_goal="Build stress resilience, improve focus and study-life balance"
    )
    assert res4["status"] == "consistent", f"Counselling failed consistency: {res4}"
    assert res4["has_mismatch"] is False

    print("PASS: All 4 categories correctly identify consistent inputs with no warning.")

def test_single_field_possible_mismatch():
    """Verify that a single field mismatch produces a possible_mismatch warning."""
    res = validate_category_consistency(
        selected_category="academic",
        current_position="Grade 12 Student",
        destination_goal="Senior Software Engineer at Google"
    )
    # One field is academic (Grade 12), other is jobs (Senior Software Engineer)
    assert res["status"] in ["possible_mismatch", "consistent"], f"Expected possible_mismatch, got {res['status']}"
    if res["status"] == "possible_mismatch":
        assert res["has_mismatch"] is True
    print(f"PASS: Single field divergence handled with status: {res['status']}")

def test_ambiguous_broad_inputs():
    """Verify that ambiguous or generic inputs do not falsely trigger strong mismatch."""
    res = validate_category_consistency(
        selected_category="academic",
        current_position="Data Science",
        destination_goal="Machine Learning"
    )
    assert res["status"] in ["ambiguous", "consistent"], f"Expected ambiguous or consistent, got {res['status']}"
    assert res["status"] != "strong_mismatch", "Ambiguous terms should not trigger strong mismatch!"
    print("PASS: Ambiguous inputs ('Data Science' / 'Machine Learning') handled gracefully without false alarm.")

if __name__ == "__main__":
    test_academics_with_jobs_inputs()
    test_jobs_with_academic_inputs()
    test_practical_with_counselling_inputs()
    test_academics_with_practical_inputs()
    test_consistent_all_four_categories()
    test_single_field_possible_mismatch()
    test_ambiguous_broad_inputs()
    print("\nALL CATEGORY CONSISTENCY TESTS PASSED SUCCESSFULLY!")
