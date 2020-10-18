
/*
 * 这个文档为了设置接口，真实接口和mock接口
 * true开启mock接口 false关闭mock接口
 * InterfaceSwitch全局启用mock
 * InterfaceList，当全局mock开启时，每个接口是否使用mock或是真实
 * */

export let InterfaceSwitch;
if (NODE_ENV === "pro") {
  InterfaceSwitch = mock;
} else {
  InterfaceSwitch = true;
}
export const InterfaceList = {
  TestMockGet:true,
    TestMockPost:true,
    TestMockTemplate:true,
    GetTreeData:true,
    /**缪佳耕 开始 */
    SafeguardExecRate:true,
    HourReleaseSituation:true,
    CorridorReleaseRate:true,
    LeaveOverstocked:true,
    WeatherList:true,
    WeatherDetail:true,
    RunwayHourlySortie:true,
    EachLugUsedFlightNum:true,
    /**缪佳耕 结束 */

    /* 张琴开始 */
    integralSituation:true,
    PassRate:true,
    Security:true,
    FltDelaySortieCount:true,
    CloseDoorWaitCount:true,
    FltLargeDelay:true,
    CurrentGateUseCount:true,
    LugCheckHourlyCount:true,
    PsgHourlyDistribution:true,
    TodayImportantCargo:true,
    /* 张琴结束 */
    
    //万吉坤开始
    InwardHour:true,
    OutwardHour:true,
    LeaveFltRouteList:true,
    PositionTotalityByBridgeRate:true,
    positionAirlineByBridgeRate:true,
    PositionUsedInfo:true,
    PositionChange:true,
    positionConflict:true,
    fltEnterLeaveSpeed:true,
    BaggageAnalyze:true,
    GetBoardingGateHourlyCount:true,
    BaggageTurntableUsed:true,
    BoardingBridgeRunStatus:true,
    GetElevatorRunStatus:true,
    GetCarPoolLastHourFlow:true,
    GetCarPoolFutrueHourFlow:true,
    DispatchParkCapacity:true,
    CarPoolFlowAmount:true,
    BaggageCheckMachine:true,
    TodayCargoAnalyze:true,
    TodayCargoMap:true,
    // BaggageCheckMachineChart:true,
    BaggageCheckMachineChartCopy:true,
    WarnLevel:true,
    WorkLogInfo:true,
    Login:true,
    //万吉坤结束

    /* 昝家威开始 */
    psgEnterOutTotalNum:true,
    todayCargoOverstock:true,
    psgSecCheckAnalysis:true,
    /* 昝家威结束 */
};
