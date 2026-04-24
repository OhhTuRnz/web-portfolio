async function triggerDeployHook(env, fetcher = fetch) {
  const deployHookUrl = env?.DEPLOY_HOOK_URL;

  if (!deployHookUrl) {
    throw new Error("DEPLOY_HOOK_URL env var not set.");
  }

  const response = await fetcher(deployHookUrl, { method: "POST" });
  console.log(`Scholar deploy hook triggered: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    const detail = body ? `: ${body.slice(0, 500)}` : "";
    throw new Error(`Scholar deploy hook failed: ${response.status} ${response.statusText}${detail}`);
  }

  return response;
}

export default {
  async scheduled(event, env, ctx) {
    await triggerDeployHook(env);
  },
};

export { triggerDeployHook };
