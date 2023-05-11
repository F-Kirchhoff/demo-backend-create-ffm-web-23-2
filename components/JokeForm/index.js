import useSWR from "swr";

export default function JokeForm({ onSubmit, defaultValue, isEditMode }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="joke-input">
        {isEditMode ? "Edit the joke" : "Enter a new joke"}
      </label>
      <input
        type="text"
        id="joke-input"
        name="jokeInput"
        defaultValue={defaultValue}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
