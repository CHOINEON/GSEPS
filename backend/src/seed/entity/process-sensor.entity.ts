import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';
import { SensorColumn } from '../decorator/sensor-column.decorator';
@Entity()
export class ProcessEquipmentSensorModel extends BaseModel {
  @Index()
  @Column()
  timestamp: Date;

  //* 전체
  @SensorColumn({ comment: 'GS.U4.50CJA00DE100-XQ20' }) 발전량: number;
  @SensorColumn() 송전량: number;
  @SensorColumn() 백엽상_대기온도: number;
  @SensorColumn() 백엽상_대기압: number;
  @SensorColumn() 백엽상_상대습도: number;
  @SensorColumn({ comment: 'GS.U4.50CJA00DE100B-XQ01' })
  SETTING_MW_Gross: number;
  @SensorColumn({ comment: 'GS.U4.50CJA00DE100C-XQ01' })
  KPX_DEMAND_CC: number;
  @SensorColumn({ comment: 'GS.U4.50CJA00DE100C-XQ03' })
  DCS_TARGET: number;
  @SensorColumn({ comment: 'GS.U4.50EKG61CT001-XQ01' })
  NG_GOV_OUT_TEMP: number;

  //* GT1 관련 센서
  @SensorColumn({ comment: 'GS.U4.51MBY10CE901-XQ01' })
  GT1_발전량: number;

  @SensorColumn({ comment: 'GS.U4.51MBA11CT901-ZQ01' })
  GT1_압축기_입구_대기온도: number;

  @SensorColumn({ comment: 'GS.U4.51MBL05CP003S-XQ01' })
  GT1_압축기_입구_대기압: number;

  @SensorColumn({ comment: 'GS.U4.51MBL11FM001-ZQ01' })
  GT1_압축기_입구_상대습도: number;

  @SensorColumn({ comment: 'GS.U4.51MBA11CG901-ZQ11' })
  GT1_IGV_POSN: number;

  @SensorColumn({ comment: 'GS.U4.51MBA11CG911-ZQ11' })
  GT1_VGV1_POSN: number;

  @SensorColumn({ comment: 'GS.U4.51MBA11CG921-ZQ11' })
  GT1_VGV2_POSN: number;

  @SensorColumn({ comment: 'GS.U4.51MBA11CG931-ZQ11' })
  GT1_VGV3_POSN: number;

  @SensorColumn({ comment: 'GS.U4.51MBL10CP105-XQ01' })
  GT1_헤파필터_차압: number;

  @SensorColumn({ comment: 'GS.U4.51MBA12CP901-ZQ01A' })
  GT1_압축기_후단_압력: number;

  @SensorColumn({ comment: 'GS.U4.51MBA12CT901-ZQ01' })
  GT1_압축기_출구_온도: number;

  @SensorColumn({ comment: 'GS.U4.51EKG60FF001-XQ01' })
  GT1_연료가스_유입량: number;

  @SensorColumn({ comment: 'GS.U4.51EKG70CT001-XQ01' })
  GT1_연료가스_온도: number;

  @SensorColumn({ comment: 'GS.U4.51EKG60CT001-XQ01' })
  GT1_연료가스_유량계_온도: number;

  @SensorColumn({ comment: 'GS.U4.51MBP21AA151C-XQ01' })
  GT1_A_Stage_CV_POSN: number;

  @SensorColumn({ comment: 'GS.U4.51MBP22AA151C-XQ01' })
  GT1_B_Stage_CV_POSN: number;

  @SensorColumn({ comment: 'GS.U4.51MBP23AA151C-XQ01' })
  GT1_C_Stage_CV_POSN: number;

  @SensorColumn({ comment: 'GS.U4.51MBP31AA151C-XQ01' })
  GT1_Pilot_Stage_CV_POSN: number;

  @SensorColumn({ comment: 'GS.U4.51MBP32AA151C-XQ01' })
  GT1_D_Stage_CV_POSN: number;

  @SensorColumn({ comment: 'GS.U4.51MBP21FF901-ZQ01' })
  GT1_A_Stage_FG_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.51MBP22FF901-ZQ01' })
  GT1_B_Stage_FG_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.51MBP23FF901-ZQ01' })
  GT1_C_Stage_FG_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.51MBP31FF901-ZQ01' })
  GT1_Pilot_Stage_FG_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.51MBP32FF901-ZQ01' })
  GT1_D_Stage_FG_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.51MBR10FT901-ZQ01' })
  GT1_OTC: number;

  @SensorColumn({ comment: 'GS.U4.51MBY10CS901-ZQ11' })
  GT1_터빈_속도: number;

  @SensorColumn({ comment: 'GS.U4.51MBA10FG100-ZQ01' })
  GT1_HCO_SHAFT_POSN: number;

  @SensorColumn({ comment: 'GS.U4.51MBL15CG003-XQ01' })
  GT1_방빙장치_Valve: number;

  @SensorColumn({ comment: 'GS.U4.51MBY10EP801-XQ01' })
  GT1_정비_주기_EOH: number;

