export const TAG_TO_DB_COMMON_MAPPING = {
  'GS.U4.50CJA00DE100-XQ20': '발전량',
  'GS.U1.10CJA01CT001-XQ01': '백엽상_대기온도1',
  'GS.U1.10CJA01CT002-XQ01': '백엽상_대기온도2',
  'GS.U1.10CJA01CT003-XQ01': '백엽상_대기온도3',
  'GS.U1.10CJA01CP001-XQ01': '백엽상_대기압1',
  'GS.U1.10CJA01CP002-XQ01': '백엽상_대기압2',
  'GS.U1.10CJA01CP003-XQ01': '백엽상_대기압3',
  'GS.U1.10CJA01CM001-XQ01': '백엽상_상대습도1',
  'GS.U1.10CJA01CM002-XQ01': '백엽상_상대습도2',
  'GS.U1.10CJA01CM003-XQ01': '백엽상_상대습도3',
  'GS.U4.50CJA00DE100B-XQ01': 'setting_mw_gross',
  'GS.U4.50CJA00DE100C-XQ01': 'kpx_demand_cc',
  'GS.U4.50CJA00DE100C-XQ03': 'dcs_target',
  'GS.U4.50EKG61CT001-XQ01': 'ng_gov_out_temp',
} as const;

export const TAG_TO_DB_GT1_MAPPING = {
  'GS.U4.51MBY10CE901-XQ01': 'gt1_발전량',
  'GS.U4.51MBA11CT901-ZQ01': 'gt1_압축기_입구_대기온도',
  'GS.U4.51MBL05CP003S-XQ01': 'gt1_압축기_입구_대기압',
  'GS.U4.51MBL11FM001-ZQ01': 'gt1_압축기_입구_상대습도',
  'GS.U4.51MBA11CG901-ZQ11': 'gt1_igv_posn',
  'GS.U4.51MBA11CG911-ZQ11': 'gt1_vgv1_posn',
  'GS.U4.51MBA11CG921-ZQ11': 'gt1_vgv2_posn',
  'GS.U4.51MBA11CG931-ZQ11': 'gt1_vgv3_posn',
  'GS.U4.51MBL10CP105-XQ01': 'gt1_헤파필터_차압',
  'GS.U4.51MBA12CP901-ZQ01A': 'gt1_압축기_후단_압력',
  'GS.U4.51MBA12CT901-ZQ01': 'gt1_압축기_출구_온도',
  'GS.U4.51EKG60FF001-XQ01': 'gt1_연료가스_유입량',
  'GS.U4.51EKG70CT001-XQ01': 'gt1_연료가스_온도',
  'GS.U4.51EKG60CT001-XQ01': 'gt1_연료가스_유량계_온도',
  'GS.U4.51MBP21AA151C-XQ01': 'gt1_a_stage_cv_posn',
  'GS.U4.51MBP22AA151C-XQ01': 'gt1_b_stage_cv_posn',
  'GS.U4.51MBP23AA151C-XQ01': 'gt1_c_stage_cv_posn',
  'GS.U4.51MBP31AA151C-XQ01': 'gt1_pilot_stage_cv_posn',
  'GS.U4.51MBP32AA151C-XQ01': 'gt1_d_stage_cv_posn',
  'GS.U4.51MBP21FF901-ZQ01': 'gt1_a_stage_fg_flow',
  'GS.U4.51MBP22FF901-ZQ01': 'gt1_b_stage_fg_flow',
  'GS.U4.51MBP23FF901-ZQ01': 'gt1_c_stage_fg_flow',
  'GS.U4.51MBP31FF901-ZQ01': 'gt1_pilot_stage_fg_flow',
  'GS.U4.51MBP32FF901-ZQ01': 'gt1_d_stage_fg_flow',
  'GS.U4.51MBR10FT901-ZQ01': 'gt1_otc',
  'GS.U4.51MBY10CS901-ZQ11': 'gt1_터빈_속도',
  'GS.U4.51MBA10FG100-ZQ01': 'gt1_hco_shaft_posn',
  'GS.U4.51MBL15CG003-XQ01': 'gt1_방빙장치_valve',
  'GS.U4.51MBY10EP801-XQ01': 'gt1_정비_주기_eoh',
  'GS.U4.51MBR10CT900-ZQ01': 'gt1_배기구_온도',
  'GS.U4.51HBK10CP001-XQ01': 'gt1_배기구_압력',
} as const;

