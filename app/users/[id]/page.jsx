import SingleTaskClient from "./SingleTaskClient";

export default function SingleTaskPage({ params }) {
  const { id } = params;
  return <SingleTaskClient id={id} />;
}
