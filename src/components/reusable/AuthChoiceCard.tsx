import clsx from "clsx";
import { Heading4 } from "lucide-react";

type AuthChoiceCardProps = {
  title: string;
  description?: string;
  color: "orange" | "green";
};

export default function AuthChoiceCard({
  title,
  description,
  color,
}: AuthChoiceCardProps) {
  return (
    <div
      className={clsx(
        "bg-gradient-to-r text-left gap-2 flex flex-col w-48  text-wrap text-white p-4 rounded-md",
        {
          " from-orange-500 via-orange-300 to-yellow-400": color === "orange",
          " from-green-500 via-green-300 to-lime-300": color === "green",
        }
      )}
    >
      {title && <h4>{title}</h4>}
      {description && <p>{description}</p>}
    </div>
  );
}
