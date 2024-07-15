const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase == PHASE_DEVELOPMENT_SERVER) {
    console.log("PHASE_DEVELOPMENT_SERVER");
    return {
      env: {
        mongodb_username: "649312038",
        mongodb_password: "FgvoUv8FqucVLD8a",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-site",
      },
    };
  }
  console.log("product");
  return {
    env: {
      mongodb_username: "649312038",
      mongodb_password: "FgvoUv8FqucVLD8a@cluster0",
      mongodb_clustername: "Cluster0",
      mongodb_database: "my-site",
    },
  };
};
