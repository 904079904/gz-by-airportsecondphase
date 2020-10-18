/**
 Crate by wanjikun on 19/10/28.
*/
import "./TitleCom.scss";
export default class TitleCom extends Component{
 constructor(props) {
   super(props)
 }

 componentDidMount() {
 }

 render() {
    const {title} = this.props;
   return(
     <div className={'TitleCom'}>
        {title}
     </div>
   )
 }
}

TitleCom.propTypes = {
    title:PropTypes.string,
}
TitleCom.defaultProps = {
    title:'标题',
}