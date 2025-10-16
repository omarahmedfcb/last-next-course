"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function SingleTaskClient({ id }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {});
      const data = await res.json();
      setUser(data.user);
    }
    fetchUser();
  }, [id]);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  async function handleDelete() {
    try {
      await fetch(`/api/users?id=${user._id}`, {
        method: "DELETE",
      });
      router.push("/users");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate() {
    try {
      const res = await fetch(`/api/users?id=${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, title }),
      });
      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();

      setUser(data.updatedUser);
      setName(data.updatedUser.name);
      setTitle(data.updatedUser.title);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-5">
      {isEditing ? (
        <>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="name"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="my task"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              className="bg-cyan-700 text-white px-3 py-1 rounded-2xl"
            >
              Update
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded-2xl"
            >
              Back
            </button>
          </div>
        </>
      ) : (
        <>
          <h5 className="text-xl text-gray-900 dark:text-white mb-4">
            Name: <span className="text-cyan-700">{user.name}</span>
          </h5>
          <h5 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Job Title: {user.title}
          </h5>
          <Image
            src={user.imageUrl}
            alt={user.name}
            width={128}
            height={128}
            className="rounded-full object-cover mb-2"
          />
          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-3 py-1 rounded-2xl"
            >
              Delete
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-cyan-700 text-white px-3 py-1 rounded-2xl"
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleTaskClient;
