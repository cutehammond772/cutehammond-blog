// Loading Article Page Skeleton
export default function Loading() {
  return (
    <article>
      <div className="mb-8 mt-48 flex flex-col justify-end gap-2 pb-4">
        <span className="bg-layer h-8 w-full animate-pulse pb-4 md:pb-8" />
        <span className="bg-layer text-layer bg-layer h-8 w-96 animate-pulse self-start px-2 text-base" />
        <hr className="bg-layer h-[2px] border-0" />
      </div>
      <div className="bg-layer min-h-full"></div>
    </article>
  );
}
