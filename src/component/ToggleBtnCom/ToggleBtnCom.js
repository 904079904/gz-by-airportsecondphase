/**
 Crate by wanjikun on 19/10/28.
*/
import "./ToggleBtnCom.scss";
export default class ToggleBtnCom extends Component{
 constructor(props) {
   super(props);
   this.state = {
       btnActive:this.props.activeIndex
   }
 }

 componentDidMount() {
    
 }

btnClick=(type)=>{
    // const {onBtnClick} = this.props;
    // const ind = type === 'left' ? 0 : 1;
    // this.setState({
    //     btnActive:ind,
    // })
    // onBtnClick(type);
}
 render() {
    const {leftTxt,rightTxt,activeIndex} = this.props;
    // const {btnActive} = this.state;

   return(
     <div className={'ToggleBtnCom'}>
        <div className={activeIndex === 1 ? "btn" : "btn active"} onClick={()=>this.btnClick('left')}>
            {leftTxt}
        </div>
        <div className={activeIndex === 0 ? "btn" : "btn active"} onClick={()=>this.btnClick('right')}>
            {rightTxt}
        </div>
     </div>
   )
 }
}

ToggleBtnCom.propTypes = {
    activeIndex:PropTypes.number,
    leftTxt:PropTypes.string.isRequired,
    rightTxt:PropTypes.string.isRequired,
    // onBtnClick:PropTypes.func.isRequired,
}
ToggleBtnCom.defaultProps = {
    activeIndex:0,
}