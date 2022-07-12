import React, { useId, useState, useEffect } from "react";
import Button from "../Buttons/Button";
import LinkButton from "../Buttons/LinkButton";
import TextInput from "../Inputs/TextInput";
import { useRouter } from "next/router";
import TextArea from "../Inputs/TextArea";

function Edit({ user, data = "", deletePost, saveChanges }) {
  const [name, setName] = useState(data[0].title);
  const [content, setContent] = useState(data[0].content);
  const [saving, setSaving] = useState(false);

  const id = useId();
  const route = useRouter();

  const redirectToPost = () => {
    route.push("/post");
  };

  return (
    <div className="flex flex-col sm:flex-row-reverse h-screen w-screen">
      <div className="flex justify-between p-4 border-b-2 border-gray-200 sm:border-b-0 sm:border-l-2 sm:flex-col-reverse sm:justify-end sm:p-10">
        <Button
          styles=" sm:mt-auto "
          text="Delete"
          onClick={() => deletePost(data[0].post_id, route)}
        />
        <LinkButton styles="sm:mt-6" text="Home" href={"/"} />
        <Button
          loading={saving}
          text="Save"
          loadingText={"Saving"}
          onClick={() =>
            saveChanges(
              data[0].post_id,
              name,
              content,
              setSaving,
              redirectToPost
            )
          }
          accent={true}
        />{" "}
      </div>
      <div className="p-4 mb-6 sm:p-8 md:py-12 md:16 lg:px-36 w-full flex flex-col overflow-y-scroll  ">
        <div className="flex mb-4 flex-col  ">
          <label
            className="font-medium mb-2 sm:mr-8 text-lg"
            htmlFor={"name-" + id}
          >
            Post name:
          </label>
          <TextInput
            value={name}
            setValue={setName}
            id={"name-" + id}
            placeholder={"Enter the post name"}
            styles={""}
          />
        </div>
        <div className="flex mb-4 flex-col ">
          <label
            className="font-medium mb-2 sm:mr-8 text-lg"
            htmlFor={"content-" + id}
          >
            Post content:
          </label>
          <TextArea
            id={"content-" + id}
            value={content}
            setValue={setContent}
          />
        </div>
      </div>
    </div>
  );
}

export default Edit;
