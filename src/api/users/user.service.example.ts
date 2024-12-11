import { queryOptions, useQuery } from "@tanstack/react-query";

import { getQueryOptions } from "../reactQueryConfig";

import type { User } from "./users.types.example";

export const USER_API_PATH = "https://dummyjson.com/users";

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://dummyjson.com/users");

  const result = await response.json();

  return result.users;
};

export const useUsers = () => {
  const users = useQuery(queryOptions({
    queryKey: [ "fetch-users" ],
    ...getQueryOptions(fetchUsers, { retryOnFailure: true }),
  }));

  return users;
};

// const Users = () => {

//   const users = useUsers();

//   return(
//     <AsyncElement data={users} fallback={<>Error retrieving the users</>}>
//       {users.data?.map(u => <div>{u.firstName}</div>)}
//     </AsyncElement>
//   );
// };
