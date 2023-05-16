import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectItem,
} from '@/components/select';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import './code-editor-buttons.css';

export default function CodeEditorButtons({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: any) {
  return (
    <NodeViewWrapper className="code-block">
      <select
        className="w-fit h-8 px-2 absolute inset-1 z-10 bg-[#bebebe11] border-2 border-gray-400 text-white active:border-white"
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight
          .listLanguages()
          .map((lang: string, index: string) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
      </select>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
    // <NodeViewWrapper className="code-block">
    //   <Select onValueChange={(value) => updateAttributes({ language: value })}>
    //     <SelectTrigger className="w-36 h-8 absolute inset-1 z-10 bg-[#bebebe11] border-2 border-gray-400 text-white active:border-white">
    //       <SelectValue defaultValue={'Typescript'} />
    //     </SelectTrigger>
    //     <SelectContent>
    //       <SelectGroup>
    //         {extension.options.lowlight
    //           .listLanguages()
    //           .map((lang: string, index: any) => (
    //             <SelectItem key={index} value={lang}>
    //               {lang}
    //             </SelectItem>
    //           ))}
    //       </SelectGroup>
    //     </SelectContent>
    //   </Select>
    //   <pre>
    //     <NodeViewContent as="code" />
    //   </pre>
    // </NodeViewWrapper>
  );
}
