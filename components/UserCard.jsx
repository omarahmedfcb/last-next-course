"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function UserCard({ user }) {
  const router = useRouter();
  const [isEditing, setisEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");

  async function handleDelete() {
    try {
      const res = await fetch(`/api/users?id=${user._id}`, {
        method: "DELETE",
      });

      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate() {
    try {
      const res = await fetch(`/api/users?id=${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          title,
        }),
      });

      setisEditing(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  function handleEdit() {
    setisEditing(true);
  }

  function handleBack() {
    setisEditing(false);
  }
  if (isEditing) {
    return (
      <div className="flex flex-col items-center gap-4 py-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Name
          </label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Job Title
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            name="title"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="my task"
            required
          />
        </div>

        <div className=" flex gap-4">
          <button
            onClick={handleUpdate}
            className=" cursor-pointer bg-cyan-700 text-white px-3 py-1 rounded-2xl"
          >
            Update
          </button>
          <button
            onClick={handleBack}
            className=" cursor-pointer bg-cyan-700 text-white px-3 py-1 rounded-2xl"
          >
            Back
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col py-4 items-center gap-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="">
          <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Name : <span className="text-cyan-700">{user.name}</span>
          </h5>
        </div>
        <div className="">
          <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Job Title : {user.title}
          </h5>
        </div>
        <Image
          src={user.imageUrl}
          alt={user.name}
          width={128}
          height={128}
          className="rounded-full object-cover"
        />
        <div className=" flex gap-4">
          <button
            onClick={handleDelete}
            className=" cursor-pointer bg-cyan-700 text-white px-3 py-1 rounded-2xl"
          >
            Delete
          </button>
          <button
            onClick={handleEdit}
            className=" cursor-pointer bg-cyan-700 text-white px-3 py-1 rounded-2xl"
          >
            Edit
          </button>
          <Link
            href={`/users/${user._id}`}
            className=" cursor-pointer bg-cyan-700 text-white px-3 py-1 rounded-2xl"
          >
            see details
          </Link>
        </div>
      </div>
    );
  }
}

export default UserCard;
