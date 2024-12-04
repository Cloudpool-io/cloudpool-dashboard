import { useEffect, useState } from "react";
import { DataTableDemoContributions } from "./table/main";
import { getContributions } from "./actions/main";

export const Contributions = () => {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    getContributions().then((data) => setContributions(data));
  }, []);
  console.log(contributions);

  return <DataTableDemoContributions />;
};
