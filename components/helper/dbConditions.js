export const structureDB = () => {
  return ["mysql", "mongodb", "snowflake", "postgres", "hive"];
};

export const noStructureDB = () => {
  return ["s3bucket"];
};
