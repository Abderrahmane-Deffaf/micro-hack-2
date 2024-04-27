"use client";

import { useContext, useState } from "react";
import { pdfContext } from "./PdfUpload";
import chatBotIcon from "@/assets/home/chatBotIcon.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { isBot } from "next/dist/server/web/spec-extension/user-agent";
import RenderChat from "./RenderChat";

const formSchema = z.object({
  question: z.string().min(1, { message: "Required" }),
});
type MessageType = z.infer<typeof formSchema>;

export default function ChatBot() {
  const { form } = useContext(pdfContext);

  const [conversation, setConversation] = useState([
    {
      chat: "Hi there. Consider me as the Document_name.pdf its self, What do you want to know about me ?",
      isBot: true, 
    },
  ]); ; 

  const messageForm = useForm<MessageType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  function onSubmit(values: MessageType) {
    if(values.question){
      setConversation((prev)=>[...prev, {chat: values.question, isBot: false}])  ; 
    }
    console.log(values);
  }

  return (
    <div className=" justify-end flex ">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image className=" w-20 h-20" src={chatBotIcon} alt="chatBotIcon" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-[20rem] p-0 border-none rounded-2xl overflow-hidden mr-[4rem]">
          <DropdownMenuLabel className=" space-y-2 px-2 py-4 text-center rounded-t-2xl   bg-gradient-to-r text-white from-orange-500 to-orange-300 ">
            <p className=" text-xl font-bold">
              {form.getValues("file")?.name || "Document_name.pdf"} Chat Bot
            </p>
            <p>Please ask your question.</p>
          </DropdownMenuLabel>
          <div className=" h-[15rem]  overflow-x-hidden overflow-y-scroll removeScrollBar">
            <RenderChat conversation={conversation} />
          </div>
          <Separator />
          <Form {...messageForm}>
            <form
              onSubmit={messageForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={messageForm.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Type your question here"
                        className="rounded-3xl"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
