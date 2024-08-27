import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const RouterCumb = () => {
  const location = useLocation();
  // Remove any empty strings
  const paths = location.pathname.split("/").filter((path) => path);

  return (
    <div className=" mb-4 flex items-center gap-1 ">
      <Link to="/" className=" hover:underline duration-300 hover:text-blue-500">Home</Link>
      {paths.map((path, index) => {
        // Construct the URL for each breadcrumb link
        const linkPath = `/${paths.slice(0, index + 1).join("/")}`;

        return (
          <div className="flex items-center gap-1" key={index}>
            <FaChevronRight />
            <Link
              to={linkPath}
              className={index === paths.length - 1 ? " font-semibold text-[#BD3B4A]" : " hover:underline duration-300 hover:text-blue-500"}
            >
              {path}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RouterCumb;
