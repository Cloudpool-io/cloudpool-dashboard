import { InfraProviderEnum } from "../enums/InfraProvider.enum";

const infrastuctureProvidersLogosMap = new Map();
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

export { infrastuctureProvidersLogosMap };
