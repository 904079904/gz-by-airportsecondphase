/**
 Crate by wanjikun on 19/11/28.
*/
import axiosToken from "js/axiosToken";

import { TitleCom ,TerminalAreaPie} from "com/index";
import './BaggageAnalyze.scss'
export default class BaggageAnalyze extends Component{
 constructor(props) {
   super(props);
   this.state={
     seriesData:[]
   }
 }

 componentDidMount() {
    this.getData(this.props.terminal);
    this.setTimer();
 }

 componentWillReceiveProps(nextProps){
     let {terminal} = nextProps;
     
     this.timer && clearInterval(this.timer);
     this.getData(terminal);
     this.setTimer();

 }

 componentWillUnmount() {
    clearInterval(this.timer);
 }

 getData=(terminal)=>{
    axiosToken({ 
        method: 'get',
        url: realAddressUrlOne + `/screen/lugNormalityAnalyze/${terminal}`,
    }).then((result) => {
        const {code,result:{month:{delay,normal}} } = result.data;
        // console.log('本月行李正常性分析',result.data);
        if (code === 0) {
            let arr = [
                {
                    value:delay,
                    name:'延误'
                },
                {
                    value:normal,
                    name:'正常'
                }
            ]
            this.setState({
                seriesData:arr
            })
        }
    });
 }

 setTimer=()=>{
     this.timer = setInterval(()=>{
        this.getData(this.props.terminal);
     },globalTimer.baggageAnalyzeInterval)
 }

 render() {
   let {seriesData} = this.state;
   return(
    <div className={'BaggageAnalyze'}>
        <TitleCom title="每月行李正常性分析"></TitleCom>
        <div className="BaggageAnalyzeChartCon">
            <TerminalAreaPie seriesData={seriesData}></TerminalAreaPie>
        </div>    
    </div>
   )
 }
}

BaggageAnalyze.propTypes = {
    terminal:PropTypes.string.isRequired,
}
BaggageAnalyze.defaultProps = {}