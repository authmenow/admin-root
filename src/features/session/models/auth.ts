import { createStore, createEvent, combine, guard } from 'effector';

import { sessionGet, SessionUser } from 'api/session';

export const readyToLoadSession = createEvent<void>();

export const sessionLoaded = sessionGet.finally;

export const $session = createStore<SessionUser | null>(null);
export const $isAuthenticated = $session.map((user) => user !== null);

// Show loading state if no session but first request is sent
export const $sessionPending = combine(
  [$session, sessionGet.pending],
  ([session, pending]) => !session && pending,
);

$session
  .on(sessionGet.done, (_, { result }) => result.body.user)
  .on(sessionGet.failData, (session, { status }) => {
    if (status === 401) {
      return null;
    }
    return session;
  });

guard({
  source: readyToLoadSession,
  filter: $sessionPending.map((is) => !is),
  target: sessionGet,
});