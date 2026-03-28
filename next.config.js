const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase == PHASE_DEVELOPMENT_SERVER) {
    console.log("PHASE_DEVELOPMENT_SERVER");
    return {
      env: {
        mongodb_username: "649312038",
        mongodb_password: "",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-site",
        NEXTAUTH_SECRET:"",
        NEXTAUTH_URL: "next-js-blog-n1zucfp6o-cyx649312038s-projects.vercel.app"
      },
    };
  }
  console.log("product");
  return {
    env: {
      mongodb_username: "649312038",
      mongodb_password: "",
      mongodb_clustername: "Cluster0",
      mongodb_database: "my-site",
      NEXTAUTH_SECRET:"",
      NEXTAUTH_URL: "next-js-blog-n1zucfp6o-cyx649312038s-projects.vercel.app"
    },
  };
};
