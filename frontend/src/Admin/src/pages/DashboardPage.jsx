import React, { useEffect, useState } from "react";
import { BASE_URl } from "../constraints";
import axios from "axios";
import Loader from "../components/Loader";
function DashboardPage() {
  const [dashBoardinfo, setDashBoardInfo] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URl}/admin/information`);
        if (response.status === 200) {
          console.log(response.data?.data);
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {loading && (
        <Loader/>
      )}
      {
        !loading&&<>
          {" "}
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold">Total Buses</h2>
            <p className="text-2xl mt-2">{dashBoardinfo?.buses}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold">Active Trips</h2>
            <p className="text-2xl mt-2">{dashBoardinfo.trips}</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold">Total Bookings</h2>
            <p className="text-2xl mt-2">{dashBoardinfo.totalbookings}</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold">Users</h2>
            <p className="text-2xl mt-2">{dashBoardinfo.users}</p>
          </div>
        </>
      }
    </div>
  );
}

export default DashboardPage;
