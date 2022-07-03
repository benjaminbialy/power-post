import Image from "next/image";
import Link from "next/link.js";
import React from "react";
import TiptapEditor from "../components/Editors/TiptapEditor.js";
import Button from "./Buttons/Button.js";

function Post({
  name = "Post Name",
  content = "Lorem sdbj s  kds ds kjd kj djj dfjdkfsjkdjkfsjkdkj f vdss vjkdj ks jvk jsj kcsdj k jksdc jkddj ksjk cjk ",
  picURL = "https://i.picsum.photos/id/249/200/200.jpg?hmac=75zqoHvrxGGVnJnS8h0gUzZ3zniIk6PggG38GjmyOto",
  buttonText = "Queue",
  showButton = false,
  postingDate = "",
  post_id = 0,
  onClick = () => console.log("Clicked!"),
}) {
  return (
    <div className="block flex-none bg-red-200 h-3/4 w-96 mx-5 p-4 overflow-y-hidden">
      <div className="flex flex-col">
        <div className="flex justify-between">
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
      <div>
        <Link href={"/edit/" + post_id}>
          <a>
            <TiptapEditor content={content} editable={false} />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Post;
