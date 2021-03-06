/**
 * This script automates deleting the content of API Management developer portals.
 * In order to run it, you need to:
 *
 * 1) Clone the api-management-developer-portal repository:
 *    git clone https://github.com/Azure/api-management-developer-portal.git
 *
 * 2) Install NPM  packages:
 *    npm install
 *
 * 3) Run this script with a valid combination of arguments:
 *    node ./publish ^
 *    --subscriptionId "< your subscription ID >" ^
 *    --resourceGroupName "< your resource group name >" ^
 *    --serviceName "< your service name >" ^
 */

const { ImporterExporter } = require("./utils");

const yargs = require("yargs")
  .example(
    `node ./publish ^ \r
    --subscriptionId "< your subscription ID >" ^ \r
    --resourceGroupName "< your resource group name >" ^ \r
    --serviceName "< your service name >"\n`
  )
  .option("subscriptionId", {
    type: "string",
    description: "Azure subscription ID.",
    example: "<bla bla>",
    demandOption: true,
  })
  .option("resourceGroupName", {
    type: "string",
    description: "Azure resource group name.",
  })
  .option("serviceName", {
    type: "string",
    description: "API Management service name.",
  })
  .help().argv;

async function publish() {
  const importerExporter = new ImporterExporter(
    yargs.subscriptionId,
    yargs.resourceGroupName,
    yargs.serviceName
  );

  await importerExporter.publish();
}

publish()
  .then(() => {
    console.log("DONE");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });

module.exports = {
  publish,
};
