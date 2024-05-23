import { Helmet } from "react-helmet-async";

export function Dashboard() {
  return (
    <div>
      <div>
        <Helmet title="login" />
      </div>
      <h1>Dashboard</h1>
    </div>
  );
}
