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
  const { user, sevedScholarship, setSevedScholarship } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false); // State to manage modal visibility
  let currentDate;
  let userBuydate;
  if (isAuthenticated) {
    currentDate = new Date();
    userBuydate = new Date(user.expBuyPortfolio);
  }
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
  const shouldDisplayMatchingScholarship = () => {
    if (isAuthenticated) {
      const hasExperience = userBuydate < currentDate;

      return isAuthenticated && user.isBuyPortfolio && !hasExperience;
    } else return false;
  };
  return (
    <div className="bg-[#003a65] text-white">
      <nav className="container mx-auto flex justify-between items-center py-3 md:py-4">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="Men7a Logo"
            className="w-24 h-12 md:w-40 md:h-8 object-contain"
          />
        </Link>

        {/* Navigation Links for lg screens */}
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
          {shouldDisplayMatchingScholarship() && (
            <li className="group">
              <NavLink
                to="/matching-percentage"
                className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
              >
                Matching Scholarship
              </NavLink>
            </li>
          )}
          <li className="group">
            <NavLink
              to="/about"
              className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            >
              About
            </NavLink>
          </li>

          {/* Conditionally render Search Icon for /dashboard route */}
        </ul>

        {/* Authentication Links */}
        <div className="hidden lg:flex space-x-4 items-center">
          <div className="group">
            <a
              href="#search" 
              onClick={
                !location.pathname.includes("dashboard")
                  ? openSearchModal
                  : undefined
              }
              className="bg-[#b92a3b] text-white transition-all duration-300 px-3 py-2 rounded-md flex items-center space-x-2 hover:bg-white hover:text-[#b92a3b]"
            >
              <FiSearch size={20} />
            </a>
          </div>
          {isAuthenticated && (
            <div className="group">
              <div
                className="relative"
                onClick={() => {
                  if (!isAuthenticated)
                    return toast.error("sorry, login first");
                  navigate("/saved-scholarship");
                }}
              >
                <strong className="absolute top-[-12px] right-[-5px] bg-white rounded-full w-5 text-yellow-400 text-center text-sm">
                  {sevedScholarship.length || 0}
                </strong>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={
                    location.pathname === "/saved-scholarship"
                      ? "#b92a3b"
                      : "none"
                  }
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 cursor-pointer hover:text-[#b92a3b] `}
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
                  className={`w-5 h-5 transform transition-transform duration-300 rotate-0 `}
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
                          className="size-6 text-[#b92a3b] me-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                          />
                        </svg>
                        Portfolio
                      </div>
                    </Link>
                  </li>

                  <li onClick={toggleDropdown}>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/dashboard");
                        setSevedScholarship([]);
                      }}
                      className=" flex text-[#003A65]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-[#b92a3b]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                        />
                      </svg>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-[#b92a3b] text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-white hover:text-[#b92a3b]"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Burger Menu Icon for mobile and medium devices */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <FiX
                size={28}
                className="hover:text-[#b92a3b] transition-colors"
              />
            ) : (
              <FiMenu
                size={28}
                className="hover:text-[#b92a3b] transition-colors"
              />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile and Medium Device Menu */}
      <ul
        className={`${
          isMenuOpen ? "flex mt-14" : "hidden"
        } lg:hidden flex-col space-y-6 items-center bg-[#003a65] absolute top-0 right-0 w-2/3 md:w-1/3 h-screen p-6 z-20 transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <li className="group">
          <NavLink
            to="/dashboard"
            className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            onClick={toggleMenu}
          >
            Home
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="/scholarships"
            className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            onClick={toggleMenu}
          >
            Scholarships
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="/browse-scholarships"
            className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            onClick={toggleMenu}
          >
            Field Of Study
          </NavLink>
        </li>
        {shouldDisplayMatchingScholarship() && (
          <li className="group">
            <NavLink
              to="/matching-percentage"
              className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
              onClick={toggleMenu}
            >
              Matching Scholarship
            </NavLink>
          </li>
        )}
        <li className="group">
          <NavLink
            to="/about"
            className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            onClick={toggleMenu}
          >
            About
          </NavLink>
        </li>

        {/* Conditional Search Link with Icon for mobile */}
        <li className="group">
          <a
            href="#search"
            className=" hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            onClick={() => {
              toggleMenu();
              !location.pathname.includes("dashboard")
                  ? openSearchModal()
                  : undefined
            }} // Open the search modal on click
          >
            <span>Search</span>
          </a>
        </li>

        {/* Authentication Links for Mobile */}
        {isAuthenticated ? (
          <>
            <NavLink to={"/profile/"}>
              <li
                className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                Portfolio
              </li>
            </NavLink>

            <li className="group">
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                  navigate("/dashboard");
                }}
                className=" text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-white hover:text-[#b92a3b] flex"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 me-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="group">
              <NavLink
                to="/login"
                className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                Log In
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/signup"
                className="bg-[#b92a3b] text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-white hover:text-[#b92a3b]"
                onClick={toggleMenu}
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </div>
  );
};

export default Navbar;