  @SensorColumn({ comment: 'GS.U4.51MBR10CT900-ZQ01' })
  GT1_배기구_온도: number;

  @SensorColumn({ comment: 'GS.U4.51HBK10CP001-XQ01' })
  GT1_배기구_압력: number;

  //* GT2 관련 센서
  @SensorColumn({ comment: 'GS.U4.52MBY10CE901-XQ01' })
  GT2_발전량: number;

  @SensorColumn({ comment: 'GS.U4.52MBA11CT901-ZQ01' })
  GT2_압축기_입구_대기온도: number;

  @SensorColumn({ comment: 'GS.U4.52MBL05CP003S-XQ01' })
  GT2_압축기_입구_대기압: number;

  @SensorColumn({ comment: 'GS.U4.52MBL11FM001-ZQ01' })
  GT2_압축기_입구_상대습도: number;

  @SensorColumn({ comment: 'GS.U4.52MBA11CG901-ZQ11' })
  GT2_IGV_POSN: number;

  @SensorColumn({ comment: 'GS.U4.52MBA11CG911-ZQ11' })
  GT2_VGV1_POSN: number;

  @SensorColumn({ comment: 'GS.U4.52MBA11CG921-ZQ11' })
  GT2_VGV2_POSN: number;

  @SensorColumn({ comment: 'GS.U4.52MBA11CG931-ZQ11' })
  GT2_VGV3_POSN: number;

  @SensorColumn({ comment: 'GS.U4.52MBL10CP105-XQ01' })
  GT2_헤파필터_차압: number;

  @SensorColumn({ comment: 'GS.U4.52MBA12CP901-ZQ01A' })
  GT2_압축기_후단_압력: number;

  @SensorColumn({ comment: 'GS.U4.52MBA12CT901-ZQ01' })
  GT2_압축기_출구_온도: number;

  @SensorColumn({ comment: 'GS.U4.52EKG60FF001-XQ01' })
  GT2_연료가스_유입량: number;

  @SensorColumn({ comment: 'GS.U4.52EKG70CT001-XQ01' })
  GT2_연료가스_온도: number;

  @SensorColumn({ comment: 'GS.U4.52EKG60CT001-XQ01' })
  GT2_연료가스_유량계_온도: number;

  @SensorColumn({ comment: 'GS.U4.52MBP21AA151C-XQ01' })
  GT2_A_Stage_CV_POSN: number;

  @SensorColumn({ comment: 'GS.U4.52MBP22AA151C-XQ01' })
  GT2_B_Stage_CV_POSN: number;

  @SensorColumn({ comment: 'GS.U4.52MBP23AA151C-XQ01' })
  GT2_C_Stage_CV_POSN: number;

  @SensorColumn({ comment: 'GS.U4.52MBP31AA151C-XQ01' })
  GT2_Pilot_Stage_CV_POSN: number;

  @SensorColumn({ comment: 'GS.U4.52MBP32AA151C-XQ01' })
  GT2_D_Stage_CV_POSN: number;

  @SensorColumn({ comment: 'GS.U4.52MBP21FF901-ZQ01' })
  GT2_A_Stage_FG_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.52MBP22FF901-ZQ01' })
  GT2_B_Stage_FG_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.52MBP23FF901-ZQ01' })
  GT2_C_Stage_FG_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.52MBP31FF901-ZQ01' })
  GT2_Pilot_Stage_FG_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.52MBP32FF901-ZQ01' })
  GT2_D_Stage_FG_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.52MBR10FT901-ZQ01' })
  GT2_OTC: number;

  @SensorColumn({ comment: 'GS.U4.52MBY10CS901-ZQ11' })
  GT2_터빈_속도: number;

  @SensorColumn({ comment: 'GS.U4.52MBA10FG100-ZQ01' })
  GT2_HCO_SHAFT_POSN: number;

  @SensorColumn({ comment: 'GS.U4.52MBL15CG003-XQ01' })
  GT2_방빙장치_Valve: number;

  @SensorColumn({ comment: 'GS.U4.52MBY10EP801-XQ01' })
  GT2_정비_주기_EOH: number;

  @SensorColumn({ comment: 'GS.U4.52MBR10CT900-ZQ01' })
  GT2_배기구_온도: number;

  @SensorColumn({ comment: 'GS.U4.52HBK10CP001-XQ01' })
  GT2_배기구_압력: number;

  //* ST 관련 센서
  @SensorColumn({ comment: 'GS.U4.50MKA01CE903N-XQ01' })
  ST_발전량: number;

  @SensorColumn({ comment: 'GS.U4.50MAG10FP002-XQ01' })
  ST_콘덴서_압력: number;

  @SensorColumn({ comment: 'GS.U4.50PAB21CT001-XQ01' })
  ST_콘덴서_입구_해수온도1: number;

  @SensorColumn({ comment: 'GS.U4.50PAB22CT001-XQ01' })
  ST_콘덴서_입구_해수온도2: number;

