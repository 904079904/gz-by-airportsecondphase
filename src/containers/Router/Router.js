/**
 * Created by xiaohe on 2018/5/8.
 */

import {HashRouter, Route, NavLink, Link, Switch} from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import {Nav,Main,TitleCon} from 'con/index'
import md5 from 'js-md5'

class Router extends Component {
    constructor(props, context) {
        super(props, context);
        this.timer = null
    }

    componentWillMount(){
        this.getToken();
        this.timer = setInterval(()=>{
            this.getToken()
        },globalTimer.tokenTimer)
    }

    getToken=()=>{
        axios({
            method: 'post',
			url: realAddressUrlOne + '/sys/login',
			data:{
				username:'haiyun',
				password:md5('haiyun')
			}
        }).then((res) => {
            if(res.data.code === 200){
				let token = res.data.result.token;
				localStorage.setItem('token', token);
            }else{
                console.log('登录接口获取token失败')
            }
        });	
    }

    componentWillUnmount() {
        // 组件卸载清除定时器
        clearInterval(this.timer)
    }

    render() {
        return (
            <HashRouter>
                    <Switch>
                        <Route path="/nav" component={Nav}/>
                        <Route path="/main" component={Main}/>
                        <Route path="/titleCon" component={TitleCon} />
                        <Route path="/" component={Nav}/>
                    </Switch>
            </HashRouter>
        )
    }
}
Router.contextTypes = {
    store: PropTypes.object
}
export default hot(Router);
