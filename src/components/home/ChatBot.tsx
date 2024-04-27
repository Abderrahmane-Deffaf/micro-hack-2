"use client";

import { useContext, useEffect, useState } from "react";
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
import { baseUrl } from "@/lib/helper";

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
  ]);

  const messageForm = useForm<MessageType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });
  useEffect(() => {
    async function tainBot() {
      try {
        const res = await fetch(`http://165.232.116.238:5005/initialize`, {
          method: "POST",
          body: JSON.stringify({
            initial_data:
              "هذا نص عربي تجريبي لإنشاء محتوى باللغة العربية. تم توليد هذا النص لغرض الاختبار والتجربة فقط. يمكن استخدامه في تطوير واختبار التطبيقات والمواقع. اللغة العربية لها نظام كتابة من اليمين إلى اليسار. تتكون الكلمات في اللغة العربية من حروف متصلة. العربية تعتبر واحدة من أكثر اللغات تحدثاً في العالم. تمتلك العربية تاريخاً ثرياً وثقافة متنوعة. الخط العربي له جمال فني خاص ويعتبر فناً عريقاً. تحتوي اللغة العربية على مفردات وتعابير متعددة. القراءة والكتابة بالعربية تتطلب مهارة وتدريباً. الأدب العربي يضم أعمالاً أدبية عظيمة ومتنوعة. العربية تعتبر لغة رسمية في العديد من البلدان. تعد اللغة العربية جزءاً هاماً من الهوية الثقافية العربية. العربية تحتوي على مجموعة متنوعة من اللهجات المحلية. العربية تعد لغة القرآن الكريم والدين الإسلامي. الشعر العربي يعتبر من أعظم أشكال الأدب العربي. اللغة العربية تتمتع بنظام دقيق لتصريف الأفعال. تعتبر العربية لغة جميلة وغنية بالتعابير والمفردات. العربية تستخدم في العديد من المجالات العلمية والأدبية. هذا نص عربي تجريبي لإنشاء محتوى باللغة العربية. تم توليد هذا النص لغرض الاختبار والتجربة فقط. يمكن استخدامه في تطوير واختبار التطبيقات والمواقع. اللغة العربية لها نظام كتابة من اليمين إلى اليسار. تتكون الكلمات في اللغة العربية من حروف متصلة. العربية تعتبر واحدة من أكثر اللغات تحدثاً في العالم. تمتلك العربية تاريخاً ثرياً وثقافة متنوعة. الخط العربي له جمال فني خاص ويعتبر فناً عريقاً. تحتوي اللغة العربية على مفردات وتعابير متعددة. القراءة والكتابة بالعربية تتطلب مهارة وتدريباً. الأدب العربي يضم أعمالاً أدبية عظيمة ومتنوعة. العربية تعتبر لغة رسمية في العديد من البلدان. تعد اللغة العربية جزءاً هاماً من الهوية الثقافية العربية. العربية تحتوي على مجموعة متنوعة من اللهجات المحلية. العربية تعد لغة القرآن الكريم والدين الإسلامي. الشعر العربي يعتبر من أعظم أشكال الأدب العربي. اللغة العربية تتمتع بنظام دقيق لتصريف الأفعال. تعتبر العربية لغة جميلة وغنية بالتعابير والمفردات. العربية تستخدم في العديد من المجالات العلمية والأدبية. هذا نص عربي تجريبي لإنشاء محتوى باللغة العربية. تم توليد هذا النص لغرض الاختبار والتجربة فقط. يمكن استخدامه في تطوير واختبار التطبيقات والمواقع. اللغة العربية لها نظام كتابة من اليمين إلى اليسار. تتكون الكلمات في اللغة العربية من حروف متصلة. العربية تعتبر واحدة من أكثر اللغات تحدثاً في العالم. تمتلك العربية تاريخاً ثرياً وثقافة متنوعة. الخط العربي له جمال فني خاص ويعتبر فناً عريقاً. تحتوي اللغة العربية على مفردات وتعابير متعددة. القراءة والكتابة بالعربية تتطلب مهارة وتدريباً. الأدب العربي يضم أعمالاً أدبية عظيمة ومتنوعة. العربية تعتبر لغة رسمية في العديد من البلدان. تعد اللغة العربية جزءاً هاماً من الهوية الثقافية العربية. العربية تحتوي على مجموعة متنوعة من اللهجات المحلية. العربية تعد لغة القرآن الكريم والدين الإسلامي. الشعر العربي يعتبر من أعظم أشكال الأدب العربي. اللغة العربية تتمتع بنظام دقيق لتصريف الأفعال. تعتبر العربية لغة جميلة وغنية بالتعابير والمفردات. العربية تستخدم في العديد من المجالات العلمية والأدبية.",
          }),
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    tainBot();
  }, []);

  async function onSubmit(values: MessageType) {
    if (values.question) {
      try {
        const res = await fetch(`http://165.232.116.238:5005/ask`, {
          method: "POST",
          body: JSON.stringify({
            question: values.question,
          }),
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      setConversation((prev) => [
        ...prev,
        { chat: values.question, isBot: false },
      ]);
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