  @SensorColumn({ comment: 'GS.U4.50PAB31CT001-XQ01' })
  ST_콘덴서_출구_해수온도1: number;

  @SensorColumn({ comment: 'GS.U4.50PAB32CT001-XQ01' })
  ST_콘덴서_출구_해수온도2: number;

  //* HPS, IPS, LPS 관련 센서
  @SensorColumn({ comment: 'GS.U4.50LBA20FT007A-XQ01' })
  HPS_Header_TEMP: number;

  @SensorColumn({ comment: 'GS.U4.50LBA20FP004-XQ01' })
  HPS_Header_PRES: number;

  @SensorColumn({ comment: 'GS.U4.50LBB50FT007A-XQ01' })
  IPS_Header_TEMP: number;

  @SensorColumn({ comment: 'GS.U4.50LBB50FP004-XQ01' })
  IPS_Header_PRES: number;

  @SensorColumn({ comment: 'GS.U4.50LBA90CT001A-XQ01' })
  LPS_Header_TEMP: number;

  @SensorColumn({ comment: 'GS.U4.50LBA90FP004-XQ01' })
  LPS_Header_PRES: number;

  //* ST CV POSN 관련
  @SensorColumn({ comment: 'GS.U4.50MAA12FG151-XQ01' })
  ST_CV_POSN_HPS1: number;

  @SensorColumn({ comment: 'GS.U4.50MAA22FG151-XQ01' })
  ST_CV_POSN_HPS2: number;

  @SensorColumn({ comment: 'GS.U4.50MAB12FG151-XQ01' })
  ST_CV_POSN_IPS1: number;

  @SensorColumn({ comment: 'GS.U4.50MAB22FG151-XQ01' })
  ST_CV_POSN_IPS2: number;

  @SensorColumn({ comment: 'GS.U4.51LBC45CG101-XQ01' })
  ST_CV_POSN_CRH1: number;

  @SensorColumn({ comment: 'GS.U4.52LBC45CG101-XQ01' })
  ST_CV_POSN_CRH2: number;

  @SensorColumn({ comment: 'GS.U4.50MAC46FG151-XQ01' })
  ST_CV_POSN_LPS: number;

  //* HRSG1 관련 센서
  @SensorColumn({ comment: 'GS.U4.51LBA10CT007-XQ01' })
  HRSG1_HP_TEMP: number;

  @SensorColumn({ comment: 'GS.U4.51LBA10CP001-XQ01' })
  HRSG1_HP_PRES: number;

  @SensorColumn({ comment: 'GS.U4.51LBA10CF901-ZQ01' })
  HRSG1_HP_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.51LBC45CF001- ZQ01' })
  HRSG1_CRH_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.51LBB45CT001-XQ01' })
  HRSG1_HRH_TEMP: number;

  @SensorColumn({ comment: 'GS.U4.51LBA50CT001-XQ01' })
  HRSG1_IP_TEMP: number;

  @SensorColumn({ comment: 'GS.U4.51LBA50CP001-XQ01' })
  HRSG1_IP_PRES: number;

  @SensorColumn({ comment: 'GS.U4.51LBA50CF901-ZQ01' })
  HRSG1_IP_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.51LBA80CT001-XQ01' })
  HRSG1_LP_TEMP: number;

  @SensorColumn({ comment: 'GS.U4.51LBA80CP001-XQ01' })
  HRSG1_LP_PRES: number;

  @SensorColumn({ comment: 'GS.U4.51LBA80CF901-ZQ01' })
  HRSG1_LP_FLOW: number;

  //* HRSG2 관련 센서
  @SensorColumn({ comment: 'GS.U4.52LBA10CT007-XQ01' })
  HRSG2_HP_TEMP: number;

  @SensorColumn({ comment: 'GS.U4.52LBA10CP001-XQ01' })
  HRSG2_HP_PRES: number;

  @SensorColumn({ comment: 'GS.U4.52LBA10CF901-ZQ01' })
  HRSG2_HP_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.52LBC45CF001- ZQ01' })
  HRSG2_CRH_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.52LBB45CT001-XQ01' })
  HRSG2_HRH_TEMP: number;

  @SensorColumn({ comment: 'GS.U4.52LBA50CT001-XQ01' })
  HRSG2_IP_TEMP: number;

  @SensorColumn({ comment: 'GS.U4.52LBA50CP001-XQ01' })
  HRSG2_IP_PRES: number;

  @SensorColumn({ comment: 'GS.U4.52LBA50CF901-ZQ01' })
  HRSG2_IP_FLOW: number;

  @SensorColumn({ comment: 'GS.U4.52LBA80CT001-XQ01' })
  HRSG2_LP_TEMP: number;

  @SensorColumn({ comment: 'GS.U4.52LBA80CP001-XQ01' })
  HRSG2_LP_PRES: number;

  @SensorColumn({ comment: 'GS.U4.52LBA80CF901-ZQ01' })
  HRSG2_LP_FLOW: number;
}
