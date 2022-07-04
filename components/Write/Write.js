import React, { useEffect, useId, useState } from "react";
import Button from "../Buttons/Button";
import TiptapEditor from "../Editors/TiptapEditor";
import Select from "../Inputs/Select";
import TextInput from "../inputs/TextInput";
import { supabase } from "../../utils/supabaseClient.js";
import axios from "axios";
import { useRouter } from "next/router";
import NavBar from "../NavBar";
import Heading from "../Heading";

export default function Write({ user, templateNo }) {
  // keep track of request statuses
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);

  const [postTypeID, setPostTypeID] = useState(templateNo);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");

  // used to tell the editor to include the openAI output
  const [openAI, setOpenAI] = useState(0);

  let options = [
    {
      id: 0,
      type: "Post",
      config: {
        prompt:
          "Write me a post about " +
          topic +
          " with these keywords " +
          keywords +
          " starting with this description " +
          description,
        temperature: 0.9,
        max_tokens: 64,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 0,
      },
    },
    {
      id: 1,
      type: "Summarize",
      config: {
        prompt:
          "Using these keywords: " +
          keywords +
          " summarize the following text: " +
          description,
        temperature: 0,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
    },
  ];

  // check if the template exists, if not show the defualt one.
  useEffect(() => {
    if (templateNo >= options.length) {
      setPostTypeID(0);
    }
  }, [templateNo]);

  const id = useId();
  const route = useRouter();

  const createPost = async () => {
    setCreating(true);

    const config = { ...options[postTypeID].config };
    console.log(config);
    try {
      const res = await axios.post("/api/openAI", {
        prompt: config.prompt,
        temperature: config.temperature,
        max_tokens: config.max_tokens,
        top_p: config.top_p,
        frequency_penalty: config.frequency_penalty,
        presence_penalty: config.presence_penalty,
      });
      console.log(res);
      setContent(res.data.result);
      setOpenAI((prev) => prev + 1);
    } catch (error) {
      alert(error);
    }
    setCreating(false);
  };

  const savePost = async () => {
    setSaving(true);
    const { data, error } = await supabase.from("posts").insert([
      {
        user_id: user.id,
        name: topic,
        pic_url:
          "https://i.picsum.photos/id/249/200/200.jpg?hmac=75zqoHvrxGGVnJnS8h0gUzZ3zniIk6PggG38GjmyOto",
        content: content,
      },
    ]);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      route.push("/post");
    }
    setSaving(false);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col md:flex-row">
      <NavBar />
      <div className="flex flex-col w-full p-6 md:px-10 md:py-12 lg:flex-row ">
        <div className="text-lg lg:w-1/2 lg:mr-5">
          <Heading text={"Post Details"} styles={"mb-3"} />
          <div className="flex mb-2 items-center">
            <label className="font-medium mr-8" htmlFor={"type-" + id}>
              Post type:
            </label>
            <Select
              id={"type-" + id}
              options={options}
              setValue={setPostTypeID}
              value={postTypeID}
            />
          </div>
          <div className="flex mb-4 flex-col sm:flex-row sm:items-center ">
            <label className="font-medium mb-2 sm:mr-8" htmlFor={"topic-" + id}>
              Topic:
            </label>
            <TextInput
              placeholder={"Enter a topic to write about"}
              value={topic}
              setValue={setTopic}
              id={"topic-" + id}
            />
          </div>
          <div className="flex mb-4 flex-col sm:flex-row sm:items-center ">
            <label className="font-medium mb-2 sm:mr-8" htmlFor={"desc-" + id}>
              Description:
            </label>
            <textarea
              id={"desc-" + id}
              className="w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
              placeholder="Write a detailed description of what you're wanting"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setDescription((prev) => prev.trim())}
            />
          </div>
          <div className="flex mb-4 flex-col sm:flex-row sm:items-center ">
            <label
              className="font-medium mb-2 sm:mr-8"
              htmlFor={"keywords-" + id}
            >
              Keywords:
            </label>
            <TextInput
              placeholder={"Enter keywords to include"}
              value={keywords}
              setValue={setKeywords}
              id={"keywords-" + id}
            />
          </div>
          <Button
            accent={true}
            loading={creating}
            text={creating ? "Creating..." : "Create"}
            onClick={() => createPost()}
          />
        </div>
        <div className="lg:w-1/2 lg:ml-5 mt-5 lg:mt-0 ">
          <Heading text={"Generated Post"} styles={"mb-3"} />
          <TiptapEditor
            openAI={openAI}
            content={content}
            setContent={setContent}
          />
          <Button
            text={saving ? "Saving..." : "Save"}
            onClick={() => savePost()}
            loading={saving}
            accent={true}
            styles={"mt-5"}
          />
        </div>
      </div>
    </div>
  );
}
