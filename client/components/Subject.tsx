import { ThumbUpIcon } from "@heroicons/react/solid";
import { trpc } from "../utils/trpc";

interface SubjectProps {
  description: string;
  upvotes: number;
  title: string;
  id: string;
}

export default function Subject({
  description,
  upvotes,
  title,
  id,
}: SubjectProps) {
  const utils = trpc.useContext();

  const upvote = trpc.useMutation(["upvote"], {
    onSuccess: () => {
      utils.invalidateQueries(["subjects"]);
    },
  });

  return (
    <div className="px-4 py-3.5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-1">{description}</p>

      <button
        onClick={() => {
          upvote.mutate({
            id,
          });
        }}
        className="text-gray-500 hover:text-gray-700 transition flex items-center space-x-1.5 mt-2"
      >
        <span className="text-xl font-semibold leading-none transform translate-y-px">
          {upvotes}
        </span>
        <ThumbUpIcon className="w-6" />
      </button>
    </div>
  );
}
