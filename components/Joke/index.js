import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import JokeForm from "../JokeForm";

export default function Joke() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/jokes/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  async function handleEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    const response = await fetch(`/api/jokes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokeData),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      mutate();
    }
  }

  async function handleDelete() {
    const response = await fetch(`/api/jokes/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <>
      <JokeForm
        onSubmit={handleEdit}
        defaultValue={data.joke}
        isEditMode={true}
      />
      <small>ID: {id}</small>
      <h1>{data.joke} </h1>
      <Link href="/">Back to all</Link>
      <button onClick={handleDelete}>Delete Joke</button>
    </>
  );
}
