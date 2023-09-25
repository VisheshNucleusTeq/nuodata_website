export const LOGIN = "usermgmt/v1/login";
export const CONTACT = "usermgmt/v1/contact";

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

export const DEFINE = "core/v1/project";
export const UPLOADFILE = "core/v1/upload";
export const GETALLPROJECT = "core/v1/project/all/org/";
export const GETPROJECT = "core/v1/project/";
export const UPDATEPROJECT = "core/v1/project/";
export const DOWNLOADFILE = "core/v1/download/file/";
export const DOWNLOADZIP = "core/v1/download/zip/file/";
export const VALIDATEFILE = "process/v2/validate/file/";
export const GITHUBCHECKIN = "gitupload/v1/checkin/file/";
export const VALIDATEENTITYSUMMARY = "process/v2/validate/entity/summary/file/";
export const VALIDATEFILEDETAILS = "process/v2/validate/file/";
export const ADDATTACHMENT = "process/v2/validate/add/attachment";
export const VIEWATTACHMENT = "process/v2/validate/view/attachment";
export const DELETEATTACHMENT = "process/v2/validate/delete/attachment";
export const DISCARD = "process/v2/design/discard/changelog/file/";
export const GETACCESSTOKEN = "token/v1/generateFromRefreshToken";

export const ADDGITDATA = "gitupload/v1/config";
export const UPDATEGITDATA = "gitupload/v1/config";
export const GETGITDATA = "gitupload/v1/config/";
export const ADDORGANIZATION = "core/v1/organization";
export const GETROLES = "usermgmt/v1/admin/roles?userType=";
export const GETORGANIZATION = "usermgmt/v1/admin/organizations";
export const SIGNUP = "usermgmt/v1/admin/add/user"; //"usermgmt/v1/signup";
export const GETUSERLIST = "usermgmt/v1/admin/users/org/";
export const UPDATEUSER = "usermgmt/v1/admin/update/user/";
export const ADDEVENT = "core/v1/event/create";
export const GETEVENT = "core/v1/event/";
export const UPDATEEVENT = "core/v1/event/update/";
export const EVENTUSERS = "core/v1/event/users/";
export const EVENTREGISTER = "core/v1/event/register/user";
export const ADDDATABASEVARIABLE = "process/v2/design/database/variable?fileId=";
export const UPDATEDATABASEVARIABLE = "process/v2/design/database/variable?fileId=";
export const GETDATABASEVARIABLE = "process/v2/design/database/variable/file/";
export const GETPROJECTDATABASEVARIABLE = "process/v2/design/database/variable/project/";


export const INGESTIONTEMPLATES = "ingestion/v1/connection/templates";
export const INGESTIONTCONNECTIONLIST = "ingestion/v1/connection/fetch/all";

// {{hostname}}/ingestion/v1/connection/fetch/all?type=mysql&org_id=1