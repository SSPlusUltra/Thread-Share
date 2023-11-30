import { RichTextEditor, Link } from '@mantine/tiptap';
import { generateHTML, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Flex } from '@mantine/core';
import '@mantine/tiptap/styles.css';
import Placeholder from '@tiptap/extension-placeholder'
import { MarkdownSerializer} from 'prosemirror-markdown';
import { useMemo, useState } from 'react';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { auth } from '../firebase';
const content =""
  
const RTE = (props) => {
  const [op, setop] = useState();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: 'Description(optional)'
      }),
    ],
    content,
    onUpdate: () => {
      const serializedContent = editor.getHTML();
      if (props.formType === 'subreddit') {
        props.ontext(serializedContent);
      }
      if (props.formType === 'post') {
        props.onpost(serializedContent);
      }
      if (props.formType === 'comment') {
        props.onSub(serializedContent, auth.currentUser.displayName);
      }
    },
    
  },[props.cmnt]);

  return (
    <div >
<RichTextEditor editor={editor} style={{height:'200px',width:'auto',wordBreak:'break-word'}}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      { (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              padding: '10px',
              color: 'rgba(0, 0, 0, 0.5)',
              pointerEvents: 'none',
            }}
          >
          </div>
        )}

      <RichTextEditor.Content />
    </RichTextEditor>

    </div>
    
  );
}
export default RTE;