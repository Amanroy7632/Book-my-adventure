import React, { useEffect, useState } from "react";
import { BASE_URl } from "../constraints";
import axios from "axios";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";
import BookingChart from "../components/chart/BookingChart";
import TripPieChart from "../components/chart/TripChart";
import { FaBookmark, FaBus, FaRoute, FaTicketAlt, FaUserFriends } from "react-icons/fa";
function DashboardPage() {
  const [dashBoardinfo, setDashBoardInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URl}/admin/information`);
        if (response.status === 200) {
          // console.log(response.data?.data);
          setDashBoardInfo(response.data?.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(`Something went wrong ${error.message}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" flex flex-col gap-2 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {loading && <Loader />}
        {!loading && (
          <>
            {" "}
            <div className="bg-[#FF4F99] flex items-center justify-around text-white p-4 rounded-md shadow-md">
              <FaBus size={40} />
              <div>
                <h2 className="text-xl font-bold">{t("busCount")}</h2>
                <p className="text-2xl mt-2">{dashBoardinfo?.buses}</p>
              </div>
            </div>
            <div className="bg-[#8262FE] flex items-center justify-around text-white p-4 rounded-md shadow-md">
              <FaRoute size={40} />
              <div>
                <h2 className="text-xl font-bold">{t("tripCount")}</h2>
                <p className="text-2xl mt-2">{dashBoardinfo.trips}</p>
              </div>
            </div>
            <div className="bg-[#567DFF] flex items-center justify-around text-white p-4 rounded-md shadow-md">
              <FaTicketAlt size={40} />
              <div>
                <h2 className="text-xl font-bold">{t("bookingCount")}</h2>
                <p className="text-2xl mt-2">{dashBoardinfo.totalbookings}</p>
              </div>
            </div>
            <div className="bg-[#A953FF] flex items-center justify-around text-white p-4 rounded-md shadow-md">
              <FaUserFriends size={40}/>
             <div>
             <h2 className="text-xl font-bold">{t("userCount")}</h2>
             <p className="text-2xl mt-2">{dashBoardinfo.users}</p>
             </div>
            </div>
          </>
        )}
      </div>
      {!loading && (
        <div className=" grid lg:grid-cols-2 md:grid-cols-1 gap-5 pt-5">
          <BookingChart title={"Booking Summary"} url={"/ticket/tickets/all"} />
          <BookingChart
            title={"Trips Summary"}
            url={"/routes/get-all-routes"}
          />
          {/* <TripPieChart/> */}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
