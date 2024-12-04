export interface Contribution {
  id: number;
  name: string;
  infraProvider: string;
  region: string;
  cpu: number;
  ram: number;
  diskSizeGb: number;
  softwareStack: string;
  version: string;
  contributedAt: string;
  canceledAt: string | null;
}
//canceledAt
//:
//null
//contributedAt
//:
//"2024-12-04T15:09:14.482Z"
//cpu
//:
//4
//diskSizeGb
//:
//1024
//id
//:
//2
//infraProvider
//:
//"AWS"
//name
//:
//"AWS"
//ram
//:
//1024
//region
//:
//"Europe_East"
//softwareStack
//:
//"PostgreSQL"
//version
//:
//"16"
