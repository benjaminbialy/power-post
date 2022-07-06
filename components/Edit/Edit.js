import React, { useEffect, useId, useState } from "react";
import Button from "../Buttons/Button";
import TiptapEditor from "../Editors/TiptapEditor";
import LinkButton from "../Buttons/LinkButton";
import TextInput from "../Inputs/TextInput";
import Image from "next/image";
import { useRouter } from "next/router";

function Edit({ user, data = "", deletePost, saveChanges }) {
  const [name, setName] = useState(data[0].name);
  const [content, setContent] = useState(data[0].content);
  const [picURL, setPicURL] = useState(data[0].pic_url);
  const [saving, setSaving] = useState(false);

  const id = useId();
  const route = useRouter();

  return (
    <div className="flex flex-col sm:flex-row-reverse h-screen">
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
            saveChanges(data[0].post_id, name, content, picURL, setSaving)
          }
          accent={true}
        />{" "}
      </div>
      <div className="p-4 mb-6 sm:p-8 md:py-12 md:16 lg:px-36 flex flex-col overflow-y-scroll  ">
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
        <div className="mb-5 w-full max-w-md mx-auto">
          <Image
            layout="responsive"
            width={500}
            height={400}
            src={data[0].pic_url}
          />
        </div>
        <div className="flex mb-4 flex-col ">
          <label
            className="font-medium mb-2 sm:mr-8 text-lg"
            htmlFor={"image-" + id}
          >
            Image URL:
          </label>
          <TextInput
            value={picURL}
            setValue={setPicURL}
            id={"image-" + id}
            placeholder={"Enter the image url from i.picsum.photos"}
            styles={""}
          />
        </div>
        <TiptapEditor
          content={content}
          setContent={setContent}
          editable={true}
        />
      </div>
    </div>
  );
}

export default Edit;
