import { trpc } from "../utils/trpc";

export default function CreateSubject() {
  const utils = trpc.useContext();

  const createSubject = trpc.useMutation(["subject"], {
    onSuccess: () => {
      utils.invalidateQueries(["subjects"]);
    },
  });

  return (
    <button
      className="button"
      onClick={async () => {
        const title = prompt("What would you like hear about?");
        const description = prompt("Why would you like to hear about this?");

        if (title && description) {
          await createSubject.mutateAsync({
            description,
            title,
          });
        }
      }}
    >
      New suggestion
    </button>
  );
}
