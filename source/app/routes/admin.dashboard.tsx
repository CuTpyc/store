import { useLoaderData } from "@remix-run/react";
import { adminDashboardLoader } from "~/.server/admin/loaders/dashboard.loader";

export const loader = adminDashboardLoader

export default function Index() {
    const data = useLoaderData<typeof loader>()

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Admin</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
