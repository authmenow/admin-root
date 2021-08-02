import { loadable } from 'framework';
import { Error404Page } from './error404';
import { PATHS } from './paths';

export const ROUTES = [
  {
    path: PATHS.home(),
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "home" */ './home')),
  },
  {
    path: PATHS.login(),
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "login" */ './login')),
  },
  {
    path: PATHS.oauthDone(),
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "login" */ './oauth-done')),
  },
  {
    path: '*',
    component: Error404Page,
  },
];
