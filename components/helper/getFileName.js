export const getFileName = (type) => {
  switch (type) {
    case "snowflake":
      return "Snowflake";
      break;
    case "postgres":
      return "Postgres";
      break;
    case "s3bucket":
      return "S3Bucket";
      break;
    case "mongodb":
      return "MongoDB";
      break;
    case "mysql":
      return "MySQL";
      break;
    case "hive":
      return "Hive";
      break;
    default:
      return null;
      break;
  }
};
