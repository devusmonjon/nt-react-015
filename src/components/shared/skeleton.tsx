import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard({ length = 0 }: { length: number }) {
  return (
    <div className="container pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {new Array(length).fill(0).map((_, index) => (
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            key={index}
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <Skeleton className="h-[24px] w-full" />
              <Skeleton className="h-[14px] my-[3px] w-[40%]" />
            </div>
            <div className="p-6 pt-0">
              <Skeleton className="h-[50px] w-full" />
            </div>
            <div className="flex items-center p-6 pt-0 justify-end">
              <Skeleton className="h-[14px] my-[5px] w-[70%]" />
            </div>
            {/* <Skeleton className="h-[10px] w-[200px]" />
            <div className="space-y-[24px]">
              <Skeleton className="h-[14px] w-[250px]" />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
