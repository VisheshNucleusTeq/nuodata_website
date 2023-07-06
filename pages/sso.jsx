import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
const sso = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        {JSON.stringify(session)}
        <p>Wellcome {session?.user?.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  } else {
  }
  return (
    <div>
      <p>Please sign in </p>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
};

export default sso;

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);
//   return {
//     props: { session },
//   };
// };