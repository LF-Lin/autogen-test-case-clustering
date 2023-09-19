import config from "./.project.config.json";
import Launcher from "./Launcher";

async function main() {
  const launcher = new Launcher(config);

  // preprocessing
  await Promise.all([
    launcher.preprocessTestSuite(),
    launcher.instrumentSourceCode(),
  ]);
  await launcher.collectExecutionData();
  await launcher.testCaseDescription();

  // clustering
  const labels = await launcher.clusteringUsingPython();

  // generation
  await launcher.generateClusteredTestSuite(labels);
  launcher.postprocess();

  console.log("done");
}

main();
