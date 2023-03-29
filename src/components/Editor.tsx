import { chakra } from "@chakra-ui/react";
import { DevfiveComponent } from "@interfaces/types";
import { lazy, Suspense } from "react";
import { ReactQuillProps } from "react-quill";

const Quill = lazy(() => import("./Quill"));

export type EditorProps = ReactQuillProps & {
  onUpload?: (files: File[]) => Promise<string[] | string>;
  fonts?: {
    title: string;
    fontFamily: string;
  }[];
};

const Editor: DevfiveComponent<EditorProps> = chakra((props: EditorProps) => (
  <Suspense>
    <Quill {...props} />
  </Suspense>
));

export default Editor;
