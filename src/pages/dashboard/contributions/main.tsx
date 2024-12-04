import { useEffect, useState } from "react";
import { ContributionsDataTable } from "./table/main";
import { getContributions } from "./actions/main";
import { columns } from "./table/columns";

export const Contributions = () => {
  const [contributions, setContributions] = useState([]);
  console.log(contributions);

  useEffect(() => {
    getContributions().then((data) => setContributions(data));
  }, []);

  return (
    <ContributionsDataTable data={contributions || []} columns={columns} />
  );
};
