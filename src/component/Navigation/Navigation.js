/**
 Crate by jgmiu on 19/10/31.
*/
import {withRouter} from 'react-router-dom'
import './Navigation.scss'
class Navigation extends Component{
  constructor(props) {
    super(props)
    this.state = {
      btnInfo: [
        {name: '飞行区', className: 'navLeft', select: true,loadComplete: true},
        {name: '航站区', className: 'navCenter noselect', select: false, loadComplete:false},
        {name: '公共区', className: 'navRight noselect', select: false,loadComplete: true},
      ]
    }
  }

  componentWillMount(){
    this.setNavActive();
    
  }

  setNavActive=()=>{
    let name = '',type = this.props.match.params.type;
    switch (type) {
      case 'fly':
        name = '飞行区';
        break;
      case 'terminal':
        name = '航站区';
        break;
      case 'common':
        name = '公共区';
        break;
      default:
        break;
    }
    if (name !== '') {
      this.handleClickBtn(name,false)
    }
  }

  handleClickBtn(name,loadComplete) {
    if(!loadComplete){
      return;
    }
    this.setState({
      btnInfo: this.state.btnInfo.map((btn) => {
        btn.name === name ? btn.select = true :  btn.select = false;
        name !== '航站区' && btn.name === '航站区' ? btn.loadComplete = false : btn.loadComplete = true;
        return btn
      })
    },()=>{
      if (name === '航站区') {
        byjc_cq.call(monitorType, "byjc_cd", { area: 'LS_TA2' });
        byjc_cq.call(monitorType, "byjc_cq", { area: 'LS_TA2' });
      }else if(name === '公共区'){
        byjc_cq.call(monitorType, "byjc_cq", { area: 'LS_PA' });
      }else{
        byjc_cq.call(monitorType, "byjc_cd", { area: 'LS_FA' });
        byjc_cq.call(monitorType, "byjc_cq", { area: 'LS_FA' }); //向servernode1发送类型为12的请求 消息类型 1-1024
      }
    })
  }

  componentDidMount() {
    let that = this;
    byjc_cq.on(monitorType, function (msg) {
      // console.log('飞行区加载完毕可以切换航站区',msg.data.area)
      if (msg.data.area && msg.data.area === "load_complete") {
        that.setState({
          btnInfo: that.state.btnInfo.map((btn) => {
            btn.loadComplete = true;
            return btn
          })
        })
      }
    });
  }

  render() {
    let {btnInfo} = this.state;
    console.log();
    
    return(
      <div className={'Navigation'}>
        {
          btnInfo.map((btn,index) => (
            <div onClick={this.handleClickBtn.bind(this,btn.name,btn.loadComplete)} key={index} className={(()=>(btn.select?`${btn.className} select`:`${btn.className}`))()}>
              <span className={btn.loadComplete ? 'text' : 'enable text'}>{btn.name}</span>
            </div>
          ))
        }
      </div>
    )
  }
}

Navigation.propTypes = {}
Navigation.defaultProps = {}

export default withRouter(Navigation);