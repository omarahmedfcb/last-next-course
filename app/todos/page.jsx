import React from "react";
import { GET } from "../api/todos/route";
import TodoCard from "@/components/TodoCard";

async function Todos() {
  const req = await GET();
  const data = await req.json();
  return (
    <div className=" flex flex-col items-stretch gap-8 w-7/10 mx-auto">
      {data?.todos?.length > 0 ? (
        data.todos.map((ele) => <TodoCard key={ele._id} todo={ele} />)
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
}

export default Todos;
