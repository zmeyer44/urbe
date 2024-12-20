import type { ComponentProps } from "react";
import { Avatar as DefaultAvatar, AvatarFallback } from "./avatar-raw";
import { cn } from "@repo/design-system/lib/utils"
import { BlurImage } from "./blur-image";

type AvatarProps = ComponentProps<typeof DefaultAvatar> & {
  name?: string | null;
  src?: string | null;
  width?: number;
};
export const DICEBEAR_AVATAR_URL =
  "https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&fontFamily=Helvetica&fontSize=40&seed=";

export function Avatar({
  name,
  src,
  className = "rounded-full",
  width = 24,
  ...props
}: AvatarProps) {
  if (src || name) {
    const alt = name ?? "User";
    return (
      <DefaultAvatar
        className={cn("isolate size-5", className)}
        // style={{
        //   width: width,
        //   height: width,
        // }}
        {...props}
      >
        <BlurImage
          src={
            src
              ? src.trimEnd()
              : `${DICEBEAR_AVATAR_URL}${alt}`
          }
          alt={alt ?? "user"}
          className="z-10 h-full w-full flex-none overflow-hidden object-cover"
          fill={!width}
          width={width}
          height={width}
          referrerPolicy="no-referrer"
        />
        <AvatarFallback className="relative z-0 h-full w-full text-xs"></AvatarFallback>
      </DefaultAvatar>
    );
  } else {
    return (
      <DefaultAvatar className={cn("isolate", className)} {...props}>
        <BlurImage
          src={`https://avatar.vercel.sh/u`}
          alt={"user"}
          className="z-10 h-full w-full flex-none overflow-hidden"
          fill={!width}
          width={width}
          height={width}
          referrerPolicy="no-referrer"
        />
        <AvatarFallback className="relative z-0 h-full w-full text-xs"></AvatarFallback>
      </DefaultAvatar>
    );
  }
}
