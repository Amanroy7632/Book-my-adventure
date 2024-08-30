import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URl } from '../constraints';
import Spinner from '../components/loader/Spinner';

const UsersPage = () => {
  const [loading,setLoading] = useState(true)
  const [users,setUsers] = useState([])
  const fetchUserData = async()=>{
    try {
        const response = await axios.get(`${BASE_URl}/users/get-all-users`)
        if (response.status === 200) {
            // console.log(response.data?.data);
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


  return (
    <div className="min-h-[90vh] bg-gray-100 text-gray-800 ">
        {loading&&<Spinner/>}
      {!loading&&<div className="container mx-auto">
        {/* <h1 className="text-3xl font-bold mb-6 text-center">User Information</h1> */}
        <div className="overflow-x-auto relative bg-white shadow-md rounded-lg px-6 overflow-y-scroll h-[85vh]">
          <table className="w-full table-auto">
            <thead className=' sticky top-0'>
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
      </div>}
      {/* {loading && <Loader/>} */}
    </div>
  );
};

export default UsersPage;
