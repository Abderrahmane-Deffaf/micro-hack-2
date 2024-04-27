"use client";
import { use, useContext, useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { AudioContext } from "./UploadAudio";

export default function AudioRender() {
  const { file } = useContext(AudioContext);
  const [src, setSrc] = useState<string>();
  useEffect(() => {
    if (file) {
      console.log(src);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === "string") {
          setSrc(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [file]);
  console.log(file);

  return <ReactAudioPlayer src={src} controls />;
}
