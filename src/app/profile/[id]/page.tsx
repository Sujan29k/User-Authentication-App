import React from "react";

interface UserProfileProps {
  params: {
    id: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 text-center w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">User Profile</h1>
        <p className="text-lg text-gray-600">
          Welcome, User ID:{" "}
          <span className="font-semibold text-gray-800">{params.id}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
