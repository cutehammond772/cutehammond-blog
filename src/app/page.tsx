export default async function Page() {
  return (
    <>
      <div className="mb-12 mt-24 text-2xl font-bold md:mt-48 md:text-4xl">
        모든 글
      </div>
      <div className="grid grid-flow-row grid-cols-1 gap-x-8 gap-y-24 xl:grid-cols-2">
        <div className="grid min-h-[30rem] grid-rows-[2fr_1fr] transition-shadow hover:shadow-2xl">
          <div className="bg-white"></div>
          <div className="row-auto flex flex-col gap-2 p-4 pt-8">
            <div className="flex-grow text-2xl font-bold">
              BOJ 13974 : 파일 합치기 2
            </div>
            <div className="text-md">🕑 2024-02-27</div>
            <div className="text-md">
              ✏️ #알고리즘 #다이나믹프로그래밍 #크누스최적화
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
