import React from "react";
import { GET } from "../api/users/route";
import UserCard from "@/components/UserCard";

async function Users() {
  const req = await GET();
  const data = await req.json();
  return (
    <div className=" flex flex-col items-stretch gap-8 w-7/10 mx-auto py-8">
      {data?.users?.length > 0 ? (
        data.users.map((ele) => <UserCard key={ele._id} user={ele} />)
      ) : (
        <p className="text-center">No users found.</p>
      )}
    </div>
  );
}

export default Users;
