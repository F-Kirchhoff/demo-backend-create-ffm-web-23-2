import JokeForm from "../components/JokeForm";
import JokeList from "../components/JokeList";
import useSWR from "swr";

export default function HomePage() {
  const { mutate } = useSWR("/api/jokes");

  async function handleCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    const response = await fetch("/api/jokes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokeData),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      mutate();
      event.target.reset();
    }
  }

  return (
    <>
      <JokeForm onSubmit={handleCreate} defaultValue={""} isEditMode={false} />
      <JokeList />
    </>
  );
}
