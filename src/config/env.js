export default (() => {
  if (process.env.REACT_APP_NODE_ENV === "development") {
    return {
      home: "http://localhost:3000/",
      // redirect: "http://localhost:4000/api/redirect-verify",
      // login: "http://localhost:4000/api/login",
      // eadim: "http://localhost:3000/student/courses",
      // admin: "http://localhost:3000/admin/cursos"
    };
  // } else if (process.env.REACT_APP_NODE_ENV === "hml") {
  //   return {
  //     home: "https://hml.eadim.com.br/",
  //     redirect: "https://portal.eadim.com.br/api_hml/api/redirect-verify",
  //     login: "https://portal.eadim.com.br/api_hml/api/login",
  //     eadim: "https://hml.eadim.com.br/student/courses",
  //     admin: "https://hml.eadim.com.br/admin/courses"
  //   };
  // } else {
  //   return {
  //     home: "https://eadim.com.br:3333/",
  //     redirect: "https://portal.eadim.com.br/api/api/redirect-verify",
  //     login: "https://portal.eadim.com.br/api/api/login",
  //     eadim: "https://www.eadim.com.br/student/courses",
  //     admin: "https://www.eadim.com.br/admin/courses"
  //   };
  }
})();
