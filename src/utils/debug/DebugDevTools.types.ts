export const debugMenuButtons = ['Logs', 'Queries', 'Icons', 'Session', 'Storage'] as const;

export type DebugHeaderButton = (typeof debugMenuButtons)[number];

export type SelectedDebugModule = 'logs' | 'queries' | 'icons' | 'session' | 'storage';