export const TAG_TO_DB_GT2_MAPPING = {
  'GS.U4.52MBY10CE901-XQ01': 'gt2_발전량',
  'GS.U4.52MBA11CT901-ZQ01': 'gt2_압축기_입구_대기온도',
  'GS.U4.52MBL05CP003S-XQ01': 'gt2_압축기_입구_대기압',
  'GS.U4.52MBL11FM001-ZQ01': 'gt2_압축기_입구_상대습도',
  'GS.U4.52MBA11CG901-ZQ11': 'gt2_igv_posn',
  'GS.U4.52MBA11CG911-ZQ11': 'gt2_vgv1_posn',
  'GS.U4.52MBA11CG921-ZQ11': 'gt2_vgv2_posn',
  'GS.U4.52MBA11CG931-ZQ11': 'gt2_vgv3_posn',
  'GS.U4.52MBL10CP105-XQ01': 'gt2_헤파필터_차압',
  'GS.U4.52MBA12CP901-ZQ01A': 'gt2_압축기_후단_압력',
  'GS.U4.52MBA12CT901-ZQ01': 'gt2_압축기_출구_온도',
  'GS.U4.52EKG60FF001-XQ01': 'gt2_연료가스_유입량',
  'GS.U4.52EKG70CT001-XQ01': 'gt2_연료가스_온도',
  'GS.U4.52EKG60CT001-XQ01': 'gt2_연료가스_유량계_온도',
  'GS.U4.52MBP21AA151C-XQ01': 'gt2_a_stage_cv_posn',
  'GS.U4.52MBP22AA151C-XQ01': 'gt2_b_stage_cv_posn',
  'GS.U4.52MBP23AA151C-XQ01': 'gt2_c_stage_cv_posn',
  'GS.U4.52MBP31AA151C-XQ01': 'gt2_pilot_stage_cv_posn',
  'GS.U4.52MBP32AA151C-XQ01': 'gt2_d_stage_cv_posn',
  'GS.U4.52MBP21FF901-ZQ01': 'gt2_a_stage_fg_flow',
  'GS.U4.52MBP22FF901-ZQ01': 'gt2_b_stage_fg_flow',
  'GS.U4.52MBP23FF901-ZQ01': 'gt2_c_stage_fg_flow',
  'GS.U4.52MBP31FF901-ZQ01': 'gt2_pilot_stage_fg_flow',
  'GS.U4.52MBP32FF901-ZQ01': 'gt2_d_stage_fg_flow',
  'GS.U4.52MBR10FT901-ZQ01': 'gt2_otc',
  'GS.U4.52MBY10CS901-ZQ11': 'gt2_터빈_속도',
  'GS.U4.52MBA10FG100-ZQ01': 'gt2_hco_shaft_posn',
  'GS.U4.52MBL15CG003-XQ01': 'gt2_방빙장치_valve',
  'GS.U4.52MBY10EP801-XQ01': 'gt2_정비_주기_eoh',
  'GS.U4.52MBR10CT900-ZQ01': 'gt2_배기구_온도',
  'GS.U4.52HBK10CP001-XQ01': 'gt2_배기구_압력',
} as const;

export const TAG_TO_DB_ST_MAPPING = {
  'GS.U4.50MKA01CE903N-XQ01': 'st_발전량',
  'GS.U4.50MAG10FP002-XQ01': 'st_콘덴서_압력',
  'GS.U4.50PAB21CT001-XQ01': 'st_콘덴서_입구_해수온도1',
  'GS.U4.50PAB22CT001-XQ01': 'st_콘덴서_입구_해수온도2',
  'GS.U4.50PAB31CT001-XQ01': 'st_콘덴서_출구_해수온도1',
  'GS.U4.50PAB32CT001-XQ01': 'st_콘덴서_출구_해수온도2',
  'GS.U4.50LBA20FT007A-XQ01': 'hps_header_temp',
  'GS.U4.50LBA20FP004-XQ01': 'hps_header_pres',
  'GS.U4.50LBB50FT007A-XQ01': 'ips_header_temp',
  'GS.U4.50LBB50FP004-XQ01': 'ips_header_pres',
  'GS.U4.50LBA90CT001A-XQ01': 'lps_header_temp',
  'GS.U4.50LBA90FP004-XQ01': 'lps_header_pres',
  'GS.U4.50MAA12FG151-XQ01': 'st_cv_posn_hps1',
  'GS.U4.50MAA22FG151-XQ01': 'st_cv_posn_hps2',
  'GS.U4.50MAB12FG151-XQ01': 'st_cv_posn_ips1',
  'GS.U4.50MAB22FG151-XQ01': 'st_cv_posn_ips2',
  'GS.U4.51LBC45CG101-XQ01': 'st_cv_posn_crh1',
  'GS.U4.52LBC45CG101-XQ01': 'st_cv_posn_crh2',
  'GS.U4.50MAC46FG151-XQ01': 'st_cv_posn_lps',
} as const;

