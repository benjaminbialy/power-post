import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const TiptapEditor = ({ content, setContent, editable = true }) => {
  const editor = useEditor({
    onUpdate({ editor }) {
      setContent(editor.getJSON());
      console.log(editor);
    },
    extensions: [StarterKit],
    content: content,
    editable: editable,
  });

  useEffect(() => {
    editor?.commands?.setContent(content);
  }, [content]);

  if (!editor) {
    return null;
  } else
    return (
      <div>
        {editable && (
          <div>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={
                "p-2 text-white m-1 " +
                (editor.isActive("bold") ? "bg-green-300 " : "bg-black ")
              }
            >
              bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={
                "p-2 text-white m-1 " +
                (editor.isActive("italic") ? "bg-green-300 " : "bg-black ")
              }
            >
              italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={
                "p-2 text-white m-1 " +
                (editor.isActive("strike") ? "bg-green-300 " : "bg-black ")
              }
            >
              strike
            </button>

            <button
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
              className="bg-black text-white p-2 m-1"
            >
              clear marks
            </button>
            <button
              onClick={() => editor.chain().focus().clearNodes().run()}
              className="bg-black text-white p-2 m-1"
            >
              clear nodes
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={
                "p-2 text-white m-1 " +
                (editor.isActive("bulletList") ? "bg-green-300 " : "bg-black ")
              }
            >
              bullet list
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={
                "p-2 text-white m-1 " +
                (editor.isActive("orderedList") ? "bg-green-300 " : "bg-black ")
              }
            >
              ordered list
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={
                "p-2 text-white m-1 " +
                (editor.isActive("codeBlock") ? "bg-green-300 " : "bg-black ")
              }
            >
              code block
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={
                "m-1 p-2 text-white " +
                (editor.isActive("blockquote") ? "bg-green-300 " : "bg-black ")
              }
            >
              blockquote
            </button>
            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="bg-black text-white p-2 m-1"
            >
              horizontal rule
            </button>
            <button
              onClick={() => editor.chain().focus().setHardBreak().run()}
              className="bg-black text-white p-2 m-1"
            >
              hard break
            </button>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              className="bg-black text-white p-2 m-1"
            >
              undo
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              className="bg-black text-white p-2 m-1"
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
