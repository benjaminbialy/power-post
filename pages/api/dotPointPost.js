import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { prompt } = req.body;

  const def_word = async (word) => {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Define ${word}:`,
      temperature: 0.5,
      max_tokens: 500,
    });
    return response.data["choices"][0]["text"];
  };

  const create_outline = async (topic) => {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Create an outline for an essay about ${topic}:`,
      temperature: 0.0,
      max_tokens: 500,
    });

    return response["data"]["choices"][0]["text"];
  };

  const got_hired = async () => {
    response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: "Bob just got hired by austory and we are so",
      temperature: 0.5,
      max_tokens: 500,
    });
    return response.data["choices"][0]["text"];
  };

  const per_section_generation = async (section_list, title) => {
    let final_output = title;
    section_list.forEach(async (entry) => {
      final_output += "\n" + entry;

      let final_prompt = title + "\n" + entry[2];

      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `${final_prompt}`,
        temperature: 0.0,
        max_tokens: 500,
      });
      final_output += response.data["choices"][0]["text"];
    });

    return final_output;
  };

  const total_generation = async (section_list, title) => {
    let final_output = title;
    section_list.forEach(async (entry) => {
      final_output += "\n" + entry;

      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `${final_output}`,
        temperature: 0.0,
        max_tokens: 500,
      });
      final_output += response.data["choices"][0]["text"];
    });

    return final_output;
  };

  //const prompt = "automated content generation using GPT-3";
  //const prompt = "blockchain programming using solidity"
  //const prompt = "Hiring a lawyer through upwork"

  const starter = await create_outline(prompt);

  const topic_lists = starter.split("\n");

  const title = `Title: ${prompt}\n`;

  const final_output_1 = await per_section_generation(topic_lists, title);
  const final_output_2 = await total_generation(topic_lists, title);

  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Article 1:${final_output_1} Article 2: ${final_output_2} \n Combined:`,
    temperature: 0.0,
    max_tokens: 1000,
  });

  const final_output = response.data["choices"][0]["text"];

  const content = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Write two paragraphs for each number: ${final_output}`,
    temperature: 0.5,
    max_tokens: 500,
  });

  const linkedInPost = content.data["choices"][0]["text"];

  res.status(200).json({
    result: linkedInPost,
  });
}
