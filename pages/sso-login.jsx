// import React from 'react';

// const Sso_login = () => {
//     return (
//         <div>
//             demo
//         </div>
//     );
// };

// export default Sso_login;

import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const Sso_login = () => {
    const { user, error, isLoading } = useUser();

    console.log({ user, error, isLoading })

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    console.log(user);
    return (
      <div>
        <img src={user?.picture} />
        <br></br>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        <br></br>
        Your nickname is {user.nickname}.
        <pre>
            <code>
            {JSON.stringify(user,  null, 4)}
            </code>
        </pre>
      </div>
    );
  }
  return <a href="/api/auth/login" style={{color : "red"}}>Login</a>;
}

export default Sso_login;