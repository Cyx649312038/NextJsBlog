const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase == PHASE_DEVELOPMENT_SERVER) {
    console.log("PHASE_DEVELOPMENT_SERVER");
    return {
      env: {
        mongodb_username: "649312038",
        mongodb_password: "wpq1GsfleXCXkrhB",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-site",
        NEXTAUTH_SECRET:"LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx6gts=",
        NEXTAUTH_URL: "next-js-blog-n1zucfp6o-cyx649312038s-projects.vercel.app"
      },
    };
  }
  console.log("product");
  return {
    env: {
      mongodb_username: "649312038",
      mongodb_password: "wpq1GsfleXCXkrhB",
      mongodb_clustername: "Cluster0",
      mongodb_database: "my-site",
      NEXTAUTH_SECRET:"LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx6gts=",
      NEXTAUTH_URL: "next-js-blog-n1zucfp6o-cyx649312038s-projects.vercel.app"
    },
  };
};
