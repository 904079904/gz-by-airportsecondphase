/**
 * 本处是说明：
 * import进行组件导入，export组件同名导出
 * import 组件名称 from '组件路径'
 * export{
 * 组件名称
 * }
 * 每一个组件名称最后必须以,结尾
 */
import * as TestMockGet from './TestMockGet/mock.TestMockGet';
import * as TestMockPost from './TestMockPost/mock.TestMockPost';
import * as TestMockTemplate from './TestMockTemplate/mock.TestMockTemplate';
import * as GetTreeData from './GetTreeData/mock.GetTreeData';
/**缪佳耕 开始 */
import * as SafeguardExecRate from './SafeguardExecRate/mock.SafeguardExecRate'
import * as HourReleaseSituation from './HourReleaseSituation/mock.HourReleaseSituation'
import * as CorridorReleaseRate from './CorridorReleaseRate/mock.CorridorReleaseRate'
import * as LeaveOverstocked from './LeaveOverstocked/mock.LeaveOverstocked'
import * as WeatherList from './WeatherList/mock.WeatherList'
import * as WeatherDetail from './WeatherDetail/mock.WeatherDetail'
import * as RunwayHourlySortie from './RunwayHourlySortie/mock.RunwayHourlySortie'
import * as EachLugUsedFlightNum from './EachLugUsedFlightNum/mock.EachLugUsedFlightNum'
/**缪佳耕 结束 */
/*张琴开始*/
import * as integralSituation from './IntegralSituation/mock.IntegralSituation.js';
import * as PassRate from './PassRate/mock.PassRate.js';
import * as Security from './Security/mock.Security.js';
import * as FltDelaySortieCount from './FltDelaySortieCount/mock.FltDelaySortieCount.js';
import * as CloseDoorWaitCount from './CloseDoorWaitCount/mock.CloseDoorWaitCount.js';
import * as FltLargeDelay from './FltLargeDelay/mock.FltLargeDelay.js';
import * as CurrentGateUseCount from './CurrentGateUseCount/mock.CurrentGateUseCount.js';
import * as LugCheckHourlyCount from './LugCheckHourlyCount/mock.LugCheckHourlyCount.js';
import * as PsgHourlyDistribution from './PsgHourlyDistribution/mock.PsgHourlyDistribution.js';
import * as TodayImportantCargo from './TodayImportantCargo/mock.TodayImportantCargo.js';
/*张琴结束*/

//万吉坤开始
import * as InwardHour from './InwardHour/mock.InwardHour';
import * as OutwardHour from './OutwardHour/mock.OutwardHour';
import * as LeaveFltRouteList from './LeaveFltRouteList/mock.LeaveFltRouteList';
import * as PositionTotalityByBridgeRate from './PositionTotalityByBridgeRate/mock.PositionTotalityByBridgeRate';
import * as positionAirlineByBridgeRate from './PositionAirlineByBridgeRate/mock.positionAirlineByBridgeRate';
import * as PositionUsedInfo from './PositionUsedInfo/mock.PositionUsedInfo';
import * as PositionChange from './PositionChange/mock.PositionChange';
import * as positionConflict from './PositionConflict/mock.positionConflict';
import * as fltEnterLeaveSpeed from "./FltEnterLeaveSpeed/mock.FltEnterLeaveSpeed";
import * as BaggageAnalyze from "./BaggageAnalyze/mock.BaggageAnalyze";
import * as GetBoardingGateHourlyCount from "./GetBoardingGateHourlyCount/mock.GetBoardingGateHourlyCount";
import * as BaggageTurntableUsed from "./BaggageTurntableUsed/mock.BaggageTurntableUsed";
import * as BoardingBridgeRunStatus from "./BoardingBridgeRunStatus/mock.BoardingBridgeRunStatus";
import * as GetElevatorRunStatus from "./GetElevatorRunStatus/mock.GetElevatorRunStatus";
import * as GetCarPoolFutrueHourFlow from "./GetCarPoolFutrueHourFlow/mock.GetCarPoolFutrueHourFlow";
import * as GetCarPoolLastHourFlow from "./GetCarPoolLastHourFlow/mock.GetCarPoolLastHourFlow";
import * as CarPoolFlowAmount from "./CarPoolFlowAmount/mock.CarPoolFlowAmount";
import * as DispatchParkCapacity from "./DispatchParkCapacity/mock.DispatchParkCapacity";
import * as BaggageCheckMachine from "./BaggageCheckMachine/mock.BaggageCheckMachine";
import * as TodayCargoAnalyze from "./TodayCargoAnalyze/mock.TodayCargoAnalyze";
import * as TodayCargoMap from "./TodayCargoMap/mock.TodayCargoMap";
import * as BaggageCheckMachineChart from "./BaggageCheckMachineChart/mock.BaggageCheckMachineChart";
import * as BaggageCheckMachineChartCopy from "./BaggageCheckMachineChart/mock.BaggageCheckMachineChartCopy";
import * as WarnLevel from "./WarnLevel/mock.WarnLevel";
import * as WorkLogInfo from "./WorkLogInfo/mock.workLogInfo";
import * as Login from "./Login/mock.Login";

//万吉坤结束
//昝家威开始
import * as psgEnterOutTotalNum from "./psgEnterOutTotalNum/mock.psgEnterOutTotalNum";
import * as todayCargoOverstock from "./todayCargoOverstock/mock.todayCargoOverstock";
import * as psgSecCheckAnalysis from "./psgSecCheckAnalysis/mock.psgSecCheckAnalysis";
//昝家威结束
export {
    TestMockGet,
    TestMockPost,
    TestMockTemplate,
    GetTreeData,
    /**缪佳耕 开始 */
    SafeguardExecRate,
    HourReleaseSituation,
    CorridorReleaseRate,
    LeaveOverstocked,
    WeatherList,
    WeatherDetail,
    RunwayHourlySortie,
    EachLugUsedFlightNum,
    /**缪佳耕 结束 */

    /* 张琴开始 */
    integralSituation,
    PassRate,
    Security,
    FltDelaySortieCount,
    CloseDoorWaitCount,
    FltLargeDelay,
    CurrentGateUseCount,
    LugCheckHourlyCount,
    PsgHourlyDistribution,
    TodayImportantCargo,
    /* 张琴结束 */
    
    //万吉坤开始
    InwardHour,
    OutwardHour,
    LeaveFltRouteList,
    PositionTotalityByBridgeRate,
    positionAirlineByBridgeRate,
    PositionUsedInfo,
    PositionChange,
    positionConflict,
    fltEnterLeaveSpeed,
    BaggageAnalyze,
    GetBoardingGateHourlyCount,
    BaggageTurntableUsed,
    BoardingBridgeRunStatus,
    GetElevatorRunStatus,
    GetCarPoolLastHourFlow,
    GetCarPoolFutrueHourFlow,
    DispatchParkCapacity,
    CarPoolFlowAmount,
    BaggageCheckMachine,
    TodayCargoAnalyze,
    TodayCargoMap,
    // BaggageCheckMachineChart,
    BaggageCheckMachineChartCopy,
    WarnLevel,
    WorkLogInfo,
    Login,
    //万吉坤结束

    /* 昝家威开始 */
    psgEnterOutTotalNum,
    todayCargoOverstock,
    psgSecCheckAnalysis,
    /* 昝家威结束 */
}
