export const getThemeDefaults = (dark: boolean) => ({
    background: dark ? '#222' : '#fff',
    foreground: dark ? '#ccc' : '#333',
    cursor: dark ? '#fff' : '#000',
    selection: dark ? '#383838' : '#d7d7d7',
    gutterBackground: dark ? '#1f1f1f' : '#f5f5f5',
    gutterForeground: dark ? '#666' : '#999',
});
