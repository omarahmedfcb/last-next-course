"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function TodoCard({ todo }) {
  const router = useRouter();
  const [isEditing, setisEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  async function handleDelete() {
    try {
      const res = await fetch(`/api/todos?id=${todo._id}`, {
        method: "DELETE",
      });

      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate() {
    try {
      const res = await fetch(`/api/todos?id=${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
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
      <div className="flex flex-col items-center  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Title
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
        <div className="mb-5">
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Name
          </label>
          <input
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            value={author}
            name="author"
            id="author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5 flex gap-4">
          <button
            onClick={handleUpdate}
            className="mb-5 cursor-pointer bg-cyan-700 text-white px-3 py-1 rounded-2xl"
          >
            Update
          </button>
          <button
            onClick={handleBack}
            className="mb-5 cursor-pointer bg-cyan-700 text-white px-3 py-1 rounded-2xl"
          >
            Back
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Task : {todo.title}
          </h5>
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Author : <span className="text-cyan-700">{todo.author}</span>
          </h5>
        </div>
        <div className="mb-5 flex gap-4">
          <button
            onClick={handleDelete}
            className="mb-5 cursor-pointer bg-cyan-700 text-white px-3 py-1 rounded-2xl"
          >
            Delete
          </button>
          <button
            onClick={handleEdit}
            className="mb-5 cursor-pointer bg-cyan-700 text-white px-3 py-1 rounded-2xl"
          >
            Edit
          </button>
          <Link
            href={`/todos/${todo._id}`}
            className="mb-5 cursor-pointer bg-cyan-700 text-white px-3 py-1 rounded-2xl"
          >
            see details
          </Link>
        </div>
      </div>
    );
  }
}

export default TodoCard;
