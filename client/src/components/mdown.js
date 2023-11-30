import { generateHTML } from '@tiptap/html';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import React, { useMemo } from 'react';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';

const Mdown = (props) => {

  const output = useMemo(() => {
    return generateHTML(props.jsonContent, [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline
    ]);
  });

  return (
    <div dangerouslySetInnerHTML={{ __html: `${output}` }}/>
  );
};

export default Mdown;