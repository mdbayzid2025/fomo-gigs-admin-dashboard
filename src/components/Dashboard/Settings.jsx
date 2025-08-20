import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="bg-[#fff] p-8 h-[93vh]">
      <div className="p-8 rounded-lg flex flex-col gap-4">
        <Link
          to="profile"
          className="flex items-center justify-between bg-[#131927] text-white p-4 rounded-lg w-3/4 hover:font-medium"
        >
          <p>Personal Information</p>
          <FaChevronRight />
        </Link>
        <Link
          to="change-password"
          className="flex items-center justify-between bg-[#131927] text-white p-4 rounded-lg w-3/4 hover:font-medium"
        >
          <p>Change Password</p>
          <FaChevronRight />
        </Link>
        <Link
          to="terms-and-condition"
          className="flex items-center justify-between bg-[#131927] text-white p-4 rounded-lg w-3/4 hover:font-medium"
        >
          <p>Terms & Condition</p>
          <FaChevronRight />
        </Link>
        <Link
          to="about-us"
          className="flex items-center justify-between bg-[#131927] text-white p-4 rounded-lg w-3/4 hover:font-medium"
        >
          <p>About Us</p>
          <FaChevronRight />
        </Link>
        <Link
          to="privacy-policy"
          className="flex items-center justify-between bg-[#131927] text-white p-4 rounded-lg w-3/4 hover:font-medium"
        >
          <p>Privacy Policy</p>
          <FaChevronRight />
        </Link>
        <Link
          to="faq"
          className="flex items-center justify-between bg-[#131927] text-white p-4 rounded-lg w-3/4 hover:font-medium"
        >
          <p>FAQ</p>
          <FaChevronRight />
        </Link>
      </div>
    </div>
  );
}
