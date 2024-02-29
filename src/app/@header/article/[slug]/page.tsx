import { Heart } from "react-feather";

export default function Page() {
  return (
    <button className="bg-default text-default hover:bg-layer hover:text-layer flex min-w-fit flex-row items-center gap-4 px-4 py-2 leading-none transition-colors">
      <Heart size={16} /> 1
    </button>
  );
}
