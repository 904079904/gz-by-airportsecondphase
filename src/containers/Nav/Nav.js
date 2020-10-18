/**
 * Created by xj on 2018/12/12.
 */
import {NavLink} from 'react-router-dom';
import './Nav.scss'

export default class Nav extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className={"Layer"}>
                <div className={"Nav"}>
                    <ul style={{display: 'flex'}}>
                        <div>
                            <li><NavLink to={"/main/LeftCon/fly"}>LeftCon(飞行区)</NavLink></li>
                            <li><NavLink to={"/main/MiddleCon/fly"}>MiddleCon(飞行区)</NavLink></li>
                            <li><NavLink to={"/main/RightCon/fly"}>RightCon(飞行区)</NavLink></li>
                        </div>
                        <div>
                            <li><NavLink to={"/main/LeftCon/terminal2"}>LeftCon(航站区)</NavLink></li>
                            <li><NavLink to={"/main/MiddleCon/terminal"}>MiddleCon(航站区)</NavLink></li>
                            <li><NavLink to={"/main/RightCon/terminal2"}>RightCon(航站区)</NavLink></li>
                        </div>
                        <div>
                            <li><NavLink to={"/main/LeftCon/common"}>LeftCon(公共区)</NavLink></li>
                            <li><NavLink to={"/main/MiddleCon/common"}>MiddleCon(公共区)</NavLink></li>
                            <li><NavLink to={"/main/RightCon/common"}>RightCon(公共区)</NavLink></li>
                        </div>
                        <div>
                            {/* <li><NavLink to={"/main/wsTest"}>ws测试</NavLink></li> */}
                            <li><NavLink to={"/titleCon"}>条屏</NavLink></li>
                            
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}