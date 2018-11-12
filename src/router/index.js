import Vue from 'vue';
import Router from 'vue-router';

import store from '../store';

const Landing = () => import('@/components/Before/Landing');
const Connect = () => import('@/components/Before/Connect');
const ConnectAirDrop = () => import('@/components/Before/ConnectAirDrop');
const Limit = () => import('@/components/Before/Limit');
const QA = () => import('@/components/Before/QA');

const Main = () => import('@/components/After/Main');
const GetTokens = () => import('@/components/After/GetTokens');
const Referrals = () => import('@/components/After/Referrals');
const Documentation = () => import('@/components/After/Documentation');


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
      meta: { hideWhenAuth: true },
      props: route => ({ referral: route.query.r }),
    },
    {
      path: '/connect-with-cryptoid',
      name: 'connect',
      component: Connect,
      meta: { hideWhenAuth: true },
      props: route => ({ referral: route.query.r }),
    },
    {
      path: '/airdrop',
      name: 'connect-airdrop',
      component: ConnectAirDrop,
      meta: { hideWhenAuth: true },
      props: route => ({ referral: route.query.r }),

    },
    {
      path: '/you-need-to-increase-your-limit',
      name: 'limit',
      component: Limit,
      meta: { requiresAuth: true },
    },
    {
      path: '/qa',
      name: 'qa',
      component: QA,
      meta: { hideWhenAuth: true },
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta: { requiresAuth: true },
    },
    {
      path: '/get-tokens',
      name: 'get-tokens',
      component: GetTokens,
      meta: { requiresAuth: true },
    },
    {
      path: '/referral-program',
      name: 'referrals',
      component: Referrals,
      meta: { requiresAuth: true },
      props: route => ({ purchase: route.query.purchase }),
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: Documentation,
      meta: { requiresAuth: true, scrollToTop: true },
      props: route => ({ name: route.query.name }),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
  scrollBehavior: (to, from, savedPosition) => new Promise((resolve) => {
    const position = savedPosition || {};
    if (!savedPosition) {
      if (to.hash) {
        position.selector = to.hash;
      }
      if (to.matched.some(m => m.meta.scrollToTop)) {
        position.x = 0;
        position.y = 0;
      }
    }
    router.app.$root.$once('trigger-scroll', () => {
      router.app.$nextTick(() => resolve(position));
    });
  }),
});

router.beforeEach((to, from, next) => {
  store.dispatch('auth/verify').then(() => {
    if (to.matched.some(record => record.meta.requiresAuth)
      && !store.getters['auth/isAuthorized']) {
      router.replace({ name: 'landing' });
    } else if (to.matched.some(record => record.meta.hideWhenAuth)
      && store.getters['auth/isAuthorized']) {
      router.replace({ name: 'main' });
    } else {
      next();
    }
  });
});

export default router;
