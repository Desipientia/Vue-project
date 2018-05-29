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
      name: 'Landing',
      component: Landing,
      meta: { hideWhenAuth: true },
    },
    {
      path: '/connect',
      name: 'Connect',
      component: Connect,
      meta: { hideWhenAuth: true },
    },
    {
      path: '/limit',
      name: 'Limit',
      component: Limit,
      meta: { hideWhenAuth: true },
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta: { requiresAuth: true },
    },
    {
      path: '/get-tokens',
      name: 'GetTokens',
      component: GetTokens,
      meta: { requiresAuth: true },
    },
    {
      path: '/referrals',
      name: 'Referrals',
      component: Referrals,
      meta: { requiresAuth: true },
    },
    {
      path: '/documentation',
      name: 'Documentation',
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
