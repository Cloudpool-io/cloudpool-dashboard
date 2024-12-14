import { Button } from "@/components/ui/button";
import { env } from "@/core/env";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const GithubLoginButton = () => {
  const loginWithGitHub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${env.github_client_id}&redirect_uri=${env.github_redirect_uri}&scope=user:email,read`;
  };
  return (
    <Button className="inline-flex items-center justify-center" onClick={loginWithGitHub}>
      <GitHubLogoIcon />
      <div className="ml-2">Continue with Github</div>
    </Button>
  );
};
