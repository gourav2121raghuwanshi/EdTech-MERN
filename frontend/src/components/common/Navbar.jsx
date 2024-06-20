import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"
// import * as Icons from "react-icons/vsc"
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"
import { useDispatch } from "react-redux"
import { logout } from "../../services/operations/authAPI"
import { useNavigate } from "react-router-dom"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  // const Icon = Icons['']
  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // console.log("sub links", subLinks)

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        {/* <Link 
        onClick={closeDropdown}>
        to="/"
        >
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link> */}
        <Link to="/"
          onClick={closeDropdown}>
          <div className='flex flex-row gap-2'>
            <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
          </div>
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                        }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Dropdown */}
        <div className="relative inline-block z-30  md:hidden text-left">
          <button
            onClick={toggleDropdown}
            type="button"
            className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-richblack-200"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400 border-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="origin-top-right flex flex-col gap-3 p-4 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-richblack-600 ring-1 ring-black ring-opacity-5">
              <div className='flex flex-col gap-3'>
                <Link
                  to={'allCourses'}
                  className="text-center text-white bg-richblack-700 hover:bg-richblack-800  transition-all duration-200 font-semibold border-2 border-richblack-700 rounded-lg  px-4   py-1"
                  onClick={closeDropdown}>
                  Courses
                </Link>


              </div>
              {
                !user && <div
                  className="py-1 flex flex-col justify-center gap-3"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >

                  <Link
                    onClick={closeDropdown}
                    to="signup"
                    className="block px-4 text-center  py-2 text-sm text-white rounded-lg font-semibold transition-all duration-200   bg-yellow-300  hover:bg-yellow-500" role="menuitem">
                    Sign up
                  </Link>
                  <Link
                    onClick={closeDropdown}
                    to="/login"
                    className="block px-4 text-center  py-2 text-sm text-white rounded-lg font-semibold transition-all duration-200  bg-yellow-300  hover:bg-yellow-500" role="menuitem">
                    Log in
                  </Link>
                </div>
              }
              {
                user && <div>
                  <Link to="/dashboard/my-profile" onClick={closeDropdown}>
                    <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                      <VscDashboard className="text-lg" />
                      MyProfile
                    </div>
                  </Link>

                  {
                    user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                      <Link to="/dashboard/cart" onClick={closeDropdown}>
                        <div className="flex w-full items-center  gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                          <AiOutlineShoppingCart className="text-lg text-richblack-100" /> Cart
                          {totalItems > 0 && (
                            <span className=" h-5 w-5  bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                              {totalItems}
                            </span>
                          )}
                        </div>
                      </Link>
                    )
                  }
                  {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
                    (
                      <Link to="/dashboard/my-courses" onClick={closeDropdown}>
                        <div className="flex w-full items-center  gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                          <svg className="text-lg text-richblack-100" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 2h-13l-.5.5v10l.5.5H7v1H4v1h8v-1H9v-1h5.5l.5-.5v-10l-.5-.5zM14 12H2V3h12v9z"></path></svg>
                          MyCourses
                        </div>
                      </Link>
                    )
                  }
                  {
                    (
                      <Link to="/dashboard/settings" onClick={closeDropdown}>
                        <div className="flex w-full items-center  gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                          <svg className="text-lg text-richblack-100" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.85 8.75l4.15.83v4.84l-4.15.83 2.35 3.52-3.43 3.43-3.52-2.35-.83 4.15H9.58l-.83-4.15-3.52 2.35-3.43-3.43 2.35-3.52L0 14.42V9.58l4.15-.83L1.8 5.23 5.23 1.8l3.52 2.35L9.58 0h4.84l.83 4.15 3.52-2.35 3.43 3.43-2.35 3.52zm-1.57 5.07l4-.81v-2l-4-.81-.54-1.3 2.29-3.43-1.43-1.43-3.43 2.29-1.3-.54-.81-4h-2l-.81 4-1.3.54-3.43-2.29-1.43 1.43L6.38 8.9l-.54 1.3-4 .81v2l4 .81.54 1.3-2.29 3.43 1.43 1.43 3.43-2.29 1.3.54.81 4h2l.81-4 1.3-.54 3.43 2.29 1.43-1.43-2.29-3.43.54-1.3zm-8.186-4.672A3.43 3.43 0 0 1 12 8.57 3.44 3.44 0 0 1 15.43 12a3.43 3.43 0 1 1-5.336-2.852zm.956 4.274c.281.188.612.288.95.288A1.7 1.7 0 0 0 13.71 12a1.71 1.71 0 1 0-2.66 1.422z"></path></svg>
                          Settings
                        </div>
                      </Link>
                    )
                  }

                  <div
                    onClick={() => {
                      closeDropdown()
                      dispatch(logout(navigate))

                    }}
                    className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                  >
                    <VscSignOut className="text-lg" />
                    Logout
                  </div>
                </div>
              }
            </div>
          )}
        </div>
        {/* <button  className="mr-4 md:hidden">
          <AiOutlineMenu  fontSize={24} fill="#AFB2BF" />
        </button> */}
      </div>
    </div>
  )
}

export default Navbar