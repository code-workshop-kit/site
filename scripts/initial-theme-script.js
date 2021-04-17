// Stringified so rollup / WDS can insert it into the HTML
export default `
  <script>
    // Initial setup before first render to prevent FART
    // Priority is: 1) saved preference 2) browser/os preference 3) default 'light'
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = localStorage.getItem('cwk-theme') || (userPrefersDark ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
  </script>
`;
