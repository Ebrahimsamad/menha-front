import React, { useEffect, useRef, useState } from 'react';
import PrimaryButton from '../../ui/PrimaryButton';
import { getAllSelect } from '../../services/SearchSelect';
import { useNavigate } from 'react-router-dom';
import { impact } from '../../services/ImpactMen7a';

export default function Search({ isOpen, onClose }) {
    const [courseType, setCourseType] = useState([]);
    const [courseLanguage, setCourseLanguage] = useState([]);
    const [fieldOfStudy, setFieldOfStudy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ImpactScholarships, setImpactScholarships] = useState(0);
    const navigate = useNavigate();
    const courseTypeRef = useRef(null);
    const languageRef = useRef(null);
    const fieldOfStudyRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAllSelect();
                const dataImpact = await impact();
                setImpactScholarships(dataImpact.totalScholarships);
                setCourseType(data.courseType);
                setCourseLanguage(data.courseLanguage);
                setFieldOfStudy(data.fieldOfStudy);
            } catch (error) {
                setError("Error fetching data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleSearchBtn = (e) => {
        e.preventDefault();
        const courseTypeId = courseTypeRef.current.value;
        const languageId = languageRef.current.value;
        const fieldOfStudyId = fieldOfStudyRef.current.value;

        const params = {
            page: 1,
            ...(courseTypeId && { courseTypeId }),
            ...(languageId && { languageId }),
            ...(fieldOfStudyId && { fieldOfStudyId }),
        };

        const query = new URLSearchParams(params).toString();
        navigate(`/scholarships?${query}`);

        
        onClose();
    };

    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="relative bg-[#003A65] p-6 rounded-lg text-white w-[90%] sm:w-[60%] ">
                
                <div className="flex justify-end m-2">
                <PrimaryButton
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white text-black font-bold text-lg border border-gray-300"
                  onClick={onClose}
                >
                    &times;
                </PrimaryButton>
                </div>
                <h2 className="text-4xl font-semibold text-center mb-4">
                    INTERNATIONAL PROGRAMMES 2024/2025
                </h2>
                <p className="text-center mb-4">
                    {loading ? (
                        <span>Loading...</span>
                    ) : (
                        <span>{ImpactScholarships} Programmes available</span>
                    )}
                </p>

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <form onSubmit={handleSearchBtn}>
                    <div className="flex flex-col space-y-4 mb-6">
                        {/* Course Type */}
                        <div>
                            <label htmlFor="courseType" className="block text-sm font-medium">Course Type</label>
                            <select ref={courseTypeRef} className="w-full p-2 border border-gray-200 rounded text-black">
                                <option value="">Please select</option>
                                {loading ? (
                                    <option>Loading...</option>
                                ) : (
                                    courseType.map(type => (
                                        <option key={type._id} value={type._id}>{type.courseType}</option>
                                    ))
                                )}
                            </select>
                        </div>

                        {/* Course Language */}
                        <div>
                            <label htmlFor="language" className="block text-sm font-medium">Course Language</label>
                            <select ref={languageRef} className="w-full p-2 border border-gray-200 rounded text-black">
                                <option value="">Please select</option>
                                {loading ? (
                                    <option>Loading...</option>
                                ) : (
                                    courseLanguage.map(lang => (
                                        <option key={lang._id} value={lang._id}>{lang.name}</option>
                                    ))
                                )}
                            </select>
                        </div>

                        {/* Field of Study */}
                        <div>
                            <label htmlFor="fieldOfStudy" className="block text-sm font-medium">Field of Study</label>
                            <select ref={fieldOfStudyRef} className="w-full p-2 border border-gray-200 rounded text-black">
                                <option value="">Please select</option>
                                {loading ? (
                                    <option>Loading...</option>
                                ) : (
                                    fieldOfStudy.map(field => (
                                        <option key={field._id} value={field._id}>{field.fieldOfStudy}</option>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton type="submit">Search</PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
