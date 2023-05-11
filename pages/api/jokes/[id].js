import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const joke = await Joke.findById(id);

    if (!joke) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(joke);
  }

  if (request.method === "PUT") {
    const jokeData = request.body;

    await Joke.findByIdAndUpdate(id, {
      joke: jokeData.jokeInput,
    });

    response.status(200).json({ status: "Joke changed with id " + id });
    return;
  }

  if (request.method === "DELETE") {
    await Joke.findByIdAndDelete(id);

    response.send(200).json({ status: "Joke deleted with id " + id });
    return;
  }

  response.status(501).json({ status: "Method not implemented." });
}
