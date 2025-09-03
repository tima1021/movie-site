import { Separator } from "@/components/ui/separator";

type Person = {
  name: string;
  job?: string;
};

type CastData = {
  cast?: Person[];
  crew?: Person[];
};

const StaffInfo = ({
  job,
  role,
  castdata,
  type = "crew",
}: {
  job?: string;
  role: string;
  castdata: CastData;
  type?: "crew" | "cast";
}) => {
  let staff: Person[] | undefined;

  if (type === "cast") {
    staff = castdata?.cast?.slice(0, 3);
  } else {
    staff = castdata?.crew?.filter((person: Person) => person.job === job);
  }

  return (
    <div className="w-full">
      <div className="flex text-[#09090B] gap-[53px] text-base pb-1">
        <h3 className="font-bold">{role}</h3>
        <p className="font-normal">
          {staff?.map((person: Person, index: number) => (
            <span key={index}>
              {person.name}
              {index < (staff?.length || 0) - 1 && " · "}
            </span>
          ))}
        </p>
      </div>
      <Separator />
    </div>
  );
};

export default StaffInfo;
