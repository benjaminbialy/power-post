import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Button from "../Buttons/Button";
import LinkButton from "../Buttons/LinkButton";
import Heading from "../Heading";
import NavBar from "../NavBar";
import Post from "../Post";
import ScrollContainer from "../ScrollContainer";
import PostTemplate from "./PostTemplate";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const templates = [
    { id: 0, text: "Post Idea" },
    { id: 1, text: "Summarize" },
    { id: 2, text: "Celebrate" },
    { id: 3, text: "Advertise" },
    { id: 4, text: "Notes" },
  ];

  useEffect(() => {
    getPosts();
  }, [session]);

  const getPosts = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("posts")
        .select()
        .eq("user_id", user.id)
        .limit(10)
        .order("post_id", { ascending: false });

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setPosts([...data]);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row  items-center md:items-start w-full min-h-screen  ">
      <NavBar />
      <div className="p-6 xs:py-8 xs:px-16 sm:px-24 flex flex-col justify-center lg:w-11/12 ">
        <Heading text={"Post Templates"} styles={"mb-4 sm:mb-6"} />
        <ScrollContainer>
          {templates.map((template) => (
            <PostTemplate
              key={template.id}
              href={"/write/" + template.id}
              text={template.text}
            />
          ))}
        </ScrollContainer>
        <Heading text={"Post Library"} styles={"my-4 sm:my-6"} />
        <ScrollContainer>
          {posts.map((post) => (
            <Post
              key={post.post_id}
              name={post.name}
              content={post.content}
              picURL={post.pic_url}
            />
          ))}
        </ScrollContainer>{" "}
        <Button
          styles="mx-auto mt-4 sm:mt-6"
          text={"Sign out"}
          onClick={() => supabase.auth.signOut()}
          accent={true}
        />
      </div>
    </div>
  );
}
