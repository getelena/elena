/** Applies the Elena brand color (#f19c77) to a string using ANSI true color escape codes. */
export const color = str => `\x1b[38;2;241;156;119m${str}\x1b[0m`;

/** Applies the Elena highlight color (#ACD977) to a string using ANSI true color escape codes. */
export const highlight = str => `\x1b[38;2;172;217;119m${str}\x1b[0m`;
