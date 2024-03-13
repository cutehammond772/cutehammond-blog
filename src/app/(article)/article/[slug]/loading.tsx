export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-2 bg-beige-300 px-4 pb-4 pt-48 dark:bg-charcoal-700">
      <span className="f1-bold break-keep text-center leading-normal md:pb-8">
        글을 불러오는 중
      </span>
      <hr className="bg-layer h-[2px] border-0" />
    </div>
  );
}
