import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { getSaveScholarship } from "../../services/SavedScholarship";
import toast from "react-hot-toast";
import SearchModal from "./SearchModal"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const { user, sevedScholarship, setSevedScholarship } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false); // State to manage modal visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (isAuthenticated) {
      async function fetchingSaveScholarships() {
        try {
          const saved = await getSaveScholarship();
          setSevedScholarship(saved);
          localStorage.setItem("savedScholarships", JSON.stringify(saved));
        } catch (error) {
          console.log(error);
        }
      }
      fetchingSaveScholarships();
    }
  }, [isAuthenticated]);

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  return (
    <div className="bg-[#003a65] text-white">
      <nav className="container mx-auto flex justify-between items-center py-3 md:py-4">
        
        <Link to="/dashboard" className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="Men7a Logo"
            className="w-24 h-12 md:w-40 md:h-8 object-contain"
          />
        </Link>

        
        <ul className="hidden lg:flex space-x-8 items-center">
          <li className="group">
            <NavLink
              to="/dashboard"
              className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            >
              Home
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/scholarships"
              className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            >
              Scholarships
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/browse-scholarships"
              className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            >
              Field Of Study
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/about"
              className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            >
              About
            </NavLink>
          </li>
        </ul>

        {/* Authentication Links */}
        <div className="hidden lg:flex space-x-4 items-center">
          <div className="group">
            <button
              onClick={openSearchModal} // Open the search modal on click
              className="bg-[#b92a3b] text-white transition-all duration-300 px-3 py-2 rounded-md flex items-center space-x-2 hover:bg-white hover:text-[#b92a3b]"
            >
              <FiSearch size={20} />
            </button>
          </div>
          {isAuthenticated && (
            <div className="group">
              <div
                className="relative"
                onClick={() => {
                  if (!isAuthenticated) return toast.error("sorry, login first");
                  navigate("/saved-scholarship");
                }}
              >
                <strong className="absolute top-[-12px] right-[-5px] bg-white rounded-full w-5 text-yellow-400 text-center text-sm">
                  {sevedScholarship.length || 0}
                </strong>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={location.pathname === "/saved-scholarship" ? "#b92a3b" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer hover:text-[#b92a3b]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              </div>
            </div>
          )}
          {isAuthenticated ? (
            <div className="dropdown dropdown-end z-50">
              <label
                tabIndex={0}
                className="cursor-pointer flex items-center space-x-2"
                onClick={toggleDropdown}
              >
                <div className="rounded-full overflow-hidden">
                  <img
                    src={user?.image || ""}
                    alt={user?.userName}
                    className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
                  />
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 transform transition-transform duration-300 rotate-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>

              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                >
                  <li onClick={toggleDropdown}>
                    <Link to="/profile" className="">
                      <div className="flex items-center text-[#003A65]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 me-2 text-[#b92a3b]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 0 12 21a8.966 8.966 0 0 0-5.982-2.975"
                          />
                        </svg>
                        <span>Profile</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className="flex items-center text-[#003A65]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 me-2 text-[#b92a3b]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H3m0 0l4 4m-4-4l4-4m12 0h-4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex space-x-4 items-center">
              <Link to="/login" className="bg-[#b92a3b] text-white px-4 py-2 rounded-md hover:bg-[#ff6347]">
                Login
              </Link>
              <Link to="/signup" className="bg-white text-[#b92a3b] px-4 py-2 rounded-md hover:bg-gray-200">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white text-black py-4">
          <ul className="flex flex-col space-y-2 items-center">
            <li>
              <NavLink
                to="/dashboard"
                className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/scholarships"
                className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
              >
                Scholarships
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/browse-scholarships"
                className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
              >
                Field Of Study
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
              >
                About
              </NavLink>
            </li>
            <li>
              <button
                onClick={openSearchModal} // Open the search modal on click
                className="bg-[#b92a3b] text-white transition-all duration-300 px-3 py-2 rounded-md flex items-center space-x-2 hover:bg-white hover:text-[#b92a3b]"
              >
                <FiSearch size={20} />
                <span>Search</span> 
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </div>
  );
};

export default Navbar;
