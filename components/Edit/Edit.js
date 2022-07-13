import React, { useId, useState, useEffect } from "react";
import Button from "../Buttons/Button";
import LinkButton from "../Buttons/LinkButton";
import TextInput from "../Inputs/TextInput";
import { useRouter } from "next/router";
import TextArea from "../Inputs/TextArea";
import Status from "../Popups/Status";
import ConfirmationBox from "../Popups/ConfirmationBox";

function Edit({ user, data = "", deletePost, saveChanges }) {
  const [name, setName] = useState(data[0].title);
  const [content, setContent] = useState(data[0].content);
  const [saving, setSaving] = useState(false);

  // used for popups
  const [status, setStatus] = useState({});
  const [confirm, setConfirm] = useState({});

  const id = useId();
  const route = useRouter();

  useEffect(() => {
    if (status.show) {
      const timer = setTimeout(() => {
        setStatus({ show: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    if (confirm.confirm) {
      deletePost(confirm.post_id, route, setStatus);
    }
  }, [confirm]);

  const redirectToPost = () => {
    route.push("/post");
  };

  return (
    <div className="flex flex-col sm:flex-row-reverse h-screen w-screen ">
      {status.show ? (
        <Status
          setStatus={setStatus}
          text={status.message}
          success={status.success}
          styles={"top-6 sm:left-[20%] md:left-[25%] lg:left-[30%]"}
        />
      ) : (
        confirm.show && (
          <ConfirmationBox
            text={
              "Are you sure you want to delete this post? You'll never get it back!"
            }
            setConfirm={setConfirm}
            styles={"top-6 sm:left-[20%] md:left-[25%] lg:left-[30%]"}
          />
        )
      )}
      <div className="flex justify-between p-4 border-b-2 border-gray-200 sm:border-b-0 sm:border-l-2 sm:flex-col-reverse sm:justify-end sm:p-10">
        <Button
          styles=" sm:mt-auto "
          text="Delete"
          onClick={() =>
            setConfirm((prev) => ({
              ...prev,
              show: true,
              confirm: false,
              post_id: data[0].post_id,
            }))
          }
        />
        <LinkButton styles="sm:mt-6" text="Back" href={"/post"} />
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
              redirectToPost,
              setStatus
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