export const TAG_TO_DB_HRSG_MAPPING = {
  'GS.U4.51LBA10CT007-XQ01': 'hrsg1_hp_temp',
  'GS.U4.51LBA10CP001-XQ01': 'hrsg1_hp_pres',
  'GS.U4.51LBA10CF901-ZQ01': 'hrsg1_hp_flow',
  'GS.U4.51LBC45CF001-ZQ01': 'hrsg1_crh_flow',
  'GS.U4.51LBB45CT001-XQ01': 'hrsg1_hrh_temp',
  'GS.U4.51LBA50CT001-XQ01': 'hrsg1_ip_temp',
  'GS.U4.51LBA50CP001-XQ01': 'hrsg1_ip_pres',
  'GS.U4.51LBA50CF901-ZQ01': 'hrsg1_ip_flow',
  'GS.U4.51LBA80CT001-XQ01': 'hrsg1_lp_temp',
  'GS.U4.51LBA80CP001-XQ01': 'hrsg1_lp_pres',
  'GS.U4.51LBA80CF901-ZQ01': 'hrsg1_lp_flow',
  'GS.U4.52LBA10CT007-XQ01': 'hrsg2_hp_temp',
  'GS.U4.52LBA10CP001-XQ01': 'hrsg2_hp_pres',
  'GS.U4.52LBA10CF901-ZQ01': 'hrsg2_hp_flow',
  'GS.U4.52LBC45CF001-ZQ01': 'hrsg2_crh_flow',
  'GS.U4.52LBB45CT001-XQ01': 'hrsg2_hrh_temp',
  'GS.U4.52LBA50CT001-XQ01': 'hrsg2_ip_temp',
  'GS.U4.52LBA50CP001-XQ01': 'hrsg2_ip_pres',
  'GS.U4.52LBA50CF901-ZQ01': 'hrsg2_ip_flow',
  'GS.U4.52LBA80CT001-XQ01': 'hrsg2_lp_temp',
  'GS.U4.52LBA80CP001-XQ01': 'hrsg2_lp_pres',
  'GS.U4.52LBA80CF901-ZQ01': 'hrsg2_lp_flow',
} as const;

export const DB_TO_MODEL_COMMON_MAPPING = {
  발전량: '발전량',
  송전량: '송전량',
  백엽상_대기온도1: '백엽상 대기온도1',
  백엽상_대기온도2: '백엽상 대기온도2',
  백엽상_대기온도3: '백엽상 대기온도3',
  백엽상_대기압1: '백엽상 대기압1',
  백엽상_대기압2: '백엽상 대기압2',
  백엽상_대기압3: '백엽상 대기압3',
  백엽상_상대습도1: '백엽상 상대습도1',
  백엽상_상대습도2: '백엽상 상대습도2',
  백엽상_상대습도3: '백엽상 상대습도3',
  setting_mw_gross: 'Setting MW (Gross)',
  kpx_demand_cc: 'KPX Demand (CC)',
  dcs_target: 'DCS Target',
  ng_gov_out_temp: 'NG GOV OUT TEMP',
} as const;

