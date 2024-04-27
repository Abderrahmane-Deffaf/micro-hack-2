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
import AudioRender from "./AudioRender";

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
  content: z.string(),
});
type AudioType = z.infer<typeof formSchema>;

type AudioContextType = {
  file: File | undefined;
  form: UseFormReturn<AudioType, any, undefined>;
};

export const AudioContext = createContext<AudioContextType>({
  file: undefined,
  form: {} as UseFormReturn<AudioType, any, undefined>,
});

export default function UploadAudio() {
  // first of all upload the pdf
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      persons: [],
      roles: [],
      content: "",
    },
  });
  const [file, setFile] = useState<File | undefined>(undefined);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files && files.length > 0) {
      console.log(files[0]);

      setFile(files[0]);
    }
  }
  // second get the file name
  // send the file to the server to get text from the pdf
  // get the persons and existing roles
  // add persons and roles and could remove them
  // adding the persons means they can not see the file and verse versa
  // search in the text
  // hide section from some specific users and roles
  function onSubmit(values: AudioType) {
    console.log(values);
  }
  return (
    <AudioContext.Provider value={{ file, form }}>
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
                      <span>Upload Audio File</span>
                      <Image src={fileUpoload} alt="file upload" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        accept=".wav"
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
          </form>
        </Form>
        {file && <AudioRender />}
        
        {/* chat bot */}
      </div>
    </AudioContext.Provider>
  );
}
