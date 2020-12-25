module.exports = {
  rewriteAPIRequestPath: () => {
    return {
      name: 'rewrite-api-requests-path',
      transform: (code) => {
        let transformedCode = code;
        transformedCode = transformedCode.replace(/\/api\//g, 'http://localhost:3000/api/');
        return transformedCode;
      },
    };
  },
};
