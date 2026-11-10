/** An `ip-alert` element: Stencil resolves `componentOnReady` once rendered. */
export type AlertElement = HTMLElement & {
  componentOnReady?: () => Promise<unknown>;
};

/** Focuses the close button of the alert, once its shadow DOM is rendered. */
export async function focusCloseButton(alert?: AlertElement): Promise<void> {
  await alert?.componentOnReady?.();
  alert?.shadowRoot?.querySelector<HTMLElement>('.close-button')?.focus();
}