export const DB_TO_MODEL_GT1_MAPPING = {
  gt1_발전량: 'GT1 발전량',
  gt1_압축기_입구_대기온도: 'GT1 압축기 입구 대기온도',
  gt1_압축기_입구_대기압: 'GT1 압축기 입구 대기압',
  gt1_압축기_입구_상대습도: 'GT1 압축기 입구 상대습도',
  gt1_igv_posn: 'GT1 IGV POSN',
  gt1_vgv1_posn: 'GT1 VGV1 POSN',
  gt1_vgv2_posn: 'GT1 VGV2 POSN',
  gt1_vgv3_posn: 'GT1 VGV3 POSN',
  gt1_헤파필터_차압: 'GT1 헤파필터 차압',
  gt1_압축기_후단_압력: 'GT1 압축기 후단 압력',
  gt1_압축기_출구_온도: 'GT1 압축기 출구 온도',
  gt1_연료가스_유입량: 'GT1 연료가스 유입량',
  gt1_연료가스_온도: 'GT1 연료가스 온도',
  gt1_연료가스_유량계_온도: 'GT1 연료가스 유량계 온도',
  gt1_a_stage_cv_posn: 'GT1 A Stage CV POSN',
  gt1_b_stage_cv_posn: 'GT1 B Stage CV POSN',
  gt1_c_stage_cv_posn: 'GT1 C Stage CV POSN',
  gt1_pilot_stage_cv_posn: 'GT1 Pilot Stage CV POSN',
  gt1_d_stage_cv_posn: 'GT1 D Stage CV POSN',
  gt1_a_stage_fg_flow: 'GT1 A Stage FG FLOW',
  gt1_b_stage_fg_flow: 'GT1 B Stage FG FLOW',
  gt1_c_stage_fg_flow: 'GT1 C Stage FG FLOW',
  gt1_pilot_stage_fg_flow: 'GT1 Pilot Stage FG FLOW',
  gt1_d_stage_fg_flow: 'GT1 D Stage FG FLOW',
  gt1_otc: 'GT1 OTC',
  gt1_터빈_속도: 'GT1 터빈 속도',
  gt1_hco_shaft_posn: 'GT1 HCO SHAFT POSN',
  gt1_방빙장치_valve: 'GT1 방빙장치 Valve',
  gt1_정비_주기_eoh: 'GT1 정비 주기 (EOH)',
  gt1_배기구_온도: 'GT1 배기구 온도',
  gt1_배기구_압력: 'GT1 배기구 압력',
} as const;

export const DB_TO_MODEL_GT2_MAPPING = {
  gt2_발전량: 'GT2 발전량',
  gt2_압축기_입구_대기온도: 'GT2 압축기 입구 대기온도',
  gt2_압축기_입구_대기압: 'GT2 압축기 입구 대기압',
  gt2_압축기_입구_상대습도: 'GT2 압축기 입구 상대습도',
  gt2_igv_posn: 'GT2 IGV POSN',
  gt2_vgv1_posn: 'GT2 VGV1 POSN',
  gt2_vgv2_posn: 'GT2 VGV2 POSN',
  gt2_vgv3_posn: 'GT2 VGV3 POSN',
  gt2_헤파필터_차압: 'GT2 헤파필터 차압',
  gt2_압축기_후단_압력: 'GT2 압축기 후단 압력',
  gt2_압축기_출구_온도: 'GT2 압축기 출구 온도',
  gt2_연료가스_유입량: 'GT2 연료가스 유입량',
  gt2_연료가스_온도: 'GT2 연료가스 온도',
  gt2_연료가스_유량계_온도: 'GT2 연료가스 유량계 온도',
  gt2_a_stage_cv_posn: 'GT2 A Stage CV POSN',
  gt2_b_stage_cv_posn: 'GT2 B Stage CV POSN',
  gt2_c_stage_cv_posn: 'GT2 C Stage CV POSN',
  gt2_pilot_stage_cv_posn: 'GT2 Pilot Stage CV POSN',
  gt2_d_stage_cv_posn: 'GT2 D Stage CV POSN',
  gt2_a_stage_fg_flow: 'GT2 A Stage FG FLOW',
  gt2_b_stage_fg_flow: 'GT2 B Stage FG FLOW',
  gt2_c_stage_fg_flow: 'GT2 C Stage FG FLOW',
  gt2_pilot_stage_fg_flow: 'GT2 Pilot Stage FG FLOW',
  gt2_d_stage_fg_flow: 'GT2 D Stage FG FLOW',
  gt2_otc: 'GT2 OTC',
  gt2_터빈_속도: 'GT2 터빈 속도',
  gt2_hco_shaft_posn: 'GT2 HCO SHAFT POSN',
  gt2_방빙장치_valve: 'GT2 방빙장치 Valve',
  gt2_정비_주기_eoh: 'GT2 정비 주기 (EOH)',
  gt2_배기구_온도: 'GT2 배기구 온도',
  gt2_배기구_압력: 'GT2 배기구 압력',
} as const;

