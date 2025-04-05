'use client';

import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

export function RichTextEditor({ content, onChange, className }: RichTextEditorProps) {
  return (
    <div className={className}>
      <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        apiKey="gpl" // You'll need to replace this with your TinyMCE API key
        value={content}
        onEditorChange={(newContent) => onChange(newContent)}
        init={{
          height: 600,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; font-size: 14px; }',
          skin: 'oxide',
          content_css: 'default',
          branding: false,
        }}
      />
    </div>
  );
} 