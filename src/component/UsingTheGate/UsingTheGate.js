import './UsingTheGate.scss';
import {TitleCom,UsingTheGateBar} from 'com/index';
import axiosToken from "js/axiosToken";

export default class UsingTheGate extends Component {
    constructor(props){
        super(props);
        this.state = {
            farGate: 0,
            farRate: 0,
            nearGate: 0,
            nearRate: 0,
        }
    }
    componentDidMount(){
        this.getData(this.props.terminal);
        this.reloadID = setInterval(() => {
            this.getData(this.props.terminal);
        },globalTimer.currentGateUseCount)
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.terminal !== nextProps.terminal) {
            this.reloadID && clearInterval(this.reloadID);
            this.getData(nextProps.terminal);
            this.reloadID = setInterval(() => {
                this.getData(nextProps.terminal);
            }, globalTimer.currentGateUseCount)
        }
    }
    componentWillUnmount(){
        clearInterval(this.reloadID);
    }
    getData(terminal){// 获取数据
        axiosToken({
            method: 'get',
            url: realAddressUrlOne + '/screen/currentGateUseCount/'+terminal,
        }).then((res) => {
            if(res.data.code === 0){
                let result = res.data.result;
                let sum = result.far+result.near;// 机位总数
                this.setState({
                    farGate: result.far,//远机位数
                    farRate: (result.far/sum*100).toFixed(2),//远机位占比
                    nearGate: result.near,//近机位数
                    nearRate: (result.near/sum*100).toFixed(2)//近机位占比
                })
            }
        });
    }
    render(){
        let {farGate,farRate,nearGate,nearRate} = this.state
        return(
            <div className="UsingTheGateCom">
                <TitleCom title={'正在使用的登机口数量实时统计'}></TitleCom>
                <div className="chartCom">
                    <p>远机位：<span>{farGate}</span></p>
                    <UsingTheGateBar id={'FarBar'} farRate={farRate} />
                    <p className="near">近机位：<span>{nearGate}</span></p>
                    <UsingTheGateBar id={'NearBar'} nearRate={nearRate} />
                </div>
                
            </div>
        )
    }
}