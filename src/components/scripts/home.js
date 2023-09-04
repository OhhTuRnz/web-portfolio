import { useRouter } from 'vue-router';

export function goHome(router) {
  router.push({ name: 'Home' });
  console.log('Navigating to home...');
}