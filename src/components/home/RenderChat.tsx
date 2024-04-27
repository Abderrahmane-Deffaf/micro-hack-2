import chatAvatar from '@/assets/home/chatAvatar.svg' ; 
import Image from 'next/image';
import { useId } from 'react';

type RenderChatProps = {
  conversation:any; 
}
export default function RenderChat({conversation}:RenderChatProps) {
  const id = useId() ; 

  return (
    <div className=' p-2 space-y-4'>
      {conversation.map((element: any) => (
        <div key={id}>
          {element?.isBot && (
            <div className=" flex items-end gap-1">
              <Image src={chatAvatar} alt="chat avatar" />
              <p className=" text-wrap max-w-[13rem] bg-gray-200 text-black rounded-lg p-2">
                {element?.chat}
              </p>
            </div>
          )}
          {!element?.isBot && (
            <div className=" flex items-end justify-end gap-1">
              <p className=" text-wrap max-w-[10rem] bg-gray-200 text-black rounded-lg p-2">
                {element?.chat}
              </p>
              <Image src={chatAvatar} alt="chat avatar" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
