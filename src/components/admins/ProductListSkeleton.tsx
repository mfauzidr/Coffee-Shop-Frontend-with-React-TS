const ProductListSkeleton = () => {
  const rows = Array.from({ length: 6 });

  return (
    <div className="flex flex-col w-full border border-slate-300 rounded-lg">
      <div className="flex border-b w-full justify-between items-center py-2 px-9 text-xs font-semibold">
        <div className="flex w-6">
          <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="flex justify-center w-24">
          <div className="h-4 w-16 rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="flex justify-center w-40">
          <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="flex justify-center w-28">
          <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="flex justify-center w-56">
          <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="flex justify-center w-24">
          <div className="h-4 w-20 rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="flex justify-center w-20">
          <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="flex justify-center w-12">
          <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col border-b w-full justify-between">
        {rows.map((_, index) => (
          <div
            key={index}
            className={`flex w-full justify-between items-center py-4 px-9 text-xs ${
              index % 2 !== 0 ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex w-6">
              <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
            </div>
            <div className="w-24 aspect-square overflow-hidden rounded bg-slate-200 animate-pulse" />
            <div className="flex justify-center items-center text-center w-40">
              <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
            </div>
            <div className="flex justify-center w-28">
              <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
            </div>
            <div className="flex justify-center w-56 max-h-20 overflow-hidden py-2">
              <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
            </div>
            <div className="flex justify-center text-center w-24">
              <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
            </div>
            <div className="flex justify-center w-20">
              <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
            </div>
            <div className="flex gap-1 w-12">
              <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse" />
              <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListSkeleton;
