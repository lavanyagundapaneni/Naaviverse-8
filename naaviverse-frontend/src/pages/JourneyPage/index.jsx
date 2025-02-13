import React, { useEffect, useState } from "react";
import { useStore } from "../../components/store/store.ts";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./journey.scss";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { useCoinContextData } from "../../context/CoinContext";

// images
import arrow from "./arrow.svg";

const JourneyPage = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const { setCurrentStepData, setCurrentStepDataLength } = useCoinContextData();
  const { sideNav, setsideNav } = useStore();
  const [loading, setLoading] = useState(false);
  const [journeyPageData, setJourneyPageData] = useState(null);
  const [selectedPathId, setSelectedPathId] = useState(null);

  useEffect(() => {
    const storedPathId = localStorage.getItem("selectedPathId"); // Retrieve pathId from localStorage
    console.log("Stored PathId in LocalStorage:", storedPathId);  // 🔍 Debugging

    if (storedPathId) {
        setSelectedPathId(storedPathId);
        fetchJourneyData(storedPathId);
    } else {
        console.warn("No pathId selected in localStorage!");
    }
}, []);


  const fetchJourneyData = async (pathId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/userpaths/steps?pathId=${pathId}`);
      console.log(response.data, "Fetched Steps Response"); // Debug log

      if (response.data.success) {
        setJourneyPageData(response.data.data); // Ensure correct data is stored
      } else {
        console.warn("No valid data received.");
      }
    } catch (error) {
      console.error("Error fetching steps:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStepClick = (step) => {
    const stepId = step._id;
    console.log("Step clicked:", step);
  
    setsideNav("Current Step");
    setCurrentStepData(step);
    setCurrentStepDataLength(journeyPageData?.StepDetails?.length);
  
    localStorage.setItem("selectedStepId", stepId);
    
    navigate("/dashboard/users");
  };
  
  return (
    <div className="journeypage">
      <div className="journey-top-area">
        <div>
          {journeyPageData
            ? "Your Selected Path:"
            : "Go to Paths and select a journey."}
        </div>

        {loading ? (
          <Skeleton width={150} height={30} />
        ) : (
          <div className="bold-text">{journeyPageData?.school || ""}</div>
        )}

        {loading ? (
          <Skeleton width={500} height={20} />
        ) : (
          <div className="journey-des">
            {journeyPageData?.description || ""}
          </div>
        )}
      </div>

      <div className="journey-steps-area">
        {loading ? (
          Array(3)
            .fill("")
            .map((_, i) => (
              <div className="each-j-step" key={i}>
                <Skeleton width={250} height={25} />
              </div>
            ))
        ) : (
          journeyPageData?.steps?.map((step, i) => (
            <div
              className="each-j-step-container"
              key={step._id.$oid}
              onClick={() => handleStepClick(step)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="each-j-step-name"
                style={{ fontWeight: "600", fontFamily: "Montserrat, sans-serif" }} // Updated to semi-bold
              >
                {step.name}
              </div>
              <div
                className="each-j-step-description"
                style={{ fontSize: "0.9em", color: "#7d8085", lineHeight: "1.5", fontFamily: "Montserrat, sans-serif" }} // Updated styling
              >
                {step.description}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JourneyPage;