export const DB_TO_MODEL_ST_MAPPING = {
  st_발전량: 'ST 발전량',
  st_콘덴서_압력: 'ST 콘덴서 압력',
  st_콘덴서_입구_해수온도1: 'ST 콘덴서 입구 해수온도1',
  st_콘덴서_입구_해수온도2: 'ST 콘덴서 입구 해수온도2',
  st_콘덴서_출구_해수온도1: 'ST 콘덴서 출구 해수온도1',
  st_콘덴서_출구_해수온도2: 'ST 콘덴서 출구 해수온도2',
  hps_header_temp: 'ST HPS (Header) TEMP',
  hps_header_pres: 'ST HPS (Header) PRES',
  ips_header_temp: 'ST IPS (Header) TEMP',
  ips_header_pres: 'ST IPS (Header) PRES',
  lps_header_temp: 'ST LPS (Header) TEMP',
  lps_header_pres: 'ST LPS (Header) PRES',
  st_cv_posn_hps1: 'ST CV POSN HPS1',
  st_cv_posn_hps2: 'ST CV POSN HPS2',
  st_cv_posn_ips1: 'ST CV POSN IPS1',
  st_cv_posn_ips2: 'ST CV POSN IPS2',
  st_cv_posn_crh1: 'ST CV POSN CRH1',
  st_cv_posn_crh2: 'ST CV POSN CRH2',
  st_cv_posn_lps: 'ST CV POSN LPS',
} as const;

export const DB_TO_MODEL_HRSG_MAPPING = {
  hrsg1_hp_temp: 'HRSG1 HP TEMP',
  hrsg1_hp_pres: 'HRSG1 HP PRES',
  hrsg1_hp_flow: 'HRSG1 HP FLOW',
  hrsg1_crh_flow: 'HRSG1 CRH FLOW',
  hrsg1_hrh_temp: 'HRSG1 HRH TEMP',
  hrsg1_ip_temp: 'HRSG1 IP TEMP',
  hrsg1_ip_pres: 'HRSG1 IP PRES',
  hrsg1_ip_flow: 'HRSG1 IP FLOW',
  hrsg1_lp_temp: 'HRSG1 LP TEMP',
  hrsg1_lp_pres: 'HRSG1 LP PRES',
  hrsg1_lp_flow: 'HRSG1 LP FLOW',
  hrsg2_hp_temp: 'HRSG2 HP TEMP',
  hrsg2_hp_pres: 'HRSG2 HP PRES',
  hrsg2_hp_flow: 'HRSG2 HP FLOW',
  hrsg2_crh_flow: 'HRSG2 CRH FLOW',
  hrsg2_hrh_temp: 'HRSG2 HRH TEMP',
  hrsg2_ip_temp: 'HRSG2 IP TEMP',
  hrsg2_ip_pres: 'HRSG2 IP PRES',
  hrsg2_ip_flow: 'HRSG2 IP FLOW',
  hrsg2_lp_temp: 'HRSG2 LP TEMP',
  hrsg2_lp_pres: 'HRSG2 LP PRES',
  hrsg2_lp_flow: 'HRSG2 LP FLOW',
} as const;

export const SENSOR_COLUMN_MAPPING = {
  // TagCSV -> DB Column
  TagCSVToDB: {
    datetime: 'timestamp',
    ...TAG_TO_DB_COMMON_MAPPING,
    ...TAG_TO_DB_GT1_MAPPING,
    ...TAG_TO_DB_GT2_MAPPING,
    ...TAG_TO_DB_ST_MAPPING,
    ...TAG_TO_DB_HRSG_MAPPING,
  },
  // DB Column -> Model Column
  DBColumnToModelColumn: {
    timestamp: 'datetime',
    ...DB_TO_MODEL_COMMON_MAPPING,
    ...DB_TO_MODEL_GT1_MAPPING,
    ...DB_TO_MODEL_GT2_MAPPING,
    ...DB_TO_MODEL_ST_MAPPING,
    ...DB_TO_MODEL_HRSG_MAPPING,
  },
};

export const convertTagToDBColumn = (tag: string) => {
  return SENSOR_COLUMN_MAPPING.TagCSVToDB[tag];
};

export const convertDBColumnToModelColumn = (column: string) => {
  return SENSOR_COLUMN_MAPPING.DBColumnToModelColumn[column];
};
