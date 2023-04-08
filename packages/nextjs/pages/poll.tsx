import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Poll: NextPage = () => {
  const router = useRouter();
  const [newPoll, setNewPoll] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "ManageVoting",
    functionName: "createElection",
    args: [newPoll, "pending"],
  });

  const { data, isLoading: loading } = useScaffoldContractRead({
    contractName: "ManageVoting",
    functionName: "getAllElection",
  });

  console.log(data, loading);
  return (
    <>
      <Head>
        <title>Voting App</title>
        <meta name="description" content="voting application" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div>
        <div className="text1">Voting App</div>

        <div className="bclass2">
          <input
            onChange={e => setNewPoll(e.target.value)}
            className="mt-1 px-3 text-black py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Enter Poll Name"
          />

          <button
            onClick={() => {
              writeAsync();
              router.push("/add");
            }}
            className="btn mx-auto w-80 mt-4 block"
          >
            Create Poll
          </button>
        </div>
      </div>
    </>
  );
};

export default Poll;
