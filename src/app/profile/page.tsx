"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const [data, setdata] = useState("nothing");

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const getUserDetials = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("User details fetched:", res.data);
      setdata(res.data.data._id);
    } catch (error: any) {
      console.error(
        "Error fetching user details:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch user details");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Profile
        </h1>
        <div className="p-4 rounded-lg bg-green-500 text-center">
          {data === "nothing" ? (
            <span className="text-white text-lg">No Data</span>
          ) : (
            <Link
              href={`/profile/${data}`}
              className="text-white bg-yellow-500 px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
            >
              {data}
            </Link>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={logout}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg shadow-md transition"
          >
            Logout
          </button>
          <button
            onClick={getUserDetials}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded-lg shadow-md transition"
          >
            Get User Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
