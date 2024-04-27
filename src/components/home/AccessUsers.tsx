"use client";
import { useContext, useEffect, useState } from "react";
import { pdfContext } from "./PdfUpload";
import { FormField, FormItem, FormLabel } from "../ui/form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../extention/multi-select";
import { baseUrl } from "@/lib/helper";
import { getRoles, getUser, getUserRole } from "./homeFetch";

export default function AccessUsers() {
  const { form } = useContext(pdfContext);

  const [roles, setRoles] = useState<any[]>([]);
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

  return (
    <div className=" flex flex-col gap-4">
      <FormField
        control={form.control}
        name="roles"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Roles</FormLabel>
            <MultiSelector
              className=" w-fit"
              onValuesChange={field.onChange}
              values={field.value}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select Added roles" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList className=" bg-slate-800 text-white">
                  {roles.map((role) => (
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
  );
}

