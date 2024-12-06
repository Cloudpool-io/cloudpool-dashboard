export const env = {
  api: JSON.parse(import.meta.env.CUSTOME_MODE_DEV) === true ? import.meta.env.CUSTOM_DEV : import.meta.env.CUSTOM_PROD,
};
