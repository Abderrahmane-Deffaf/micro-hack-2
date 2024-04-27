"use client";

import { useContext } from "react";
import { pdfContext } from "./PdfUpload";
import chatBotIcon from '@/assets/home/chatBotIcon.svg' ; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function ChatBot() {
  const {form} = useContext(pdfContext);  

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image src={chatBotIcon} alt="chatBotIcon" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
