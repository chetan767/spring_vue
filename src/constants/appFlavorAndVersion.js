const FlavorType = {
  LOCAL: "LOCAL",
  DEV: "DEV",
  PROD: "PROD",
};

const APP_VERSION = "1";
const APP_BUILDNUMBER = "1";
const APP_FLAVOR = process.env.ENVIRONMENT ?? "DEV".toUpperCase(); // use envrionment variable here

export default { FlavorType, APP_VERSION, APP_BUILDNUMBER, APP_FLAVOR };
