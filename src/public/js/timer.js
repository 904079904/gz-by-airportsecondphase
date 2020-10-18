var globalTimer = {
  filghtDelay: 30000, //大面积航延
  arrivalTotalDelay:30000, //进出港每小时放行概览
  closeDoorDelay:30000, //关舱门等待时长实时分析
  fltDelaySortieCountDelay:30000, //延误架次实时分析
  leaveOverstockedDelay:30000, //出港积压
  runwayHourlySortieDelay:30000, //跑道今日繁忙程度分析
  weatherDetailDelay:10000, //国内天气弹框
  filghtDelay: 30000,// 大面积航延实时分析 
  positionTotalityByBridgeRate:30000,//今日靠桥率
  positionUsedInfo: 30000,//机位空闲情况实时分析
  integralSituation:30000,// 机场整体情况
  monthYearPassRate:30000, // 航班放行率
  safeguardExecRate:30000,// 今日目标保障完成时刻的执行率分析
  corridorReleaseRate:30000,// 走廊口放行率
  psgHourlyDistribution: 30000,//旅客数量小时分布
  lugCheckHourlyCount: 30000,// 行李分拣系统每小时处理行李总数
  currentGateUseCount: 30000,//正在使用的登机口数量实时统计
  todayImportantCargo: 30000,//今日重点货物分析
  notificationTimes:'6s',//消息通告动画持续时间
  notificationDelays:2000,//消息通告动画之间间隔
  // 消息通知新配置
  // 每一个阶段的动画时间
  infoTime:'1.5s', 
  // 每一阶段动画的间隔
  infoInterval: 2000,
  // 本次请求无数据，延迟一段时间再请求
  infoNodataInterval: 2000,
  psgEnterOutTotalNum:30000,//今日进出港游客总量
  baggageAnalyzeInterval:30000,//行李正常性分析
  boardingGateHourlyCountInterval:30000,//登机口的使用数量小时分布
  todayCargoOverstock: 30000, // 今日货物积压分析
  BaggageTurntableUsedInterval:30000,//行李转盘使用数量小时分布
  BoardingBridgeStatusInterval:30000,//登机桥实时运行状态分析
  eachlugused:30000, // 各行李转盘使用航班数量实时分析
  CarPoolFutrueHourFlowInterval:30000,//未来一小时流量情况
  CarPoolLastHourFlowInterval:300000,//过去一小时流量情况
  secCheckAnalysis: 30000, // 安检效能分析
  dispatchParkCapacity:30000,//出租车调度
  analysisOfFreightInterval:30000,//货运分析
  LadderControlEquipmentInterval:30000,//梯控设备
  tokenTimer:3600000,//token获取
}