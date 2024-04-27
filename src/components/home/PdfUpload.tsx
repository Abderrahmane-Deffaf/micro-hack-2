"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import fileUpoload from "@/assets/home/fileUpload.svg";
import { createContext, useState } from "react";
import deleteIcon from "@/assets/home/delete.svg";
import RenderTheFile from "./RenderTheFile";
import AccessUsers from "./AccessUsers";
import ChatBot from "./ChatBot";
import { getDocumentText, uploadDocument } from "./homeFetch";

const fileSchema = z
  .instanceof(File, { message: "Required" })
  .refine(
    (file) =>
      file.size === 0 ||
      file.type.endsWith(".png") ||
      file.type.endsWith(".pdf") ||
      file.type.endsWith(".wave")
  );

const formSchema = z.object({
  file: z.any(),
  persons: z.array(z.string()),
  roles: z.array(z.string()),
  rolesHide: z.array(z.string()),
  content: z.string(),
});
type PdfType = z.infer<typeof formSchema>;

type PdfContextType = {
  file: File | undefined;
  form: UseFormReturn<PdfType, any, undefined>;
};

export const pdfContext = createContext<PdfContextType>({
  file: undefined,
  form: {} as UseFormReturn<PdfType, any, undefined>,
});

export default function PdfUpload() {
  // first of all upload the pdf
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      persons: [],
      roles: [],
      rolesHide: [],
      content: "",
    },
  });
  const [file, setFile] = useState<File | undefined>(undefined);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files && files.length > 0) {
      console.log(files[0]);
      const data = await uploadDocument(files[0]);
      console.log(data);
      if (data?._id) {
        const res = await getDocumentText(data._id);
        console.log(res);
      }
    }
  }
  // second get the file name
  // send the file to the server to get text from the pdf
  // get the persons and existing roles
  // add persons and roles and could remove them
  // adding the persons means they can not see the file and verse versa
  // search in the text
  // hide section from some specific users and roles
  function onSubmit(values: PdfType) {
    console.log(values);
  }
  return (
    <pdfContext.Provider value={{ file, form }}>
      <div className=" space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {!file && (
              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel
                      className=" items-center flex cursor-pointer gap-2 w-fit   rounded-3xl  bg-gradient-to-r from-orange-500 to-orange-300 text-white font-semibold px-4 py-2 "
                      htmlFor="file"
                    >
                      <span>Upload File</span>
                      <Image src={fileUpoload} alt="file upload" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        accept="application/pdf"
                        type="file"
                        name="file"
                        id="file"
                        className="hidden"
                        onChange={handleChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {file && (
              <div className="flex justify-between">
                <div className=" flex items-center gap-1">
                  <h4>{file.name}</h4>
                  <Button onClick={() => setFile(undefined)}>
                    <Image
                      className=" w-10 h-10"
                      src={deleteIcon}
                      alt="delete icon"
                    />
                  </Button>
                </div>
                <Button
                  className=" items-center flex cursor-pointer gap-2 w-fit   rounded-3xl  bg-gradient-to-r from-orange-500 to-orange-300 text-white font-semibold px-4 py-2 "
                  type="submit"
                >
                  <span>Save File</span>
                  <Image src={fileUpoload} alt="file upload" />
                </Button>
              </div>
            )}
            <AccessUsers />
            {/* {file && } */}
            <RenderTheFile />
          </form>
        </Form>
        {/* chat bot */}
        <ChatBot />
      </div>
    </pdfContext.Provider>
  );
}
