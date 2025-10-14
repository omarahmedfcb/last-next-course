"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function SingleTaskClient({ id }) {
  const router = useRouter();
  const [todo, setTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    async function fetchTodo() {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {});
      const data = await res.json();
      setTodo(data.todo);
    }
    fetchTodo();
  }, [id]);

  if (!todo) return <p className="text-center mt-10">Loading...</p>;

  async function handleDelete() {
    try {
      await fetch(`/api/todos?id=${todo._id}`, {
        method: "DELETE",
      });
      router.push("/todos");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate() {
    try {
      const res = await fetch(`/api/todos?id=${todo._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author }),
      });
      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();

      setTodo(data.updatedTodo);
      setTitle(data.updatedTodo.title);
      setAuthor(data.updatedTodo.author);
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

          <div className="mb-5">
            <label
              htmlFor="author"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Name
            </label>
            <input
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              name="author"
              id="author"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="author name"
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
          <h5 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Task: {todo.title}
          </h5>
          <h5 className="text-xl text-gray-900 dark:text-white mb-4">
            Author: <span className="text-cyan-700">{todo.author}</span>
          </h5>
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
