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
    <div className="text-4xl text-center items-center">
      <h1>Profile</h1>
      <h2 className="p-3 rounded bg-green-500 ">
        {data === "nothing" ? (
          "No Data"
        ) : (
          <Link href={`/profile/${data}`} className="text-white bg-yellow-50">{data}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetials}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
    </div>
  );
};

export default Profile;
