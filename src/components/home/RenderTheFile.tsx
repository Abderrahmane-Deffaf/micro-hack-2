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
import { getRoles, getUser, getUserRole } from "./homeFetch";
import { toast } from "sonner";


export default function RenderTheFile() {
  const { file, form } = useContext(pdfContext);
  const id = useId();
  const [content, setContent] = useState<string>(
    "هذا نص عربي تجريبي لإنشاء محتوى باللغة العربية. تم توليد هذا النص لغرض الاختبار والتجربة فقط. يمكن استخدامه في تطوير واختبار التطبيقات والمواقع. اللغة العربية لها نظام كتابة من اليمين إلى اليسار. تتكون الكلمات في اللغة العربية من حروف متصلة. العربية تعتبر واحدة من أكثر اللغات تحدثاً في العالم. تمتلك العربية تاريخاً ثرياً وثقافة متنوعة. الخط العربي له جمال فني خاص ويعتبر فناً عريقاً. تحتوي اللغة العربية على مفردات وتعابير متعددة. القراءة والكتابة بالعربية تتطلب مهارة وتدريباً. الأدب العربي يضم أعمالاً أدبية عظيمة ومتنوعة. العربية تعتبر لغة رسمية في العديد من البلدان. تعد اللغة العربية جزءاً هاماً من الهوية الثقافية العربية. العربية تحتوي على مجموعة متنوعة من اللهجات المحلية. العربية تعد لغة القرآن الكريم والدين الإسلامي. الشعر العربي يعتبر من أعظم أشكال الأدب العربي. اللغة العربية تتمتع بنظام دقيق لتصريف الأفعال. تعتبر العربية لغة جميلة وغنية بالتعابير والمفردات. العربية تستخدم في العديد من المجالات العلمية والأدبية. هذا نص عربي تجريبي لإنشاء محتوى باللغة العربية. تم توليد هذا النص لغرض الاختبار والتجربة فقط. يمكن استخدامه في تطوير واختبار التطبيقات والمواقع. اللغة العربية لها نظام كتابة من اليمين إلى اليسار. تتكون الكلمات في اللغة العربية من حروف متصلة. العربية تعتبر واحدة من أكثر اللغات تحدثاً في العالم. تمتلك العربية تاريخاً ثرياً وثقافة متنوعة. الخط العربي له جمال فني خاص ويعتبر فناً عريقاً. تحتوي اللغة العربية على مفردات وتعابير متعددة. القراءة والكتابة بالعربية تتطلب مهارة وتدريباً. الأدب العربي يضم أعمالاً أدبية عظيمة ومتنوعة. العربية تعتبر لغة رسمية في العديد من البلدان. تعد اللغة العربية جزءاً هاماً من الهوية الثقافية العربية. العربية تحتوي على مجموعة متنوعة من اللهجات المحلية. العربية تعد لغة القرآن الكريم والدين الإسلامي. الشعر العربي يعتبر من أعظم أشكال الأدب العربي. اللغة العربية تتمتع بنظام دقيق لتصريف الأفعال. تعتبر العربية لغة جميلة وغنية بالتعابير والمفردات. العربية تستخدم في العديد من المجالات العلمية والأدبية. هذا نص عربي تجريبي لإنشاء محتوى باللغة العربية. تم توليد هذا النص لغرض الاختبار والتجربة فقط. يمكن استخدامه في تطوير واختبار التطبيقات والمواقع. اللغة العربية لها نظام كتابة من اليمين إلى اليسار. تتكون الكلمات في اللغة العربية من حروف متصلة. العربية تعتبر واحدة من أكثر اللغات تحدثاً في العالم. تمتلك العربية تاريخاً ثرياً وثقافة متنوعة. الخط العربي له جمال فني خاص ويعتبر فناً عريقاً. تحتوي اللغة العربية على مفردات وتعابير متعددة. القراءة والكتابة بالعربية تتطلب مهارة وتدريباً. الأدب العربي يضم أعمالاً أدبية عظيمة ومتنوعة. العربية تعتبر لغة رسمية في العديد من البلدان. تعد اللغة العربية جزءاً هاماً من الهوية الثقافية العربية. العربية تحتوي على مجموعة متنوعة من اللهجات المحلية. العربية تعد لغة القرآن الكريم والدين الإسلامي. الشعر العربي يعتبر من أعظم أشكال الأدب العربي. اللغة العربية تتمتع بنظام دقيق لتصريف الأفعال. تعتبر العربية لغة جميلة وغنية بالتعابير والمفردات. العربية تستخدم في العديد من المجالات العلمية والأدبية."
  );
  const markInstance = new Mark(
    document.querySelector("#search-node") as HTMLElement
  );

  const [roles, setRoles] = useState<any[]>([]);

  const [textToHide, setTextToHide] = useState<string>("");

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

  useEffect(() => {
    async function getRolesData() {
      const userData = await getUser();
      if (userData?._id) {
        const userRole = await getUserRole(userData._id);
        setRoles(userRole);
        //form.setValue("roles", userRole)
        console.log(userRole);
        console.log(userData);
      }

      if (userData?._id) {
        const data = await getRoles(userData._id);
        console.log(data);
      }
    }
    getRolesData();
  }, []);

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("mouse up");

    const selection = window.getSelection();
    if (!selection) return;
    const selectedString = selection.toString().trim();
    setTextToHide(selectedString);
    toast.success(
      `Text selected: ${selectedString} will be showed to the selected roles`
    );
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
                  <MultiSelectorInput placeholder="Select Added roles" />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList className=" bg-slate-800 text-white">
                    {roles?.map((role: any) => (
                      <MultiSelectorItem
                        key={role?._id}
                        value={role?.Role_Name}
                      >
                        {role?.Role_Name}
                      </MultiSelectorItem>
                    ))}
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
