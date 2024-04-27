"use client";
import { useContext, useEffect, useId, useMemo, useState } from "react";
import { pdfContext } from "./PdfUpload";
import PdfContentBox from "../reusable/PdfContentBox";
import { baseUrlAi } from "@/lib/helper";
import { getCookieValue } from "@/lib/constants";
import { Input } from "../ui/input";

import SearchIcon from "@/assets/home/search.svg";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
import { set } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "../ui/form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../extention/multi-select";
import Mark from "mark.js";

export default function RenderTheFile() {
  const { file, form } = useContext(pdfContext);
  const id = useId();
  const [content, setContent] = useState<string>(
    "content is loading is content hello content is loading is content hello content is loading is content hello content is loading is content hello content is loading is content hello content is loading is content hello content is loading is content hello content is loading is content hello content is loading is content hello content is loading is content hello content is loading is content hello content is loading is content hello content is loading is content hello content is loading is content hello content is loading is content hello vvcontent is loading is content hello content is loading is content hello content is loading is content hello "
  );

  const [textToHide, setTextToHide] = useState<string>("");

  const markInstance = new Mark(document.querySelector("#search-node"));

  const handleSearch = useDebouncedCallback((e) => {
    console.log(`Searching... ${e.target.value}`);
    markInstance.unmark({
      done: () => {
        markInstance.mark(e.target.value);
      },
    });
  }, 300);

  console.log(file);
  useEffect(() => {
    const token = getCookieValue();
    async function getFileText() {
      if (file) {
        const formData = new FormData();
        formData.append("pdfs", "D:/1 study/1cs2/ro2/serieTD7");
        try {
          const response = await fetch(`${baseUrlAi}/get_pdf_text`, {
            method: "POST",
            body: formData,
            headers: {
              Accept: "/",
              "User-Agent": "Thunder Client (https://www.thunderclient.com/)",
            },
          });
          const data = await response.json();
          console.log(data);
          form.setValue("content", content);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getFileText();
  }, [file]);

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("mouse up");

    const selection = window.getSelection();
    if (!selection) return;
    const selectedString = selection.toString().trim();
    setTextToHide(selectedString);
    console.log(selectedString);
  };
  return (
    <div className=" space-y-4">
      <div className=" flex items-center justify-between">
        <div className=" h-fit border border-slate-700 rounded-3xl w-fit px-2  flex gap-1">
          <Input onChange={handleSearch} type="text" />
          <Image src={SearchIcon} alt="search" />
        </div>
        <FormField
          control={form.control}
          name="rolesHide"
          render={({ field }) => (
            <FormItem className=" flex gap-2 items-center">
              <FormLabel>Show this Just To</FormLabel>
              <MultiSelector
                onValuesChange={field.onChange}
                values={field.value}
              >
                <MultiSelectorTrigger>
                  <MultiSelectorInput placeholder="Select your framework" />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList className=" bg-slate-800 text-white">
                    <MultiSelectorItem value={"React3"}>
                      React
                    </MultiSelectorItem>
                    <MultiSelectorItem value={"Vue3"}>Vue</MultiSelectorItem>
                    <MultiSelectorItem value={"Svelte3"}>
                      Svelte
                    </MultiSelectorItem>
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
            </FormItem>
          )}
        />
      </div>

      <PdfContentBox>
        <div onMouseUp={handleMouseUp}>
          <div id="search-node">{content}</div>
        </div>
      </PdfContentBox>
    </div>
  );
}
