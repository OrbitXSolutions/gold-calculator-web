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
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

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
          <button type="button" onClick={() => apply("\n\n### Heading\n\n") } className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">H3</button>
          <button type="button" onClick={() => apply("[text](url)") } className="px-2 py-1 text-xs rounded bg-white border hover:bg-gray-100">Link</button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button type="button" onClick={() => setPreview(p => !p)} className="px-2 py-1 text-xs rounded bg-yellow-500 text-white hover:bg-yellow-600">
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>
      {!preview ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ minHeight: height }}
          className="w-full p-3 text-sm font-mono outline-none resize-y"
          placeholder="Write your blog content using GitHub Flavored Markdown..."
        />
      ) : (
        <div className="prose max-w-none p-3 overflow-y-auto" style={{ maxHeight: height }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{value || "_Nothing to preview yet..._"}</ReactMarkdown>
        </div>
      )}
      <div className="px-3 py-2 text-[11px] text-gray-500 border-t flex justify-between">
        <span>{wordCount} words</span>
        <span>{preview ? 'Preview mode' : 'Editing mode'}</span>
      </div>
    </div>
  );
}
