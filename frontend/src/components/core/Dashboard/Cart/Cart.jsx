import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

const Cart = () => {
  const { user } = useSelector((state) => state.profile)
  const { total, totalItems } = useSelector((state) => state.cart)
  console.log("from cart : " + total + " total items : " + totalItems)

  console.log(user)
  // return "good";
  return (
    <div className="p-3 sm:p-4 md:p-8">
      <h1 className="mb-14 text-2xl sm:text-3xl font-medium text-richblack-5">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
    </div>
  )
}



export default Cart


