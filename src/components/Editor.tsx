import { chakra } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { ReactQuillProps } from "react-quill";

import { DevfiveComponent } from "../interfaces/types";

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
