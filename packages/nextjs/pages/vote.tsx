import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";

const VotePage: NextPage = () => {
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
        <div className="text1">Poll App</div>

        <div className="bclass">
          <Link href="/poll">
            <button className="btn">Create Poll</button>
          </Link>

          <Link href="/manage">
            <button className="btn">Manage Poll</button>
          </Link>

          <Link href="/voting">
            <button className="btn">Vote</button>
          </Link>

          <Link href="/result">
            <button className="btn">View Result</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default VotePage;
