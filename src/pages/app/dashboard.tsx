import { Helmet } from "react-helmet-async";

export function Dashboard() {
  return (
    <div>
      <div>
        <Helmet title="login" />
        <h1>SingIn</h1>
      </div>
      <h1>Dashboard</h1>
    </div>
  );
}
