"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

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
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  function apply(syntax: string) {
    const el = textareaRef.current;
    if (!el) return;
    const pos = el.selectionStart ?? value.length;
    const { next, nextCursor } = insertSyntax(value, syntax, pos);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = nextCursor;
    });
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
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || "");
      if (!url) return;
      apply(`![${file.name}](${url})`);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="rounded border bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b bg-gray-50">
        <span className="text-xs font-semibold text-gray-600">Markdown Editor</span>
        <div className="flex flex-wrap gap-1">
          <button type="button" onClick={() => apply("**bold**")} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">B</button>
          <button type="button" onClick={() => apply("*italic*") } className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100 italic">i</button>
          <button type="button" onClick={() => apply("`code`") } className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100 font-mono">{'</>'}</button>
          <button type="button" onClick={() => apply("\n\n> quote\n\n") } className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">"</button>
          <button type="button" onClick={() => apply("\n\n``````\n\n") } className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">CodeBlk</button>
          <button type="button" onClick={actions.h1} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">H1</button>
          <button type="button" onClick={actions.h2} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">H2</button>
          <button type="button" onClick={actions.h3} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">H3</button>
          <button type="button" onClick={() => apply("[text](url)") } className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">Link</button>
          <button type="button" onClick={actions.img} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">Image</button>
          <button type="button" onClick={actions.ul} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">• List</button>
          <button type="button" onClick={actions.ol} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">1. List</button>
          <button type="button" onClick={actions.table} className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">Table</button>
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
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ minHeight: height }}
          className="w-full p-3 text-sm font-mono outline-none resize-y"
          dir={dir}
          placeholder="Write your blog content using GitHub Flavored Markdown..."
        />
      ) : (
        <div className="prose max-w-none p-3 overflow-y-auto" style={{ maxHeight: height }} dir={dir}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{value || "_Nothing to preview yet..._"}</ReactMarkdown>
        </div>
      )}
      <div className="px-3 py-2 text-[11px] text-gray-500 border-t flex justify-between">
        <span>{wordCount} words</span>
        <span>{preview ? 'Preview mode' : 'Editing mode'} · {dir.toUpperCase()}</span>
      </div>
    </div>
  );
}
