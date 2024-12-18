import React, { useState, useEffect, useContext } from "react";
import { toggle } from "../../services/SavedScholarship";
import PrimaryButton from "../../ui/PrimaryButton";
import RepeatParagrah from "../../ui/RepeatPara";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { fetchMatchingPercentage } from "../../services/MatchingPercentageService";
import { useNavigate } from "react-router-dom";

const SkeletonCard = () => (
  <div className="block rounded-lg bg-white shadow-lg animate-pulse">
    <div className="rounded-t-lg w-full h-48 bg-gray-300" />
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
      </div>
      <div className="mb-4">
        <div className="h-4 bg-gray-300 rounded mb-2 w-3/4" />
        <div className="h-4 bg-gray-300 rounded mb-2 w-full" />
        <div className="h-4 bg-gray-300 rounded mb-2 w-5/6" />
        <div className="h-4 bg-gray-300 rounded mb-2 w-2/3" />
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          className="inline-block rounded px-4 py-2 text-xs font-medium leading-normal bg-gray-500 text-white"
        >
          Loading...
        </button>
      </div>
    </div>
  </div>
);

const MatchingPercentageWithPortfolio = () => {
  const [scholarships, setScholarships] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorNotFound, setErrorNotFound] = useState(null);

  const [savedScholarships, setSavedScholarships] = useState(new Set());
  const [saveLoadingId, setSaveLoadingId] = useState("");
  const { sevedScholarship,setSevedScholarship } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSavedScholarships(new Set(sevedScholarship));
  }, []);
  useEffect(() => {
    const getScholarships = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMatchingPercentage();
        const sortedData = data.matchingPercentage.matchingPercentage.sort(
          (a, b) => b.percentage - a.percentage
        );
        setScholarships(sortedData);
      } catch (err) {
        console.error("Error fetching scholarships:", err);
        if(err.message==="Portfolio Expired"){
          navigate("/pricing")
        }else if(err.message==="Matching Percentage not found"){
          setErrorNotFound("Matching Percentage not found")
        }
        setError("Failed to fetch matching percentage with scholarships. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
  
    getScholarships();
  }, []);
  

  const handleSaveScholarship = async (id) => {
    try {
      setSaveLoadingId(id);
      let newSaved = toggle(id);
      toast.promise(newSaved, {
        loading: savedScholarships.has(id) ? "unsaving..." : "saving...",
        success: savedScholarships.has(id)
          ? "unsaved successfully!"
          : "saved successfully!",
        error: "try again",
      });
      const saved = await newSaved;
      setSavedScholarships(new Set(saved.savedScholarshipIds));
      localStorage.setItem(
        "savedScholarships",
        JSON.stringify(saved.savedScholarshipIds)
      );
      setSevedScholarship(saved.savedScholarshipIds);
    } catch (error) {
      console.error(`Failed to remove scholarship ${id}:`, error.message);
    } finally {
      setSaveLoadingId("");
    }
  };

  return (
    <div className="p-6 container mx-auto mb-5">
      <RepeatParagrah>
        <h1 className="text-4xl md:text-5xl lg:text-7xl mb-5">Matching Percentage</h1>
      </RepeatParagrah>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) :errorNotFound ? (
        <div className="flex flex-col items-center py-10">
          <h2 className="text-xl font-bold mb-5">No have matching percentage your portfolio with scholarship</h2>
          <img src="/Empty.gif" alt="No Scholarships" />
        </div>

      ) : error ? (
        <div className="flex flex-col items-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      ) : scholarships.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <h2 className="text-xl font-bold mb-5">No saved scholarships found</h2>
          <img src="/Empty.gif" alt="No Scholarships" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scholarships.map((scholarship) => (
            <div key={scholarship._id} className="relative block rounded-lg bg-white shadow-lg">
            <span className="absolute top-0 left-0 m-3 p-3 text-white rounded-xl bg-[#003a65]">{scholarship.percentage}%</span>
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={
                  scholarship.scholarshipId.universityId?.image || "https://via.placeholder.com/400x200"
                }
                alt={scholarship.scholarshipId.title || "Scholarship Image"}
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-xl font-medium leading-tight">
                    {scholarship.scholarshipId.title || "No Title Available"}
                  </h5>
                  {saveLoadingId === scholarship.scholarshipId._id ? (
                    <Spinner color="red-500" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={savedScholarships.has(scholarship.scholarshipId._id) ? "#003a65" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 cursor-pointer ${
                        savedScholarships.has(scholarship.scholarshipId._id) ? "text-[#003a65]" : ""
                      } `}
                      onClick={() => handleSaveScholarship(scholarship.scholarshipId._id)}
                      disabled={saveLoadingId}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                  )}
                </div>

               
                <p className="mb-4 text-base">
                    <strong>Field of Study:</strong>{" "}
                    {scholarship.scholarshipId.fieldOfStudyId?.fieldOfStudy} <br />
                    <strong>Course Type:</strong>{" "}
                    {scholarship.scholarshipId.courseTypeId?.courseType} <br />
                    <strong>Country:</strong> {scholarship.scholarshipId?.country} <br />
                    <strong>University:</strong> {scholarship.scholarshipId?.universityId.name}{" "}
                    <br />
                    <strong>Faculty:</strong>{" "}
                    {scholarship.scholarshipId.universityId?.faculityName}
                  </p>
                <div className="flex space-x-2">

                  <PrimaryButton
                    type="button"
                    onClick={() =>
                      (window.location.href = `/scolarshipdetails/${scholarship.scholarshipId._id}`)
                    }
                    className="inline-block rounded px-4 py-2 text-xs font-medium leading-normal bg-gray-500 text-white transition duration-150 ease-in-out"
                  >
                    Details
                  </PrimaryButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchingPercentageWithPortfolio;
