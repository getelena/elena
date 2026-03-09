/**
 * Render Elena components with render() to an HTML string for
 * server-side rendering.
 *
 * @param html - HTML string containing Elena component tags.
 * @returns Rendered HTML string with components expanded.
 */
export function ssr(html: string): string;

/**
 * Register one or more Elena component classes for SSR.
 * Each class must have `static tagName` defined.
 *
 * @param components - Elena component classes to register.
 */
export function register(...components: (new (...args: any[]) => any)[]): void;
