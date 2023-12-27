export const LOGIN = "usermgmt/v1/login";
export const CONTACT = "usermgmt/v1/contact";
export const GETROLES = "usermgmt/v1/admin/roles?userType=";
export const GETORGANIZATION = "usermgmt/v1/admin/organizations";
export const SIGNUP = "usermgmt/v1/admin/add/user";
export const GETUSERLIST = "usermgmt/v1/admin/users/org/";
export const UPDATEUSER = "usermgmt/v1/admin/update/user/";

export const ANALYZE = "process/v2/analyze";
export const GETANALYZEDATA = "process/v2/analyze/file/";
export const TRANSFORM = "process/v2/convert/";
export const ANALYZESUMMARY = "process/v2/analyze/summary/";
export const DESIGN = "process/v2/design/graph/json/";
export const TARGET = "process/v2/target/";
export const VERSION = "process/v2/design/metadata/file/";
export const TABLE = "process/v2/design/target/tables/file/";
export const UPDATETABLE = "process/v2/design/target/tables/file/";
export const TABLEDATA = "process/v2/design/target/columns/file/";
export const UPDATECOLDETAILS = "process/v2/design/target/columns/file/";
export const RELEASEVERSION = "process/v2/design/convert/file/";
export const JSONSTRUCTURE = "process/v2/design/json/structure/";
export const CONVERTTRANSFORN = "process/v2/convert/transform/";
export const CHANGELOGS = "process/v2/design/target/changelog/file/";
export const TABLECHANGELOGS =
  "process/v2/design/target/table/changelogs/file/";
export const UPDATEDESIGN = "process/v2/design/target/tables/columns/file/";
export const COLUMNCHANGELOGS =
  "process/v2/design/target/column/changelogs/file/";
export const VALIDATEFILE = "process/v2/validate/file/";
export const GITHUBCHECKIN = "gitupload/v1/checkin/file/";
export const VALIDATEENTITYSUMMARY = "process/v2/validate/entity/summary/file/";
export const VALIDATEFILEDETAILS = "process/v2/validate/file/";
export const ADDATTACHMENT = "process/v2/validate/add/attachment";
export const VIEWATTACHMENT = "process/v2/validate/view/attachment";
export const DELETEATTACHMENT = "process/v2/validate/delete/attachment";
export const DISCARD = "process/v2/design/discard/changelog/file/";
export const ADDDATABASEVARIABLE =
  "process/v2/design/database/variable?fileId=";
export const UPDATEDATABASEVARIABLE =
  "process/v2/design/database/variable?fileId=";
export const GETDATABASEVARIABLE = "process/v2/design/database/variable/file/";
export const GETPROJECTDATABASEVARIABLE =
  "process/v2/design/database/variable/project/";
export const DELETEVERIABLE = "process/v2/design/database/variable/";

export const DEFINE = "core/v1/project";
export const UPLOADFILE = "core/v1/upload";
export const GETALLPROJECT = "core/v1/project/all/org/";
export const GETPROJECT = "core/v1/project/";
export const UPDATEPROJECT = "core/v1/project/";
export const DOWNLOADFILE = "core/v1/download/file/";
export const DOWNLOADZIP = "core/v1/download/zip/file/";
export const ADDEVENT = "core/v1/event/create";
export const GETEVENT = "core/v1/event/";
export const UPDATEEVENT = "core/v1/event/update/";
export const EVENTUSERS = "core/v1/event/users/";
export const EVENTREGISTER = "core/v1/event/register/user";
export const ADDORGANIZATION = "core/v1/organization";

export const GETACCESSTOKEN = "token/v1/generateFromRefreshToken";

export const ADDGITDATA = "gitupload/v1/config";
export const UPDATEGITDATA = "gitupload/v1/config";
export const GETGITDATA = "gitupload/v1/config/";

export const INGESTIONTEMPLATES = "ingestion/core/v1/template/";
export const INGESTIONTCONNECTIONLIST = "ingestion/core/v1/connection/fetch/all";
export const TESTCONNECTION = "ingestion/core/v1/connection/test";
export const ADDCONNECTION = "ingestion/core/v1/connection/";
export const GETCONNECTIONDETAILS = "ingestion/core/v1/connection/detail";
export const GETWORKSPACE = "ingestion/core/v1/workspace/org/";
export const ADDRUNTIMEENV = "ingestion/core/v1/runtime-env/";
export const ADDWORKSPACE = "ingestion/core/v1/workspace/";
export const GETCONNECTION = "ingestion/core/v1/connection/type/";
export const GETCONNECTIONDETAIL = "ingestion/core/v1/connection/";
export const GETWORKSPACEENV = "ingestion/core/v1/runtime-env/workspace/";
export const ENVDETAILS = "ingestion/core/v1/runtime-env/";
export const CREATEPIPELINE = "ingestion/core/v1/pipeline/";
export const DELETEPIPELINE = "ingestion/core/v1/pipeline/";
export const GETPIPELINE = "ingestion/core/v1/pipeline/workspace/";
export const GETPIPELINEGRAPH = "ingestion/core/v1/graph/pipeline/";
export const CREATENODE = "ingestion/core/v1/graph/node";
export const CREATEEDGE = "ingestion/core/v1/graph/edge";
export const DELETEEDGE = "ingestion/core/v1/graph/pipeline/";
export const NODEMETADATA = "ingestion/core/v1/graph/node/";
export const CONVERTPIPELINE = "ingestion/spark-engine/v1/convert/pipeline/";
export const RUNPIPELINE = "ingestion/core/v1/pipeline-run/pipeline/";
export const RUNPIPELINELIST = "ingestion/core/v1/pipeline-run/all/";
export const RUNPIPELINELOGS = "ingestion/core/v1/pipeline-run/logs/";
export const PREVIEWDATA = "ingestion/core/v1/graph/node/";
export const UPDATEFIELDNAME = "ingestion/core/v1/graph/node/fields";