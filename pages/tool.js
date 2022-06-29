import axios from "axios";
import { useId, useState } from "react";
import NumberInput from "../components/Inputs/NumberInput";
import LinkButton from "../components/LinkButton";

export default function Tool() {
  const [prompt, setPrompt] = useState(
    "Only show me the keywords of this text: "
  );
  const [text, setText] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [maxTokens, setMaxTokens] = useState(60);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.8);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [fetching, setFetching] = useState(false);

  const getKeywords = async () => {
    setFetching(true);
    try {
      const res = await axios.post("/api/keywords", {
        prompt: prompt + text,
        temperature: temperature,
        max_tokens: maxTokens,
        top_p: topP,
        frequency_penalty: frequencyPenalty,
        presence_penalty: presencePenalty,
      });
      setKeywords(res.data.result);
      setFetching(false);
    } catch (error) {
      alert(error);
      setFetching(false);
    }
  };

  const id = useId();

  return (
    <div className="flex justify-center mx-32 my-12">
      <div className="w-[50%] mr-6">
        <div className="flex flex-col">
          <LinkButton href={"/"} text={"Back to account"} accent={true} />
          <div>
            <h1 className="self-start text-2xl">Configure the settings</h1>
            <div className="flex flex-col w-full">
              <label htmlFor={"prompt-" + id}>Prompt:</label>
              <input
                className="border border-black rounded p-1"
                id={"prompt-" + id}
                placeholder="Prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <NumberInput
                label={"temperature"}
                value={temperature}
                min={1}
                max={0}
                setValue={setTemperature}
                id={id}
              />
              <NumberInput
                label={"maxTokens"}
                value={maxTokens}
                setValue={setMaxTokens}
                id={id}
              />
              <NumberInput
                label={"topP"}
                value={topP}
                setValue={setTopP}
                id={id}
                min={0}
                max={1}
              />
              <NumberInput
                label={"frequencyPenalty"}
                value={frequencyPenalty}
                setValue={setFrequencyPenalty}
                min={-2}
                max={2}
                id={id}
              />
              <NumberInput
                label={"presencePenalty"}
                value={presencePenalty}
                setValue={setPresencePenalty}
                min={-2}
                max={2}
                id={id}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50%]">
        <h2 className="self-start text-2xl">Enter the text:</h2>
        <textarea
          className="w-full border border-black rounded p-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setText((prev) => prev.trim())}
        />
        <button
          className="py-2 px-3 rounded text-white bg-green-500 font-semibold"
          onClick={() => {
            getKeywords();
          }}
          disabled={fetching}
        >
          {fetching ? "Getting the keywords..." : "Get Keywords"}
        </button>
        <h2 className="self-start text-2xl">Output:</h2>
        <textarea
          className="w-full border border-black rounded p-1"
          value={keywords.trim()}
          disabled
        />
      </div>
    </div>
  );
}
