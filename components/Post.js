import Image from "next/image";
import React from "react";

function Post({
  name = "Post Name",
  content = "Lorem sdbj s  kds ds kjd kj djj dfjdkfsjkdjkfsjkdkj f vdss vjkdj ks jvk jsj kcsdj k jksdc jkddj ksjk cjk ",
  imageURL = "https://i.picsum.photos/id/249/200/200.jpg?hmac=75zqoHvrxGGVnJnS8h0gUzZ3zniIk6PggG38GjmyOto",
}) {
  return (
    <div className="bg-red-200 h-3/4 w-max mx-5 p-4 overflow-y-hidden">
      <div className="flex  justify-between">
        <Image src={imageURL} width={40} height={40} />
        <div className="">{name}</div>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default Post;