import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URl } from '../constraints';
import Loader from '../components/Loader';

const UsersPage = () => {
  const [loading,setLoading] = useState(true)
  const [users,setUsers] = useState([])
  const fetchUserData = async()=>{
    try {
        const response = await axios.get(`${BASE_URl}/users/get-all-users`)
        if (response.status === 200) {
            console.log(response.data?.data);
            setUsers(response.data?.data)
        }
        setLoading(false)
    } catch (error) {
        setLoading(false)
        console.error(error);
        
    }
}
useEffect(()=>{
    fetchUserData()
},[])
//   const users = [
//     {
//       _id: "66b8993ab65adc7d10d0ea22",
//       email: "yadavaman7632@gmail.com",
//       fullname: "Aman Kumar Yadav",
//       phone: "7632976843",
//       avatar: "https://via.placeholder.com/150",
//       createdAt: "2024-08-11T10:58:02.570Z",
//       updatedAt: "2024-08-29T10:42:43.770Z",
//       isVerified: false
//     },
//     {
//       _id: "66b8b2125f91f0468f718173",
//       email: "dharmwndra@2350gmail.com",
//       fullname: "Dharmendra Ray",
//       phone: "8523697894",
//       avatar: "Not Uploaded yet",
//       createdAt: "2024-08-11T12:44:03.168Z",
//       updatedAt: "2024-08-11T12:44:20.078Z",
//       isVerified: false
//     },
//     {
//       _id: "66b99753a68ec6c5523b7f67",
//       email: "ujjawalkr@gmail.com",
//       fullname: "Ujjwal pandit",
//       phone: "8695483697",
//       avatar: "http://res.cloudinary.com/dusjpa4yg/image/upload/v1724767435/i5tgygzydzvpionf8h8d.svg",
//       createdAt: "2024-08-12T05:02:11.792Z",
//       updatedAt: "2024-08-27T14:03:56.465Z",
//       isVerified: false
//     },
//     // Add other user data here...
//   ];

  return (
    <div className="min-h-[90vh] bg-gray-100 text-gray-800 ">
        
      <div className="container mx-auto">
        {/* <h1 className="text-3xl font-bold mb-6 text-center">User Information</h1> */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 overflow-y-scroll h-[85vh]">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-4 text-left">Avatar</th>
                <th className="p-4 text-left">Full Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Verified</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    {user.avatar !== "Not Uploaded yet" ? (
                      <img
                        src={user.avatar}
                        alt={user.fullname}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <span className="italic text-gray-500">No Avatar</span>
                    )}
                  </td>
                  <td className="p-4">{user.fullname}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">
                    {user.isVerified ? (
                      <span className="text-green-600 font-bold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-bold">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {loading && <Loader/>}
    </div>
  );
};

export default UsersPage;
