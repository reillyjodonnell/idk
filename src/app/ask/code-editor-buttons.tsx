import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectLabel,
  SelectItem,
} from '@/components/select';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import './code-editor-buttons.css';

export default function CodeEditorButtons() {
  return (
    <NodeViewWrapper className="code-block">
      <Select defaultValue="typescript">
        <SelectTrigger className="w-36 h-8 absolute inset-1 z-10 bg-white">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="xml">XML</SelectItem>
            <SelectItem value="c#">C#</SelectItem>
            <SelectItem value="python">python</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}
