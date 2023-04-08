import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Result: NextPage = () => {
  const router = useRouter();
  const [poll, setPoll] = useState("");
  const [duration, setDuration] = useState("");
  const [voter, setVoter] = useState("");
  const [id, setId] = useState(0);

  const { data, isLoading: loading } = useScaffoldContractRead({
    contractName: "ManageVoting",
    functionName: "getAllItems",
    args: [poll],
  });

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "ManageVoting",
    functionName: "addVotingAccess",
    args: [voter, poll],
  });

  const { writeAsync: vote, isLoading: load2 } = useScaffoldContractWrite({
    contractName: "ManageVoting",
    functionName: "vote",
    args: [poll, id],
  });

  const { writeAsync: enable, isLoading: load3 } = useScaffoldContractWrite({
    contractName: "ManageVoting",
    functionName: "enableVoting",
    args: [poll, duration],
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
        <div className="text1">Poll Result Page</div>

        <div className="bclass2">
          <div>Result</div>
          <input
            onChange={e => setPoll(e.target.value)}
            className="mt-1 px-3 text-black py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Enter Poll Name"
          />
          {data !== undefined ? (
            <div className="vflex">
              {data.map((item, index) => {
                return (
                  <div className="vtext" key={index}>
                    {item.name} - {Number(BigNumber.from(item.vote))}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Result;
