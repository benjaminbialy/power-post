import React, { useEffect, useId, useState } from "react";
import Button from "../components/Buttons/Button";
import TiptapEditor from "../components/Editors/TiptapEditor";
import Select from "../components/Inputs/Select";
import TextInput from "../components/inputs/TextInput";
import { supabase } from "../utils/supabaseClient.js";
import axios from "axios";

// used to implement a protected route
export async function getServerSideProps({ req }) {
  console.log(req);
  const { error, user } = await supabase.auth.api.getUserByCookie(req);

  // redirect to login page if not logged in
  if (!user) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return { props: { user } };
}

function write({ user, templateSelected = 0 }) {
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [postTypeID, setPostTypeID] = useState(templateSelected);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");

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

  const id = useId();

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
        name: "Testing Posting",
        pic_url:
          "https://i.picsum.photos/id/249/200/200.jpg?hmac=75zqoHvrxGGVnJnS8h0gUzZ3zniIk6PggG38GjmyOto",
        content: content,
      },
    ]);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    setSaving(false);
  };

  useEffect(() => {
    console.log(postTypeID);
  }, [postTypeID]);

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <div className="w-screen min-h-screen flex ">
      <div className="bg-slate-50 w-1/2">
        <label htmlFor={"type-" + id}>Post type</label>
        <Select
          id={"type-" + id}
          options={options}
          setValue={setPostTypeID}
          value={postTypeID}
        />
        <label htmlFor={"topic-" + id}>Topic</label>
        <TextInput
          placeholder={"Enter a topic to write about"}
          value={topic}
          setValue={setTopic}
          id={"topic-" + id}
        />
        <label htmlFor={"desc-" + id}>Description</label>
        <textarea
          id={"desc-" + id}
          className="w-full border border-black rounded p-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setDescription((prev) => prev.trim())}
        />{" "}
        <label htmlFor={"keywords-" + id}>Keywords</label>
        <TextInput
          placeholder={"Enter keywords to include"}
          value={keywords}
          setValue={setKeywords}
          id={"keywords-" + id}
        />
        <Button
          loading={creating}
          text={creating ? "Creating..." : "Create"}
          onClick={() => createPost()}
        />
      </div>
      <div className="bg-red-50 w-1/2">
        <TiptapEditor content={content} setContent={setContent} />
        <Button
          text={saving ? "Saving..." : "Save"}
          onClick={() => savePost()}
          loading={saving}
        />
      </div>
    </div>
  );
}

export default write;
