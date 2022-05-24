import CreateSubject from "../components/CreateSubject";
import Heading from "../components/Heading";
import Logo from "../components/Logo";
import Subject from "../components/Subject";
import Wrapper from "../components/Wrapper";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["subjects"]);

  return (
    <Wrapper>
      <Logo />

      <Heading />

      {data?.length ? (
        <ul className="shadow-lg rounded-md bg-white border divide-y">
          {data.map((subject) => (
            <li key={subject.id}>
              <Subject
                description={subject.description}
                upvotes={subject.upvotes ?? 0}
                title={subject.title}
                id={subject.id}
              />
            </li>
          ))}
        </ul>
      ) : null}

      <CreateSubject />
    </Wrapper>
  );
};

export default Home;
