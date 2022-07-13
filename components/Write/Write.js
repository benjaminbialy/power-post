import React, { useEffect, useId, useState } from "react";
import Button from "../Buttons/Button";
import Status from "../Popups/Status";
import Select from "../Inputs/Select";
import TextInput from "../Inputs/TextInput";
import { supabase } from "../../utils/supabaseClient.js";
import axios from "axios";
import { useRouter } from "next/router";
import NavBar from "../NavBar";
import Image from "next/image";
import Heading from "../Heading";
import TextArea from "../Inputs/TextArea";

export default function Write({ user, templateNo }) {
  // keep track of request statuses
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);

  const [postTypeID, setPostTypeID] = useState(templateNo);
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState({});

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
    {
      id: 2,
      type: "Dot Points",
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

    console.log(postTypeID);

    if (postTypeID == 2) {
      const response = await axios.post("/api/createDotPoints", {
        prompt: topic,
      });
      setContent(response.data.result);
    } else {
      const config = { ...options[postTypeID].config };
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
    }
    setCreating(false);
  };

  const savePost = async () => {
    setSaving(true);
    if (title.trim() === "") {
      alert("You need to enter a title!");
    } else if (content === "") {
      alert("Your post needs to have some content!");
    } else {
      const { data, error } = await supabase.from("posts").insert([
        {
          user_id: user.id,
          title: title,
          content: content,
        },
      ]);
      if (error) {
        setStatus({
          message: "Error saving, try again!",
          success: false,
          show: true,
        });
        console.log(error);
      } else {
        setStatus({
          message: "Saved post successfully, redirecting now!",
          success: true,
          show: true,
        });
        route.push("/post");
      }
    }
    setSaving(false);
  };

  useEffect(() => {
    if (status.show) {
      const timer = setTimeout(() => {
        setStatus({ show: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start w-full min-h-screen  ">
      <NavBar />
      {status.show && (
        <Status
          setStatus={setStatus}
          text={status.message}
          success={status.success}
          styles={"top-6 md:left-[35%] "}
        />
      )}
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
          <div className="flex mb-4 flex-col sm:flex-row sm:items-start ">
            <label
              className="font-medium mb-2 sm:mr-8 sm:mt-2"
              htmlFor={"desc-" + id}
            >
              Description:
            </label>
            <TextArea
              id={"desc-" + id}
              placeholder="Write a detailed description of what you're wanting"
              value={description}
              setValue={setDescription}
              rows={""}
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
          <div className="flex mb-4 flex-col sm:flex-row sm:items-center ">
            <TextInput
              placeholder={"Title"}
              value={title}
              setValue={setTitle}
              id={"title-" + id}
            />
          </div>
          <TextArea
            id={"content-" + id}
            placeholder="Write some content or get the AI to do it!"
            value={content}
            setValue={setContent}
            rows={12}
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
