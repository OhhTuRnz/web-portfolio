export default {
  async scheduled(event, env, ctx) {
    const response = await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });
    console.log(`Scholar deploy hook triggered: ${response.status} ${response.statusText}`);
  },
};
