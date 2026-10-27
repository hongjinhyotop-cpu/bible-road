const svg = (body: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

export const icons = {
  settings: svg('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'),
  soundOn: svg('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11"/>'),
  soundOff: svg('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>'),
  close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
  people: svg('<rect x="4.5" y="3.5" width="11" height="15" rx="1.6"/><path d="M8.5 20.5h9a1.6 1.6 0 0 0 1.6-1.6V7"/><circle cx="10" cy="9" r="2.1"/><path d="M6.8 15.2c.6-2 1.8-3 3.2-3s2.6 1 3.2 3"/>'),
  back: svg('<path d="M14.5 5.5L8 12l6.5 6.5"/>'),
};
