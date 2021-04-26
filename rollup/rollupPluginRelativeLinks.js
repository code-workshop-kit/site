export function transformCode(code, routeMap) {
  let transformedCode = code;
  const reg = new RegExp(
    '"(?<fullMatch>(?<hook>__ROLLUP_PLUGIN_RELATIVE_LINKS__)(?<pageName>.+))"',
    'g',
  );
  let matches = [];
  let currentMatch;

  do {
    currentMatch = reg.exec(code);
    matches.push(currentMatch);
  } while (currentMatch !== null);
  matches = matches.filter((_) => _);

  if (matches.length > 0) {
    matches.forEach((match) => {
      const { pageName, fullMatch } = match.groups;

      if (routeMap[pageName]) {
        transformedCode = code.replace(new RegExp(fullMatch, 'g'), routeMap[pageName]);
      }
    });
  }
  return transformedCode;
}

export default (routeMap) => {
  return {
    name: 'rollup-plugin-relative-links',
    transform(code, id) {
      let transformedCode = code;
      if (id.endsWith('.js')) {
        transformedCode = transformCode(code, routeMap);
      }
      return { code: transformedCode };
    },
  };
};
