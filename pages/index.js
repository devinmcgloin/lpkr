import Editor from 'components/editor';
import { StandardMetadata } from 'components/social-metadata';

export default function EditorPage() {
  return (
    <>
      <StandardMetadata
        title="lpkr"
        description="Make generative art in the browser"
      />
      <Editor />
    </>
  );
}
