import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { BsFillCaretRightFill } from 'react-icons/bs'
import { FaShareSquare } from 'react-icons/fa'
import { getAllCourses } from "../services/operations/courseDetailsAPI"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
const DisplayAllCourses = () => {
    const { user } = useSelector((state) => state.profile)
    const [allCourses, setAllCourses] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchAllCourses() {
            try {
                console.log("Fetching courses...");
                const courses = await getAllCourses();
                console.log(courses);
                setAllCourses(courses);
            } catch (e) {
                console.log(e);
            }
        }
        fetchAllCourses();
    }, [])

    return (
        <div>
            <div>
                {
                    allCourses.length === 0 && (
                        <div className='flex flex-row items-center text-white justify-center h-[70vh] w-full'>
                            <span className='text-xl font-semibold'>No courses to display</span>
                        </div>
                    )
                }
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5">
                    {
                        allCourses && allCourses.map((course, index) => (
                            <Link
                                to={`http://localhost:5173/courses/${course._id}`}
                                // onClick={()=>{navigate(`http://localhost:5173/courses/${course._id}`)}}
                                key={course._id} className="flex flex-col gap-4">
                                {/* begin */}
                                <div className="flex flex-row gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5">
                                    {/* Course Image */}
                                    <div className='flex items-center justify-center'>
                                    <img
                                        src={course?.thumbnail}
                                        alt={course?.courseName}
                                        className="sm:w-[200px] sm:h-[200px] h-[100px]     max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
                                    />
                                    </div>
                                    <div className="px-4">
                                        {/* <div className='flex flex-row gap-4'> */}
                                        <div className="space-x-3 pb-4 text-xl sm:text-3xl font-semibold">
                                            {course.courseName}
                                        </div>
                                        <div className="space-x-3 pb-4 text-lg sm:text-2xl font-semibold">
                                            Rs. {course.price}
                                        </div>

                                        {/* </div> */}

                                        {/* <div className="flex flex-col gap-4">
                                            <button
                                                className="yellowButton"
                                            // onClick={
                                            //     user && course?.studentsEnrolled.includes(user?._id)
                                            //         ? () => navigate("/dashboard/enrolled-courses")
                                            //         : "handleBuyCourse"
                                            // }
                                            >
                                                {user && course?.studentsEnrolled.includes(user?._id)
                                                    ? "Go To Course"
                                                    : "Buy Now"}
                                            </button>
                                            {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
                                                <button className="blackButton">
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div> */}
                                        <div>
                                            {/* <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                                                30-Day Money-Back Guarantee
                                            </p> */}
                                        </div>

                                        <div>


                                            <div className="flex flex-col gap-3 text-sm sm:text-base text-caribbeangreen-100">
                                                {course.courseDescription}
                                            </div>


                                            <p className="my-2 text-sm sm:text-xl font-semibold">
                                                Instructor :  <span>
                                                    {course.instructor.firstName + " " + course.instructor.lastName}
                                                </span>
                                            </p>

                                        </div>
                                       
                                    </div>
                                </div>
                                {/* end */}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DisplayAllCourses
