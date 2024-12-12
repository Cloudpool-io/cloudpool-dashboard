import { InfraProviderEnum } from "../enums/InfraProvider.enum";
import { SoftwareStack } from "../enums/SoftwareStack.enum";

const infrastuctureProvidersLogosMap = new Map();
const softwareStackLogosMap = new Map();

//Infrastructure Providers Logos
infrastuctureProvidersLogosMap.set(InfraProviderEnum.AWS, "/infrastructure-providers-logos/aws.svg");
infrastuctureProvidersLogosMap.set(InfraProviderEnum.LINODE, "/infrastructure-providers-logos/linode.svg");
infrastuctureProvidersLogosMap.set(InfraProviderEnum.DIGITAL_OCEAN, "/infrastructure-providers-logos/digitalocean.svg");
infrastuctureProvidersLogosMap.set(InfraProviderEnum.HETZNER, "/infrastructure-providers-logos/hetzner.svg");
infrastuctureProvidersLogosMap.set(InfraProviderEnum.LIGHTSAIL, "/infrastructure-providers-logos/lightsail.svg");
infrastuctureProvidersLogosMap.set(InfraProviderEnum.VULTR, "/infrastructure-providers-logos/vultr.svg");
infrastuctureProvidersLogosMap.set(InfraProviderEnum.SCALEWAY, "/infrastructure-providers-logos/scaleway.png");
infrastuctureProvidersLogosMap.set(InfraProviderEnum.UPCLOUD, "/infrastructure-providers-logos/upcloud.svg");
infrastuctureProvidersLogosMap.set(InfraProviderEnum.AZURE, "/infrastructure-providers-logos/azure.svg");
//infrastuctureProvidersLogosMap.set(InfraProviderEnum.CHAINSTACK, "/infrastructure-providers-logos/chainstack.png");
//infrastuctureProvidersLogosMap.set(InfraProviderEnum.NODESHIFT, "/infrastructure-providers-logos/nodeshift.jpeg");

//Software Stack Logos
softwareStackLogosMap.set(SoftwareStack.MySQL, "/software-stack-logos/mysql-stack.svg");
softwareStackLogosMap.set(SoftwareStack.PostgreSQL, "/software-stack-logos/postgres-stack.png");
softwareStackLogosMap.set(SoftwareStack.Debian, "/software-stack-logos/debian-stack.svg");
softwareStackLogosMap.set(SoftwareStack.Ubuntu, "/software-stack-logos/ubuntu-stack.svg");
softwareStackLogosMap.set(SoftwareStack.Milvus, "/software-stack-logos/milvus-stack.png");
//softwareStackLogosMap.set(SoftwareStack.OrbisDB, "/software-stack-logos/orbisdb-stack.png");
//softwareStackLogosMap.set(SoftwareStack.Ceramic, "/software-stack-logos/ceramic-stack.jpg");
softwareStackLogosMap.set(SoftwareStack.MongoDB, "/software-stack-logos/mongodb-stack.svg");
//softwareStackLogosMap.set(SoftwareStack.RPC_Node, "/software-stack-logos/rpc-stack.png");

export { infrastuctureProvidersLogosMap, softwareStackLogosMap };
