import { useQuery } from "@tanstack/react-query";
import { screen, waitFor } from "@testing-library/react";

import { expect, test } from "vitest";

import { customRender } from "../../providers/TestProviders";

const fetchUsers = async () => {
  const response = await fetch("https://example.com/user");
  const data = await response.json();
  return data;
};

const UserTable = () => {
  // Use the `useQuery` hook to fetch data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [ "users" ],
    queryFn: fetchUsers,
  });

  // Show a loading spinner while fetching
  if (isLoading) {
    return <div className="icon loading" role="img" aria-label="loading"></div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Display the data in a table
  return (
    <div>
      <h1>User List</h1>
      <table border={1} cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user: { id: string; firstName: string; lastName: string }) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

test("displays loading indicator while fetching data", async () => {
  customRender(<UserTable />);

  // Check for a loading spinner or icon during fetch
  const loadingIcon = document.querySelector(".icon.loading");
  expect(loadingIcon).toBeTruthy();

  await waitFor(() => screen.getByText("John"));
  expect(screen.getByText("John")).toBeInTheDocument();
});
