"use client";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import Link from "next/link";
import { set } from "mongoose";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
    useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken||"");
      console.log(urlToken);
    }, []);
    useEffect(() => {
      if (token.length > 0) {
        verifyUserEmail();
      }
    }, [token]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl ">verify email </h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "NO token"}
      </h2>
      {verified && (
        <div>
          <h1 className="text-2xl text-green-500">
            Email verified successfully
          </h1>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <h1 className="text-2xl text-red-500">Error verifying email</h1>
      )}
    </div>
  );
}
