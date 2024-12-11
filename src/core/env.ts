export const env = {
  api: import.meta.env.VITE_MODE_DEV === "true" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD,
  github_client_id:
    import.meta.env.VITE_MODE_DEV === "true"
      ? import.meta.env.VITE_DEV_GITHUB_CLIENT_ID
      : import.meta.env.VITE_PROD_GITHUB_CLIENT_ID,
  github_redirect_uri:
    import.meta.env.VITE_MODE_DEV === "true"
      ? import.meta.env.VITE_DEV_GITHUB_SECRET
      : import.meta.env.VITE_PROD_GITHUB_SECRET,
};
