import React, { useState } from "react";
import { Row, Col, Tree, Input } from "antd";
import {
  FormOutlined,
  DownOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";

import AnalyzeDetailPopup from "../analyzeDetailPopup";

const GraphView = ({ modalData, showPopUp }) => {
  const [outputFileId, setOutputFileId] = useState();
  const [treeData, setTreeData] = useState([
    {
      children: [
        {
          children: [
            {
              title: "m_sku_mpp_price",
              key: 1169,
            },
            {
              title: "m_SAP_MVKE_ff",
              key: 1171,
            },
            {
              title: "m_SAP_MAST_ff",
              key: 1173,
            },
            {
              title: "m_sap_WRF_FOLUP_TYP_A_ff",
              key: 1175,
            },
            {
              title: "m_SAP_T141T_ff",
              key: 1177,
            },
            {
              title: "m_SAP_MARA_ff",
              key: 1179,
            },
            {
              title: "m_SAP_ZTB_CHK_ZZFLVR_ff",
              key: 1181,
            },
            {
              title: "m_SAP_ZTB_CHK_ZZBRND_ff",
              key: 1183,
            },
            {
              title: "m_SAP_ZTB_CHK_ZZRTV_ff",
              key: 1185,
            },
            {
              title: "m_SAP_T6WP1T_ff",
              key: 1187,
            },
            {
              title: "m_SAP_T024_ff",
              key: 1189,
            },
            {
              title: "m_SAP_T023T_ff",
              key: 1191,
            },
            {
              title: "m_SAP_TSKM_ff",
              key: 1193,
            },
            {
              title: "m_sap_ZTPIM_ART_ATTR_ff",
              key: 1195,
            },
            {
              title: "m_sap_STPO_ff",
              key: 1197,
            },
            {
              title: "m_SAP_TSABT_ff",
              key: 1199,
            },
            {
              title: "m_SAP_C003_ff",
              key: 1201,
            },
            {
              title: "m_SAP_DD07V_ff",
              key: 1203,
            },
            {
              title: "m_SAP_zth_web_wip_ff",
              key: 1205,
            },
            {
              title: "m_sap_ztb_disco_md_ff",
              key: 1207,
            },
            {
              title: "m_sap_ztb_disco_times_ff",
              key: 1209,
            },
            {
              title: "m_sap_ztb_sel_disco_ff",
              key: 1211,
            },
            {
              title: "m_Sales_Plan_Variance_Validation",
              key: 1213,
            },
            {
              title: "m_Plan_Actual_Sales_Variance",
              key: 1215,
            },
            {
              title: "m_STX_EDW_SALES_VARIANCE",
              key: 1217,
            },
            {
              title: "m_STX_EDW_Sales_Data_Load",
              key: 1219,
            },
            {
              title: "m_days",
              key: 1221,
            },
            {
              title: "m_years",
              key: 1223,
            },
            {
              title: "m_months",
              key: 1225,
            },
            {
              title: "m_weeks",
              key: 1227,
            },
            {
              title: "m_Days_Pre1",
              key: 1229,
            },
            {
              title: "m_Daylight_Saving_Time",
              key: 1231,
            },
            {
              title: "m_Days_Pre2",
              key: 1233,
            },
            {
              title: "m_FiscalPeriod",
              key: 1235,
            },
            {
              title: "m_T009B_Pre",
              key: 1237,
            },
            {
              title: "m_USR_Store_Attributes_UPD_SSDW_Flag",
              key: 1239,
            },
            {
              title: "m_USR_Store_Attributes_UPD_Dog_Walk_Flag",
              key: 1241,
            },
            {
              title: "m_USR_Store_Attributes",
              key: 1243,
            },
            {
              title: "m_USR_Store_Attributes_Pre",
              key: 1245,
            },
            {
              title: "m_Site_Hours_Day_Restore",
              key: 1247,
            },
            {
              title: "m_Site_Hours_Day_Pre_Vendor_Restore",
              key: 1249,
            },
            {
              title: "m_SKU_Map_Price",
              key: 1251,
            },
            {
              title: "m_Sap_ZTPIM_Map_Pre",
              key: 1253,
            },
            {
              title: "m_SKU_Attr_UPD_SAP",
              key: 1255,
            },
            {
              title: "m_SKU_SAP_Attr",
              key: 1257,
            },
            {
              title: "m_Sku_Sap_Attr_Pre",
              key: 1259,
            },
            {
              title: "m_SKU_Attr_UPD_TXS",
              key: 1261,
            },
            {
              title: "m_SKU_TXS_Attr_Type_Values",
              key: 1263,
            },
            {
              title: "m_SKU_TXS_Attr_Type",
              key: 1265,
            },
            {
              title: "m_SKU_TXS_Attr",
              key: 1267,
            },
            {
              title: "m_SKU_TXS_Attr_Type_Values_Pre",
              key: 1269,
            },
            {
              title: "m_SKU_TXS_Attr_Type_Pre",
              key: 1271,
            },
            {
              title: "m_SKU_TXS_Attr_Pre",
              key: 1273,
            },
            {
              title: "m_SkuAttrTypeValues",
              key: 1275,
            },
            {
              title: "m_SKUAttr",
              key: 1277,
            },
            {
              title: "m_Sku_Attr_Upd_From_Sap",
              key: 1279,
            },
            {
              title: "m_PET_BREED",
              key: 1281,
            },
            {
              title: "m_PET_SPECIES",
              key: 1283,
            },
            {
              title: "m_PET_MEDICATION",
              key: 1285,
            },
            {
              title: "m_PET_GENDER",
              key: 1287,
            },
            {
              title: "m_PET_CONDITION",
              key: 1289,
            },
            {
              title: "m_PET_ALLERGIES",
              key: 1291,
            },
            {
              title: "m_PET_MEDICATION_PRE",
              key: 1293,
            },
            {
              title: "m_PET_GENDER_PRE",
              key: 1295,
            },
            {
              title: "m_PET_CONDITION_PRE",
              key: 1297,
            },
            {
              title: "m_PET_BREED_PRE",
              key: 1299,
            },
            {
              title: "m_PET_ALLERGIES_PRE",
              key: 1301,
            },
            {
              title: "m_PET_SPECIES_PRE",
              key: 1303,
            },
            {
              title: "m_SKU_Attr_UPD",
              key: 1305,
            },
            {
              title: "m_SKU_Attr_Products_INS",
              key: 1307,
            },
            {
              title: "m_SKU_PIM_Attr_Type_Values",
              key: 1309,
            },
            {
              title: "m_SKU_PIM_Attr_Type",
              key: 1311,
            },
            {
              title: "m_SKU_PIM_Attr_Type_Values_Pre",
              key: 1313,
            },
            {
              title: "m_SKU_PIM_Attr_Type_Pre",
              key: 1315,
            },
            {
              title: "m_SKU_PIM_Attr",
              key: 1317,
            },
            {
              title: "m_SKU_PIM_Attr_Pre",
              key: 1319,
            },
            {
              title: "m_move_type",
              key: 1321,
            },
            {
              title: "m_move_reason",
              key: 1323,
            },
            {
              title: "m_dm_dept_segments",
              key: 1325,
            },
            {
              title: "m_movement_info",
              key: 1327,
            },
            {
              title: "m_site_profile_UPD_FROM_SAP_VENDOR",
              key: 1329,
            },
            {
              title: "m_site_profile_INS_FROM_SAP_VENDOR",
              key: 1331,
            },
            {
              title: "m_currency_day_TRUNC",
              key: 1333,
            },
            {
              title: "m_upc",
              key: 1335,
            },
            {
              title: "m_currency",
              key: 1337,
            },
            {
              title: "m_currency_day",
              key: 1339,
            },
            {
              title: "m_sap_att_type",
              key: 1341,
            },
            {
              title: "m_sap_att_type_pre",
              key: 1343,
            },
            {
              title: "m_product_attribute_mv",
              key: 1345,
            },
            {
              title: "m_sap_attribute",
              key: 1347,
            },
            {
              title: "m_sap_att_code",
              key: 1349,
            },
            {
              title: "m_sap_attribute_delete",
              key: 1351,
            },
            {
              title: "m_sap_att_code_pre",
              key: 1353,
            },
            {
              title: "m_sap_hierarchy",
              key: 1355,
            },
            {
              title: "m_sap_att_value",
              key: 1357,
            },
            {
              title: "m_sap_att_value_pre",
              key: 1359,
            },
            {
              title: "m_sap_attribute_pre",
              key: 1361,
            },
            {
              title: "m_site_profile_dc_names_email_upd",
              key: 1363,
            },
            {
              title: "m_site_profile_TIME_ZONE_ID",
              key: 1365,
            },
            {
              title: "m_price_ad_zone_SITE_PROFILE_PRE",
              key: 1367,
            },
            {
              title: "m_site_profile_pre",
              key: 1369,
            },
            {
              title: "m_site_profile_SQ_FOOTAGE",
              key: 1371,
            },
            {
              title: "m_site_profile_DAYCAMP_FLAG",
              key: 1373,
            },
            {
              title: "m_price_zone_SITE_PROFILE_PRE",
              key: 1375,
            },
            {
              title: "m_super_region",
              key: 1377,
            },
            {
              title: "m_equine_merch_SITE_PROFILE_PRE",
              key: 1379,
            },
            {
              title: "m_site_mktg_history",
              key: 1381,
            },
            {
              title: "m_region_SITE_PROFILE_PRE",
              key: 1383,
            },
            {
              title: "m_site_profile_EQUINE_MERCH",
              key: 1385,
            },
            {
              title: "m_site_profile_SITE_MANAGER_ID",
              key: 1387,
            },
            {
              title: "m_site_profile_HOTEL_FLAG",
              key: 1389,
            },
            {
              title: "m_loyalty_pgm_status",
              key: 1391,
            },
            {
              title: "m_loyalty_pre",
              key: 1393,
            },
            {
              title: "m_loyalty_pgm_type",
              key: 1395,
            },
            {
              title: "m_site_profile_EQUINE_SITE_ID",
              key: 1397,
            },
            {
              title: "m_site_profile_LOYALTY",
              key: 1399,
            },
            {
              title: "m_sap_t001w_site_pre",
              key: 1401,
            },
            {
              title: "m_district_SITE_PROFILE_PRE",
              key: 1403,
            },
            {
              title: "m_site_profile",
              key: 1405,
            },
            {
              title: "m_site_profile_VET_FLAG",
              key: 1407,
            },
            {
              title: "m_petsmart_dma",
              key: 1409,
            },
            {
              title: "m_zdisco_mkdn_sched",
              key: 1411,
            },
            {
              title: "m_shipper_detail",
              key: 1413,
            },
            {
              title: "m_zdisco_sched_type",
              key: 1415,
            },
            {
              title: "m_sku_hazmat_pre",
              key: 1417,
            },
            {
              title: "m_sku_hazmat",
              key: 1419,
            },
            {
              title: "m_sku_profile_UPD_FROM_SAP",
              key: 1421,
            },
            {
              title: "m_shipper_stko_pre",
              key: 1423,
            },
            {
              title: "m_gl_mara_pre",
              key: 1425,
            },
            {
              title: "m_gl_c003_pre",
              key: 1427,
            },
            {
              title: "m_article_category",
              key: 1429,
            },
            {
              title: "m_ztb_sel_disco_pre",
              key: 1431,
            },
            {
              title: "m_gl_mvke_pre",
              key: 1433,
            },
            {
              title: "m_sku_profile_pre",
              key: 1435,
            },
            {
              title: "m_shipper_stpo_pre",
              key: 1437,
            },
            {
              title: "m_sku_profile",
              key: 1439,
            },
            {
              title: "m_shipper_mast_pre",
              key: 1441,
            },
            {
              title: "m_lfm1_pre_SAP",
              key: 1443,
            },
            {
              title: "m_vendor_profile",
              key: 1445,
            },
            {
              title: "m_vendor_payment_term",
              key: 1447,
            },
            {
              title: "m_vendor_inco_term",
              key: 1449,
            },
            {
              title: "m_lfa1_pre_SAP",
              key: 1451,
            },
            {
              title: "m_vendor_profile_pre",
              key: 1453,
            },
            {
              title: "m_vendor_profile_superiorvendor",
              key: 1455,
            },
            {
              title: "m_location_from_site_profile",
              key: 1457,
            },
            {
              title: "m_location_old",
              key: 1459,
            },
            {
              title: "m_sap_t6wp1t_pre",
              key: 1461,
            },
            {
              title: "m_sku_profile_rpt",
              key: 1463,
            },
            {
              title: "m_sap_zth_web_record_pre",
              key: 1465,
            },
            {
              title: "m_artmas_pre",
              key: 1467,
            },
            {
              title: "m_sap_zth_web_wip_pre",
              key: 1469,
            },
            {
              title: "m_sap_ztb_group_hier",
              key: 1471,
            },
            {
              title: "m_MerchCat_Org",
              key: 1473,
            },
            {
              title: "m_sku_container",
              key: 1475,
            },
            {
              title: "m_merchdept_org",
              key: 1477,
            },
            {
              title: "m_vendor_profile_rpt",
              key: 1479,
            },
            {
              title: "m_sku_flavor",
              key: 1481,
            },
            {
              title: "m_site_profile_rpt",
              key: 1483,
            },
            {
              title: "m_date_type_day_LMLW",
              key: 1485,
            },
            {
              title: "m_date_type_lkup_UPD_LMLW",
              key: 1487,
            },
            {
              title: "m_date_type_day",
              key: 1489,
            },
            {
              title: "m_date_type_week",
              key: 1491,
            },
            {
              title: "m_date_type_lkup",
              key: 1493,
            },
            {
              title: "m_date_type_decision",
              key: 1495,
            },
            {
              title: "m_date_type_lkup_UPD",
              key: 1497,
            },
            {
              title: "m_date_type_lkup_LMLW",
              key: 1499,
            },
            {
              title: "m_UDH_SKU_STYLE",
              key: 1501,
            },
            {
              title: "m_UDH_SKU_STYLE_PRE",
              key: 1503,
            },
            {
              title: "m_Site_Hours_Day_Pre_Vendor",
              key: 1505,
            },
            {
              title: "m_Site_Hours_Day_Pre_Store",
              key: 1507,
            },
            {
              title: "m_Site_Hours_Day",
              key: 1509,
            },
            {
              title: "m_Site_Hours_Day_Pre_DC",
              key: 1511,
            },
            {
              title: "m_label_size_ACTUAL",
              key: 1513,
            },
            {
              title: "m_ztb_label_chgs_pre",
              key: 1515,
            },
            {
              title: "m_label_type_ACTUAL",
              key: 1517,
            },
            {
              title: "m_label_day_store_sku_ACTUAL",
              key: 1519,
            },
            {
              title: "m_ztb_label_chgs_pre_20140308",
              key: 1521,
            },
            {
              title: "m_label_pog_type_ACTUAL",
              key: 1523,
            },
            {
              title: "m_ztb_adv_lbl_chgs_pre",
              key: 1525,
            },
            {
              title: "m_ztb_adv_lbl_chgs_pre_20140308",
              key: 1527,
            },
            {
              title: "m_label_type_ADVANCE",
              key: 1529,
            },
            {
              title: "m_label_pog_type_ADVANCE",
              key: 1531,
            },
            {
              title: "m_label_size_ADVANCE",
              key: 1533,
            },
            {
              title: "m_label_day_store_sku_ADVANCE",
              key: 1535,
            },
            {
              title: "m_sales_ranking_wk_DELETE",
              key: 1537,
            },
            {
              title: "m_sales_ranking_sales_pre",
              key: 1539,
            },
            {
              title: "m_sales_ranking_totals_pre",
              key: 1541,
            },
            {
              title: "m_sales_ranking_date_pre",
              key: 1543,
            },
            {
              title: "m_sales_ranking_wk_pre",
              key: 1545,
            },
            {
              title: "m_sales_ranking_running_sum_pre_SQL",
              key: 1547,
            },
            {
              title: "m_sales_ranking_wk",
              key: 1549,
            },
            {
              title: "m_NZ2ORA_Replenishment_profile_flat_file",
              key: 1551,
            },
            {
              title: "m_store_data",
              key: 1553,
            },
            {
              title: "m_store_time_zone",
              key: 1555,
            },
            {
              title: "m_store_tax_rate",
              key: 1557,
            },
            {
              title: "m_non_discount_upc",
              key: 1559,
            },
            {
              title: "m_non_discount_upc_TRUNC",
              key: 1561,
            },
            {
              title: "m_store_rank_STORE_DECILE",
              key: 1563,
            },
            {
              title: "m_sku_rank",
              key: 1565,
            },
            {
              title: "m_store_rank_TOP_100_STORES",
              key: 1567,
            },
            {
              title: "m_PURCH_GROUP_VENDOR_INSERT",
              key: 1569,
            },
            {
              title: "STORE_LAT_LONG_PRE",
              key: 1571,
            },
            {
              title: "m_Site_Profile_Lat_Long",
              key: 1573,
            },
            {
              title: "m_store_area_pre",
              key: 1575,
            },
            {
              title: "m_location_area_END_DT",
              key: 1577,
            },
            {
              title: "m_location_area_INSERT",
              key: 1579,
            },
            {
              title: "m_sku_profile_sales_date_update",
              key: 1581,
            },
            {
              title: "m_site_profile_EQUINE_SITE_OPEN_DT",
              key: 1583,
            },
            {
              title: "m_sku_profile_inventory_date_update",
              key: 1585,
            },
            {
              title: "m_product_inventory_date_update",
              key: 1587,
            },
            {
              title: "m_prod_sales_date_update",
              key: 1589,
            },
            {
              title: "m_site_profile_SITE_SALES_FLAG",
              key: 1591,
            },
            {
              title: "m_site_profile_HOTEL_OPEN_DT",
              key: 1593,
            },
            {
              title: "m_loc_hier_lvl",
              key: 1595,
            },
            {
              title: "m_loc_hier_lvl_TRUNC",
              key: 1597,
            },
            {
              title: "m_replenishment_profile_truncate",
              key: 1599,
            },
            {
              title: "m_replenishment_profile_SQL",
              key: 1601,
            },
            {
              title: "m_site_group_day",
              key: 1603,
            },
            {
              title: "m_site_group_pre",
              key: 1605,
            },
            {
              title: "m_replenishment_pre",
              key: 1607,
            },
            {
              title: "m_replenishment_day",
              key: 1609,
            },
            {
              title: "m_POG_SKU_STORE_UPD",
              key: 1611,
            },
            {
              title: "m_POG_SKU_STORE",
              key: 1613,
            },
            {
              title: "m_ZTB_ART_LOC_SITE_PRE",
              key: 1615,
            },
            {
              title: "m_pog_ztb_promohst_pre",
              key: 1617,
            },
            {
              title: "m_pog_ztb_promo_trunc",
              key: 1619,
            },
            {
              title: "m_pog_promo_hst",
              key: 1621,
            },
            {
              title: "m_pog_ztb_promo_plsql",
              key: 1625,
            },
            {
              title: "m_ztb_promo_pre",
              key: 1627,
            },
            {
              title: "m_pog_promo_hold",
              key: 1629,
            },
            {
              title: "m_listing_day_SQL",
              key: 1631,
            },
            {
              title: "m_listing_day_truncate",
              key: 1633,
            },
            {
              title: "m_listing_hst_delta_insert",
              key: 1635,
            },
            {
              title: "m_supply_chain_trunc",
              key: 1637,
            },
            {
              title: "m_source_vendor_pass1_PLSQL",
              key: 1639,
            },
            {
              title: "m_sku_vendor_pre",
              key: 1641,
            },
            {
              title: "m_source_vendor_pass2_plsql",
              key: 1643,
            },
            {
              title: "m_sku_store_vendor_pre",
              key: 1645,
            },
            {
              title: "m_vendor_minimum_pre",
              key: 1647,
            },
            {
              title: "m_sku_store_vendor_day",
              key: 1649,
            },
            {
              title: "m_sku_profile_vendor_update",
              key: 1651,
            },
            {
              title: "m_source_vendor_pass1_TRUNC",
              key: 1653,
            },
            {
              title: "m_primary_vendor_pre",
              key: 1655,
            },
            {
              title: "m_supply_chain_plsql",
              key: 1657,
            },
            {
              title: "m_sku_vendor_day",
              key: 1659,
            },
            {
              title: "m_source_vendor_pass3_plsql",
              key: 1661,
            },
            {
              title: "m_vendor_minimum",
              key: 1663,
            },
            {
              title: "m_vendor_po_cond",
              key: 1665,
            },
            {
              title: "m_po_cond",
              key: 1667,
            },
            {
              title: "m_vendor_po_cond_pre",
              key: 1669,
            },
            {
              title: "m_vendor_site_po_cond_pre",
              key: 1671,
            },
            {
              title: "m_vendor_site_po_cond",
              key: 1673,
            },
            {
              title: "m_vendor_po_cond_DELETE_IND",
              key: 1675,
            },
            {
              title: "m_sku_case_dim",
              key: 1677,
            },
            {
              title: "m_sku_profile_hist",
              key: 1679,
            },
            {
              title: "m_merchcat",
              key: 1681,
            },
            {
              title: "m_product_history_1",
              key: 1683,
            },
            {
              title: "m_product_old",
              key: 1685,
            },
            {
              title: "m_product_history_4",
              key: 1687,
            },
            {
              title: "m_sku_profile_to_product",
              key: 1689,
            },
            {
              title: "m_product_history_3",
              key: 1691,
            },
            {
              title: "m_product_history_2",
              key: 1693,
            },
            {
              title: "m_product_key_pre",
              key: 1695,
            },
            {
              title: "m_sku_brand_pre",
              key: 1697,
            },
            {
              title: "m_brand",
              key: 1699,
            },
            {
              title: "m_pb_manager",
              key: 1701,
            },
            {
              title: "m_pb_director_pre",
              key: 1703,
            },
            {
              title: "m_pb_manager_pre",
              key: 1705,
            },
            {
              title: "m_brand_pre",
              key: 1707,
            },
            {
              title: "m_pb_hierarchy_pre",
              key: 1709,
            },
            {
              title: "m_pb_director",
              key: 1711,
            },
            {
              title: "m_pb_hierarchy",
              key: 1713,
            },
            {
              title: "m_sku_profile_brand",
              key: 1715,
            },
            {
              title: "m_sku_profile_subs_history_update",
              key: 1717,
            },
            {
              title: "m_sku_profile_subs_not_null",
              key: 1719,
            },
            {
              title: "m_sku_profile_valuation_class",
              key: 1721,
            },
            {
              title: "m_sku_profile_tax_class",
              key: 1723,
            },
            {
              title: "m_Nz2Ora_region",
              key: 1841,
            },
            {
              title: "m_sku_profile_uom",
              key: 1725,
            },
            {
              title: "m_sap_dept",
              key: 1727,
            },
            {
              title: "m_sap_class",
              key: 1729,
            },
            {
              title: "m_sku_profile_sku_status",
              key: 1731,
            },
            {
              title: "m_sku_profile_hts",
              key: 1733,
            },
            {
              title: "m_primary_vendor",
              key: 1735,
            },
            {
              title: "m_sap_category",
              key: 1737,
            },
            {
              title: "m_sku_profile_buyer",
              key: 1739,
            },
            {
              title: "m_sku_profile_sign_type",
              key: 1741,
            },
            {
              title: "m_purch_group",
              key: 1743,
            },
            {
              title: "m_sap_division",
              key: 1745,
            },
            {
              title: "m_sku_uom_pre_uom_cd",
              key: 1747,
            },
            {
              title: "m_sku_uom",
              key: 1749,
            },
            {
              title: "m_sku_uom_from_sku_delta_UPD",
              key: 1751,
            },
            {
              title: "m_sku_uom_UPD_scm",
              key: 1753,
            },
            {
              title: "m_sku_uom_pre",
              key: 1755,
            },
            {
              title: "m_sku_store_price_costs_pre_plsql",
              key: 1757,
            },
            {
              title: "m_sku_store_price_pre",
              key: 1759,
            },
            {
              title: "m_sku_store_cost_pre",
              key: 1761,
            },
            {
              title: "m_sku_site_profile_plsql",
              key: 1763,
            },
            {
              title: "m_sku_store_cost_day",
              key: 1765,
            },
            {
              title: "m_pricing_reason",
              key: 1767,
            },
            {
              title: "m_sku_store_price_day",
              key: 1769,
            },
            {
              title: "m_sku_site_profile_trunc",
              key: 1771,
            },
            {
              title: "m_national_price_pre",
              key: 1773,
            },
            {
              title: "m_national_cost_pre",
              key: 1775,
            },
            {
              title: "m_national_cost_day",
              key: 1777,
            },
            {
              title: "m_national_price_day",
              key: 1779,
            },
            {
              title: "m_sku_profile_price_cost_update",
              key: 1781,
            },
            {
              title: "m_sku_store_price_costs_pre_truncate",
              key: 1783,
            },
            {
              title: "m_vendor_subrange",
              key: 1785,
            },
            {
              title: "m_vendor_subrange_pre",
              key: 1787,
            },
            {
              title: "m_carrier_profile_wms_pre",
              key: 1789,
            },
            {
              title: "m_carrier_profile_pre",
              key: 1791,
            },
            {
              title: "m_carrier_profile",
              key: 1793,
            },
            {
              title: "m_Site_Hierarchy_Hist",
              key: 1795,
            },
            {
              title: "m_Site_Eagle_Status",
              key: 1797,
            },
            {
              title: "m_Site_Dm_Hist",
              key: 1799,
            },
            {
              title: "m_Site_Hierarchy_Hist_UPDATE",
              key: 1801,
            },
            {
              title: "m_Site_DM_Hist_UPDATE",
              key: 1803,
            },
            {
              title: "m_Nz2Ora_Void_Type",
              key: 1805,
            },
            {
              title: "m_NZ2ORA_discount_type",
              key: 1807,
            },
            {
              title: "m_Nz2Ora_sap_category",
              key: 1809,
            },
            {
              title: "m_NZ2ORA_PRIMARY_VENDOR",
              key: 1811,
            },
            {
              title: "m_Nz2Ora_sap_dept",
              key: 1813,
            },
            {
              title: "m_NZ_to_ORA_HTS",
              key: 1815,
            },
            {
              title: "m_Nz2Ora_district",
              key: 1817,
            },
            {
              title: "m_Nz2Ora_tp_breed",
              key: 1819,
            },
            {
              title: "m_Nz2Ora_TP_SPECIES",
              key: 1821,
            },
            {
              title: "m_NZ2ORA_TAX_CLASS",
              key: 1823,
            },
            {
              title: "m_NZ2ORA_cr_cust_acct_type",
              key: 1825,
            },
            {
              title: "m_Nz2Ora_tp_invoice_state",
              key: 1827,
            },
            {
              title: "m_Nz2Ora_tp_sex",
              key: 1829,
            },
            {
              title: "m_NZ2ORA_coupon_type",
              key: 1831,
            },
            {
              title: "m_NZ2ORA_sku_store_vendor_day",
              key: 1833,
            },
            {
              title: "m_NZ2ORA_VENDOR",
              key: 1835,
            },
            {
              title: "m_Nz2Ora_tp_room_type",
              key: 1837,
            },
            {
              title: "m_Nz2Ora_sap_class",
              key: 1839,
            },
            {
              title: "m_Nz2Ora_sku_profile",
              key: 1843,
            },
            {
              title: "m_Nz2Ora_special_srvc_type",
              key: 1845,
            },
            {
              title: "m_NZ2ORA_SALES_TYPE",
              key: 1847,
            },
            {
              title: "m_NZ2ORA_payment_type",
              key: 1849,
            },
            {
              title: "m_NZ2ORA_BUYER",
              key: 1851,
            },
            {
              title: "m_Nz2Ora_tp_phone_type",
              key: 1853,
            },
            {
              title: "m_NZ2ORA_LOCATION",
              key: 1855,
            },
            {
              title: "m_Nz2Ora_tax_type",
              key: 1857,
            },
            {
              title: "m_Nz2Ora_sap_division",
              key: 1859,
            },
            {
              title: "m_NZ2ORA_store_data",
              key: 1861,
            },
            {
              title: "m_NZ2ORA_company",
              key: 1863,
            },
            {
              title: "m_NZ2ORA_country",
              key: 1865,
            },
            {
              title: "m_Nz2Ora_vendor_profile",
              key: 1867,
            },
            {
              title: "m_Nz2Ora_sku_status",
              key: 1869,
            },
            {
              title: "m_NZ2ORA_reason",
              key: 1871,
            },
            {
              title: "m_NZ2ORA_SKU_UOM",
              key: 1873,
            },
            {
              title: "m_NZ2ORA_store_tax_rate",
              key: 1875,
            },
            {
              title: "m_NZ2ORA_store_time_zone",
              key: 1877,
            },
            {
              title: "m_Nz2Ora_site_profile",
              key: 1879,
            },
            {
              title: "m_NZ2ORA_PURCH_GROUP",
              key: 1881,
            },
            {
              title: "m_NZ2ORA_UPC",
              key: 1883,
            },
            {
              title: "m_NZ2ORA_store_type",
              key: 1885,
            },
            {
              title: "m_NZ2ORA_state",
              key: 1887,
            },
            {
              title: "m_NZ2ORA_PURCH_GROUP_VENDOR",
              key: 1889,
            },
            {
              title: "m_NZ2ORA_sku_case_dim",
              key: 1891,
            },
            {
              title: "m_days_EDW_EDH",
              key: 1893,
            },
            {
              title: "m_months_EDW_EDH",
              key: 1895,
            },
            {
              title: "m_weeks_EDW_EDH",
              key: 1897,
            },
            {
              title: "m_years_EDW",
              key: 1899,
            },
            {
              title: "m_wk26_weeks_EDW",
              key: 1901,
            },
            {
              title: "m_cyr_lyr_weeks_EDW",
              key: 1903,
            },
            {
              title: "m_ytd_weeks_EDW",
              key: 1905,
            },
            {
              title: "m_lwk_weeks_EDW_EDH",
              key: 1907,
            },
            {
              title: "m_wk13_weeks_EDW",
              key: 1909,
            },
            {
              title: "m_lqtr_weeks_EDW_EDH",
              key: 1911,
            },
            {
              title: "m_mtd_weeks_EDW_EDH",
              key: 1913,
            },
            {
              title: "m_wk52_weeks_EDW",
              key: 1915,
            },
            {
              title: "m_lyr_weeks_EDW_EDH",
              key: 1917,
            },
            {
              title: "m_lyr_mtd_weeks_EDW_EDH",
              key: 1919,
            },
            {
              title: "m_wk16_weeks_EDW",
              key: 1921,
            },
            {
              title: "m_wtd_days_EDW",
              key: 1923,
            },
            {
              title: "m_qtd_weeks_EDW",
              key: 1925,
            },
            {
              title: "m_wk4_weeks_EDW",
              key: 1927,
            },
            {
              title: "m_lwk_days_EDW_EDH",
              key: 1929,
            },
            {
              title: "m_mtd_days_EDW_EDH",
              key: 1931,
            },
            {
              title: "m_wk8_weeks_EDW",
              key: 1933,
            },
            {
              title: "m_lyr_days_EDW_EDH",
              key: 1935,
            },
            {
              title: "m_pog_promo_wk",
              key: 1937,
            },
          ],
          title: "Mapping",
        },
        {
          children: [
            {
              title: "wf_SKU_MPP_Attributes",
              key: 1102,
            },
            {
              title: "wf_SAP_MVKE_To_NAS",
              key: 1103,
            },
            {
              title: "wf_SAP_Shipper_Details_To_NAS",
              key: 1104,
            },
            {
              title: "wf_SAP_Attributes_DP_SKU_LINK_to_NAS",
              key: 1105,
            },
            {
              title: "wf_SAP_Missing_Attributes_To_NAS",
              key: 1106,
            },
            {
              title: "wf_SAP_Attributes_to_NAS",
              key: 1107,
            },
            {
              title: "wf_SAP_Category_Attributes_STPO_To_NAS",
              key: 1108,
            },
            {
              title: "wf_SAP_Category_Attributes_To_NAS",
              key: 1109,
            },
            {
              title: "wf_SAP_Discontinued_Attributes_To_NAS",
              key: 1110,
            },
            {
              title: "wf_POST_BATCH_VALIDATION",
              key: 1111,
            },
            {
              title: "wf_STX_EDW_Sales_Count_Validation",
              key: 1112,
            },
            {
              title: "wf_FiscalCalendarLoad",
              key: 1113,
            },
            {
              title: "wf_USR_Store_Attributes",
              key: 1114,
            },
            {
              title: "wf_Site_Hours_Day_Restore",
              key: 1115,
            },
            {
              title: "wf_SKU_SAP_Attributes",
              key: 1116,
            },
            {
              title: "wf_SKU_TXS_Attributes",
              key: 1117,
            },
            {
              title: "wf_SKU_Attributes_to_MTX",
              key: 1118,
            },
            {
              title: "wf_Sku_Sap_Attr",
              key: 1119,
            },
            {
              title: "wf_Pet_Attributes",
              key: 1122,
            },
            {
              title: "wf_SKU_PIM_Attributes",
              key: 1123,
            },
            {
              title: "bs_Dimension",
              key: 1132,
            },
            {
              title: "wf_date_type",
              key: 1133,
            },
            {
              title: "wf_UDH_SKU_STYLE",
              key: 1134,
            },
            {
              title: "wf_Site_Hours_Day",
              key: 1135,
            },
            {
              title: "wf_Label_Price_ACTUAL",
              key: 1136,
            },
            {
              title: "wf_Label_Price_ADVANCE",
              key: 1137,
            },
            {
              title: "wf_Sales_Ranking_Wk",
              key: 1138,
            },
            {
              title: "wf_NZ2ORA_SC_RP_Replication",
              key: 1139,
            },
            {
              title: "wf_Store_Data",
              key: 1140,
            },
            {
              title: "wf_store_parameters",
              key: 1141,
            },
            {
              title: "bs_sku_promotion",
              key: 1142,
            },
            {
              title: "wf_SKU_Store_Rank",
              key: 1143,
            },
            {
              title: "wf_DIM_replicate_NCAST_DATA",
              key: 1144,
            },
            {
              title: "wf_Store_Lat_Long",
              key: 1145,
            },
            {
              title: "bs_Square_Footage",
              key: 1146,
            },
            {
              title: "bs_Dim_Updates",
              key: 1148,
            },
            {
              title: "bs_Replenishment_Profile",
              key: 1151,
            },
            {
              title: "bs_Demand_Dim",
              key: 1162,
            },
            {
              title: "wf_Vendor_Dim",
              key: 1163,
            },
            {
              title: "wf_carrier_profile",
              key: 1164,
            },
            {
              title: "wf_Site_Attribute",
              key: 1165,
            },
            {
              title: "wf_NZ2ORA_Dim_Replication",
              key: 1166,
            },
            {
              title: "wf_EDW_EDH_date_lookup_load",
              key: 1168,
            },
          ],
          title: "Workflow",
        },
        {
          children: [
            {
              title: "wkt_Pet_Attributes_Pre",
              key: 1120,
            },
            {
              title: "wkt_Pet_Attributes",
              key: 1121,
            },
            {
              title: "wklt_shipper_detail_pre",
              key: 1124,
            },
            {
              title: "wklt_sku_profile_pre",
              key: 1125,
            },
            {
              title: "bs_Sku_Profile_Part1",
              key: 1126,
            },
            {
              title: "bs_Site_Profile",
              key: 1127,
            },
            {
              title: "bs_Location_from_Site",
              key: 1128,
            },
            {
              title: "bs_Vendor_Profile",
              key: 1129,
            },
            {
              title: "bs_SAP_Attribute",
              key: 1130,
            },
            {
              title: "bs_Profile_RPT",
              key: 1131,
            },
            {
              title: "wlt_Prod_Loc_Hierarchy",
              key: 1147,
            },
            {
              title: "bs_Replenishment_Dim",
              key: 1149,
            },
            {
              title: "bs_Pog_Ztb_Promo",
              key: 1150,
            },
            {
              title: "bs_Retail_Price_Purch_Cost",
              key: 1152,
            },
            {
              title: "bs_Listing",
              key: 1153,
            },
            {
              title: "bs_Vendor_Purch",
              key: 1154,
            },
            {
              title: "bs_Supply_Chain",
              key: 1155,
            },
            {
              title: "bs_Sku_Dims",
              key: 1156,
            },
            {
              title: "bs_Sku_Subs",
              key: 1157,
            },
            {
              title: "bs_Sku_Uom",
              key: 1158,
            },
            {
              title: "bs_Sku_PB",
              key: 1159,
            },
            {
              title: "bs_Product",
              key: 1160,
            },
            {
              title: "bs_Sku_Profile_Part2",
              key: 1161,
            },
            {
              title: "wl_Date_lookup_table_load",
              key: 1167,
            },
          ],
          title: "Worklet",
        },
        {
          children: [
            {
              title: "mplt_GENERIC_SQL",
              key: 1623,
            },
          ],
          title: "Mapplet",
        },
      ],
      title: "BA_Dimension.xml",
    },
  ]);

  const [treeDataDefault, setTreeDataDefault] = useState(treeData);

  const [showHide, setShowHide] = useState(true);

  const filter = (array, text) => {
    const getNodes = (result, object) => {
      if (object.title.toLowerCase().includes(text.toLowerCase())) {
        result.push(object);
        return result;
      }
      if (Array.isArray(object.children)) {
        const children = object.children.reduce(getNodes, []);
        if (children.length) result.push({ ...object, children });
      }
      return result;
    };
    return array.reduce(getNodes, []);
  };

  return (
    <>
      {modalData ? (
        <Row>
          <Col span={showHide ? 6 : 0} style={{ backgroundColor: "#0c3246", height: "85vh" }}>
            <Input
              placeholder="Search"
              onKeyUp={(e) => {
                const filterData = filter(treeDataDefault, e.target.value);
                setTreeData(filterData);
              }}
              style={{ height: "5vh", border: "1px solid #0c3246" }}
            />
            <Tree
              className="treeCss"
              defaultExpandAll={true}
              style={{
                color: "#FFF",
                paddingTop: "2vh",
                backgroundColor: "#0c3246",
                height: "80vh",
                overflowY: "scroll",
              }}
              showLine
              switcherIcon={<DownOutlined />}
              onSelect={(e) => {
                alert(e);
              }}
              treeData={treeData}
            />
          </Col>
          <Col span={showHide ? 18 : 24} style={{ height: "85vh", paddingLeft: "1vw" }}>
            <AnalyzeDetailPopup
              showHide={showHide}
              setShowHide={setShowHide}
              outputFileId={outputFileId}
              data={modalData}
              showPopUp={showPopUp}
            />
          </Col>
        </Row>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default GraphView;
