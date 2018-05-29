import Vue from 'vue';
import Router from 'vue-router';

const Landing = () => import('@/components/Before/Landing');
const Connect = () => import('@/components/Before/Connect');
const Limit = () => import('@/components/Before/Limit');

const Main = () => import('@/components/After/Main');
const GetTokens = () => import('@/components/After/GetTokens');
const Referrals = () => import('@/components/After/Referrals');
const Documentation = () => import('@/components/After/Documentation');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/landing',
      name: 'landing',
      component: Landing,
      meta: { hideWhenAuth: true },
    },
    {
      path: '/connect',
      name: 'connect',
      component: Connect,
      meta: { hideWhenAuth: true },
    },
    {
      path: '/limit',
      name: 'limit',
      component: Limit,
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
      path: '/referrals',
      name: 'referrals',
      component: Referrals,
      meta: { requiresAuth: true },
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: Documentation,
      meta: { requiresAuth: true },
    },
    {
      path: '*',
      redirect: 'landing',
    },
  ],
});

export default router;
