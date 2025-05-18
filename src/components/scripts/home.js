import { useRouter } from 'vue-router';

export function goHome(router) {
  router.push({ name: 'Home' }).then(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}