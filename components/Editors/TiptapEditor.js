import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";

const TiptapEditor = ({ openAI = 0, content, setContent, editable = true }) => {
  const editor = useEditor({
    onUpdate({ editor }) {
      setContent(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          "w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300",
      },
    },
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "My Custom Placeholder",
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-5 sm:ml-[7.5%]",
        },
      }),
      ,
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-5 sm:ml-[7.5%]",
        },
      }),
      ListItem,
    ],

    content: content,
    editable: editable,
  });

  useEffect(() => {
    if (editor) editor?.commands?.setContent(content);
  }, [openAI]);

  if (!editor) {
    return null;
  } else
    return (
      <div className="">
        {editable && (
          <div className="mb-5">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={
                "p-2 text-white m-1 rounded " +
                (editor.isActive("bold") ? "bg-sky-400 " : "bg-black ")
              }
            >
              bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={
                "p-2 text-white m-1 rounded " +
                (editor.isActive("italic") ? "bg-sky-400 " : "bg-black ")
              }
            >
              italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={
                "p-2 text-white m-1 rounded " +
                (editor.isActive("strike") ? "bg-sky-400 " : "bg-black ")
              }
            >
              strike
            </button>

            <button
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
              className="bg-black text-white p-2 m-1 rounded"
            >
              clear marks
            </button>
            <button
              onClick={() => editor.chain().focus().clearNodes().run()}
              className="bg-black text-white p-2 m-1 rounded"
            >
              clear nodes
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={
                "p-2 text-white m-1 rounded " +
                (editor.isActive("bulletList") ? "bg-sky-400 " : "bg-black ")
              }
            >
              bullet list
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={
                "p-2 text-white m-1 rounded " +
                (editor.isActive("orderedList") ? "bg-sky-400 " : "bg-black ")
              }
            >
              ordered list
            </button>
            <button
              onClick={() => editor.chain().focus().setHardBreak().run()}
              className="bg-black text-white p-2 m-1 rounded"
            >
              hard break
            </button>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              className="bg-black text-white p-2 m-1 rounded"
            >
              undo
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              className="bg-black text-white p-2 m-1 rounded"
            >
              redo
            </button>
          </div>
        )}
        <EditorContent editor={editor} />
      </div>
    );
};

export default TiptapEditor;
