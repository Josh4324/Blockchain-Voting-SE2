import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Add: NextPage = () => {
  const [Poll, setPoll] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "ManageVoting",
    functionName: "addItem",
    args: [Poll, name, img],
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

        <div className="bclass3">
          <div className="vtext2">Add Options to Poll</div>
          <input
            className="block border pl-3 text-black h-10 shadow-sm border-slate-300 placeholder-slate-400 mb-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Enter Poll Name"
            onChange={e => setPoll(e.target.value)}
          />
          <input
            className="block h-10 pl-3 text-black border shadow-sm border-slate-300 placeholder-slate-400 mb-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Enter Option Name"
            onChange={e => setName(e.target.value)}
          />
          <input
            className="block h-10 pl-3 text-black border shadow-sm border-slate-300 placeholder-slate-400 mb-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Enter Option Image Link"
            onChange={e => setImg(e.target.value)}
          />

          <button onClick={writeAsync} className="block btn mt-5">
            Add option
          </button>
        </div>
      </div>
    </>
  );
};

export default Add;
