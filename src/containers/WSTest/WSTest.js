/**
 Crate by wanjikun on 19/12/11.
*/
export default class WSTest extends Component{
 constructor(props) {
   super(props)
 }

 componentDidMount() {
 }
 ivk=(e)=>{
    if (e == 0) {
        byjc_cq.call(monitorType, "byjc_cq", { area: 'LS_FA' }); //向servernode1发送类型为12的请求 消息类型 1-1024

    } else if (e == 1) {
        byjc_cq.call(monitorType, "byjc_cq", { area: 'LS_PA' }); //向servernode1发送类型为12的请求 消息类型 1-1024

    } else if (e == 2) {
        byjc_cq.call(monitorType, "byjc_cq", { area: 'LS_TA1' }); //向servernode1发送类型为12的请求 消息类型 1-1024

    }else{
        byjc_cq.call(monitorType, "byjc_cq", { area: 'LS_TA2' }); //向servernode1发送类型为12的请求 消息类型 1-1024

    }
 }
 render() {
   return(
     <div className={'WSTest'}>
        <button onClick={()=>this.ivk(0)}>飞行区</button>
        <button onClick={()=>this.ivk(1)}>公共区</button>
        <button onClick={()=>this.ivk(2)}>航站区T1</button>
        <button onClick={()=>this.ivk(3)}>航站区T2</button>
    </div>
   )
 }
}

WSTest.propTypes = {}
WSTest.defaultProps = {}