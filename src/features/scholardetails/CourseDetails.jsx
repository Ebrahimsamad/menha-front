/* eslint-disable react/prop-types */
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Toaster } from "react-hot-toast";

export default function CourseDetails({ scholarship }) {

  const durationYears = parseInt(scholarship.duration);
  const totalSemesters = durationYears * 2;

  return (
    <div className="container mx-auto py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Toaster />
      <style>
        {`
          .table-row:nth-child(odd) {
            background-color: #f9f9f9; 
          }
          .table-row:nth-child(even) {
            background-color: #e9e9e9; 
          }
          .primary-text {
            color: #003a65; 
          }
          .secondary-text {
            color: #8A690F;  
            font-weight: bold;  
          }
        `}
      </style>

      <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">

        <table className="table-auto w-full text-left">
          <tbody>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Field Of Study</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.fieldOfStudyId.fieldOfStudy}
              </td>
            </tr>

            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Course Type</td>
              <td className="primary-text border px-4 py-2">
                {scholarship.courseTypeId.courseType}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Funding opportunities within the university</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.isFree ? "YES" : "NOT Free"}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Description</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.description}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Beginning</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.isWinter ? "Winter" : "Summer"}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Programme duration</td>
              <td className="primary-text border px-4 py-5">
                {totalSemesters} semesters
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Full-time / part-time</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.isFullTime ? "Full Time" : "Part Time"}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">GPA</td>
              <td className="primary-text border px-4 py-5">{scholarship.gpa}</td>
            </tr>

            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Country</td>
              <td className="primary-text border px-4 py-5">{scholarship.country}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="primary-text text-2xl font-semibold mb-4">Contact</h3>
        <div className="space-y-4">
          <p className="primary-text">{scholarship.universityId.name}</p>
          <p className="primary-text">{scholarship.universityId.facultyName}</p>
          <p className="primary-text">{scholarship.universityId.address}</p>
          <p className="primary-text">
            <a
              href={`mailto:${scholarship.universityId.email}`}
              className="text-blue-500 underline"
              target="_blank"
            >
             {scholarship.universityId.email}
            </a>
          </p>
          <p className="primary-text">
            <a
              href={`tel:+${scholarship.universityId.phone}`}
              className="text-blue-500 underline"
              target="_blank"
            >
              {scholarship.universityId.phone}
            </a>
          </p>

          <div className="primary-text flex space-x-6">
            <a
              href="https://www.facebook.com/ebrahim7asn"
              className="hover:bg-white hover:text-[#003a65] p-2 rounded-full transition-colors"
              aria-label="Facebook"
              target="_blank"
            >
              <FaFacebook size={24} />
            </a>
            
            <a
              href="https://www.linkedin.com/in/ebrahim7asn"
              className="hover:bg-white hover:text-[#003a65] p-2 rounded-full transition-colors"
              aria-label="LinkedIn"
              target="_blank"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        <div className="mt-6">
          <img
            src={scholarship.universityId.image}
            alt={scholarship.universityId.name}
            className="rounded-lg shadow-lg h-80"
          />
          <p className="mt-2 text-sm text-center text-gray-500">
            {scholarship.universityId.name}
          </p>
        </div>
      </div>
    </div>
  );
}
