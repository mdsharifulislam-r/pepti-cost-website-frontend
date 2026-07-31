export default function IconMaker({ name }: { name: string }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-900 text-[14px] font-bold text-white">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}
