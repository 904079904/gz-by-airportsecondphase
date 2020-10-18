/**
 Crate by wanjikun on 19/10/28.
*/
import axiosToken from "js/axiosToken";

import { PiechartCom, TitleCom } from "com/index";
import './CloseDoorWaitCount.scss'
export default class CloseDoorWaitCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seriesData:[],
            color:['#06edb2','#02c6f6','#f8ff44','#feba00'],
        }
        this.timer = null;
    }

    componentDidMount() {
        this.getData();
        this.setTimer();
    }

    componentWillUnmount(){
        this.timer && clearInterval(this.timer)
    }

    getData = () => {
        axiosToken({ //关舱门等待时长
            method: 'get',
            url: realAddressUrlOne + `/screen/closeDoorWaitCount`,
        }).then((res) => {
            // console.log('关舱门等待时长', res);
            const { code, result } = res.data;
            if (code === 0) {
                const { oneHour,thanFour,thanOneHour,thanTwoHour } = result;
                const data = [
                    {
                        value: oneHour,
                        name: '0-1时'
                    },
                    {
                        value: thanOneHour,
                        name: '1-2时'
                    },
                    {
                        value: thanTwoHour,
                        name: '2-4时'
                    },
                    {
                        value: thanFour,
                        name: '4时以上'
                    }
                ]
                this.setState({
                    seriesData:data
                })
            }

        });
    }

    setTimer=()=>{
        this.timer = setInterval(()=>{
            this.getData()
        },globalTimer.closeDoorDelay)
    }


    render() {
        const {seriesData,color} = this.state;
        return (
            <div className={'CloseDoorWaitCount'}>
                <TitleCom title="关舱门等待时长实时分析"></TitleCom>
                <div className="CloseDoorWaitCountBox">
                    <PiechartCom seriesData={seriesData} color={color}></PiechartCom>
                </div>
            </div>
        )
    }
}

CloseDoorWaitCount.propTypes = {}
CloseDoorWaitCount.defaultProps = {}