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

  const [roles, setRoles] = useState();
  useEffect(() => {
    async function getRolesData() {
      const data = await getUserRole();
      console.log(data);

      const roles = await getRoles("hello");
    }
    getRolesData();
  }, []);

  return (
    <div className=" flex flex-col gap-4">
      {/* <FormField
        control={form.control}
        name="persons"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Persons</FormLabel>
            <MultiSelector onValuesChange={field.onChange} values={field.value}>
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select your framework" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList className=" bg-slate-800 text-white">
                  <MultiSelectorItem value={"React"}>React</MultiSelectorItem>
                  <MultiSelectorItem value={"Vue"}>Vue</MultiSelectorItem>
                  <MultiSelectorItem value={"Svelte"}>Svelte</MultiSelectorItem>
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </FormItem>
        )}
      /> */}
      <FormField
        control={form.control}
        name="roles"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Roles</FormLabel>
            <MultiSelector onValuesChange={field.onChange} values={field.value}>
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select your framework" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList className=" bg-slate-800 text-white">
                  <MultiSelectorItem value={"React1"}>React</MultiSelectorItem>
                  <MultiSelectorItem value={"Vue1"}>Vue</MultiSelectorItem>
                  <MultiSelectorItem value={"Svelte1"}>
                    Svelte
                  </MultiSelectorItem>
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </FormItem>
        )}
      />
    </div>
  );
}
