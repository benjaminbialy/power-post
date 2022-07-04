import Image from "next/image";
import Link from "next/link.js";
import React from "react";
import TiptapEditor from "./Editors/TiptapEditor.js";
import Button from "./Buttons/Button.js";

function Post({
  name = "Post Name",
  content = " ",
  picURL = "https://i.picsum.photos/id/249/200/200.jpg?hmac=75zqoHvrxGGVnJnS8h0gUzZ3zniIk6PggG38GjmyOto",
  buttonText = "Queue",
  showButton = false,
  postingDate = "",
  post_id = 0,
  margin = " lg:mr-8 lg:mb-0 mb-8",
  onClick = () => console.log("Clicked!"),
}) {
  return (
    <div
      className={
        "flex-none flex flex-col items-center w-full h-[230px] p-8  max-w-sm  overflow-y-hidden border-2 border-gray-200 " +
        margin
      }
    >
      <div className="flex flex-col w-full mb-2">
        <div className="flex justify-between w-full">
          <Image src={picURL} width={40} height={40} />
          <Link href={"/edit/" + post_id}>
            <a>
              <div className="">{name}</div>
            </a>
          </Link>
          {showButton && <Button onClick={onClick} text={buttonText} />}
        </div>
        {postingDate !== "" && <p>Posting {postingDate}</p>}
      </div>
      <div className="w-full">
        <Link href={"/edit/" + post_id}>
          <a>
            <TiptapEditor openAI={1} content={content} editable={false} />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Post;
