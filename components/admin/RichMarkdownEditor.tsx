"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { defaultSchema } from "hast-util-sanitize";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import TextAlign from "@tiptap/extension-text-align";
import { Markdown } from "tiptap-markdown";
import { uploadMedia } from "../../lib/api";

interface RichMarkdownEditorProps {
  value: string;
  onChange: (v: string) => void;
  height?: number;
}

function insertSyntax(current: string, syntax: string, cursorPos: number): { next: string; nextCursor: number } {
  // Simple insertion/wrapping convenience
  const before = current.slice(0, cursorPos);
  const after = current.slice(cursorPos);
  const next = before + syntax + after;
  return { next, nextCursor: before.length + syntax.length };
}

export function RichMarkdownEditor({ value, onChange, height = 400 }: RichMarkdownEditorProps) {
  const [preview, setPreview] = React.useState(false);
  const [dir, setDir] = React.useState<"ltr" | "rtl">("rtl");
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1,2,3] }),
      Link.configure({ autolink: true, openOnClick: true, linkOnPaste: true }),
      Image,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Markdown.configure({ html: false, transformPastedText: true }),
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate({ editor }) {
      const md = editor.storage.markdown.getMarkdown();
      onChange(md);
    },
  });

  function cmd(fn: () => void) { fn(); }
  function apply(syntax: string) {
    // Fallback insertion if editor not ready
    if (!editor) return;
    editor.commands.insertContent(syntax);
  }

  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

  // Helpers for common markdown snippets
  const actions = {
    h1: () => apply("\n\n# Heading 1\n\n"),
    h2: () => apply("\n\n## Heading 2\n\n"),
    h3: () => apply("\n\n### Heading 3\n\n"),
    ol: () => apply("\n\n1. First\n2. Second\n3. Third\n\n"),
    ul: () => apply("\n\n- Item A\n- Item B\n- Item C\n\n"),
    hr: () => apply("\n\n---\n\n"),
    img: () => apply("![alt text](https://example.com/image.jpg)"),
    table: () => apply("\n\n| Column A | Column B |\n|---|---|\n| Val 1 | Val 2 |\n\n"),
    rtl: () => setDir("rtl"),
    ltr: () => setDir("ltr"),
  };

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset
    if (!file) return;
    try {
      const media = await uploadMedia(file);
      if (media?.url) {
        apply(`![${media.fileName || file.name}](${media.url})`);
      }
    } catch (err: any) {
      console.error("Image upload failed", err);
      alert(err?.message || "Image upload failed");
    }
  }

  return (
    <div className="rounded border bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b bg-gray-50">
        <span className="text-xs font-semibold text-gray-600">Markdown Editor</span>
        <div className="flex flex-wrap gap-1">
          <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">B</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100 italic">i</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleCode().run()} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100 font-mono">{'</>'}</button>
          <button type="button" onClick={() => apply("\n\n> quote\n\n") } className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">"</button>
          <button type="button" onClick={() => apply("\n\n```\n\n```\n\n") } className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">CodeBlk</button>
          <button type="button" onClick={() => editor?.chain().focus().setHeading({ level: 1 }).run()} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">H1</button>
          <button type="button" onClick={() => editor?.chain().focus().setHeading({ level: 2 }).run()} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">H2</button>
          <button type="button" onClick={() => editor?.chain().focus().setHeading({ level: 3 }).run()} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">H3</button>
          <button type="button" onClick={() => apply("[text](url)") } className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">Link</button>
          <button type="button" onClick={actions.img} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">Image</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">• List</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">1. List</button>
          <button type="button" onClick={() => apply("\n\n| Column A | Column B |\n|---|---|\n| Val 1 | Val 2 |\n\n")} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">Table</button>
          <button type="button" onClick={actions.hr} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">HR</button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex gap-1">
            <button type="button" onClick={() => actions.rtl()} className={`px-2 py-1 text-xs rounded border ${dir==='rtl' ? 'bg-gray-200' : 'bg-white'}`}>RTL</button>
            <button type="button" onClick={() => actions.ltr()} className={`px-2 py-1 text-xs rounded border ${dir==='ltr' ? 'bg-gray-200' : 'bg-white'}`}>LTR</button>
          </div>
          <button type="button" onClick={openFilePicker} className="px-2 py-1 text-xs rounded border bg-white hover:bg-gray-100">Upload Image</button>
          <button type="button" onClick={() => setPreview(p => !p)} className="px-2 py-1 text-xs rounded bg-yellow-500 text-white hover:bg-yellow-600">
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onPickFile} />
      {!preview ? (
        <div className="p-2" dir={dir}>
          <EditorContent editor={editor} className="tiptap-content border rounded min-h-[300px]" />
        </div>
      ) : (
        <div className="prose max-w-none p-3 overflow-y-auto" style={{ maxHeight: height }} dir={dir}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              [rehypeSanitize, {
                ...defaultSchema,
                attributes: {
                  ...defaultSchema.attributes,
                  img: ['src', 'alt', 'title'],
                  a: ['href', 'title', 'target', 'rel'],
                },
                protocols: {
                  ...((defaultSchema as any).protocols || {}),
                  src: ['http', 'https', 'data'],
                  href: ['http', 'https', 'mailto'],
                },
              }]
            ]}
          >
            {value || "_Nothing to preview yet..._"}
          </ReactMarkdown>
        </div>
      )}
      <div className="px-3 py-2 text-[11px] text-gray-500 border-t flex justify-between">
        <span>{wordCount} words</span>
        <span>{preview ? 'Preview mode' : 'Editing mode'} · {dir.toUpperCase()}</span>
      </div>
    </div>
  );
}
