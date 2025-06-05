"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const Navigation = () => {
  return (
    <div className="container flex items-center justify-between">
      <Link href={"../"}>
        <div className="flex items-center gap-2">
          <img src="../film.png" alt="" className="w-5 h-5" />

          <p className="text-[#4338CA] text-[16px] font-bold">Movie Z</p>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <Button className="bg-white border border-[#E4E4E7] rounded-[8px] shadow-sm">
          <img src="../chevron-down.png" alt="" className="w-4 h-4" />

          <p className="text-[14px] font-medium text-black">Genre</p>
        </Button>
        <div className="w-full flex px-3 items-center gap-[10px] border border-[#E4E4E7] rounded-[8px]">
          <img src="../search.png" alt="" className="w-4 h-4" />
          <Input className="border-0" />
        </div>
      </div>
      <Button className="flex items-center justify-center px-4 py-2 bg-white">
        <img src="../moon.png" alt="" className="w-4 h-4" />
      </Button>
    </div>
  );
};
export default Navigation;
