import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Voting: NextPage = () => {
  const router = useRouter();
  const [poll, setPoll] = useState("");
  const [id, setId] = useState(0);

  const { data, isLoading: loading } = useScaffoldContractRead({
    contractName: "ManageVoting",
    functionName: "getAllItems",
    args: [poll],
  });

  const { writeAsync: vote, isLoading: load2 } = useScaffoldContractWrite({
    contractName: "ManageVoting",
    functionName: "vote",
    args: [poll, id],
  });

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
            onChange={e => setPoll(e.target.value)}
            className="mt-1 px-3 text-black py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Enter Poll Name"
          />

          {data !== undefined ? (
            <div className="vflex">
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <span className="vtext">{item.name}</span>

                    <input name="Vote" onChange={() => setId(Number(index))} type="radio" />
                  </div>
                );
              })}
            </div>
          ) : null}
          <button className="btn mx-auto w-100 mt-10 block" onClick={vote}>
            Vote
          </button>
        </div>
      </div>
    </>
  );
};

export default Voting;
