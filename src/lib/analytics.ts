import posthog from 'posthog-js';

type Props = Record<string, unknown>;

let initialized = false;

/**
 * Initializes PostHog only when a key exists, so local/dev works without env setup.
 */
export function initAnalytics() {
  if (initialized) return;

  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
  if (!key) return;

  const host = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? 'https://app.posthog.com';

  posthog.init(key, {
    api_host: host,
    capture_pageview: false,
    capture_pageleave: true,
  });

  initialized = true;
}

/** Emits a named analytics event with optional properties. */
export function track(event: string, props?: Props) {
  if (!initialized) return;
  posthog.capture(event, props);
}

/** Emits app screen views using a dedicated event name. */
export function page(name: string, props?: Props) {
  track('screen_view', { screen: name, ...props });
}
