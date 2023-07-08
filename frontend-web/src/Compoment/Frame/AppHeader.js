import { useState, useEffect, Component } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

class AppHeader extends Component {

    
    constructor(props) {
        super(props);
        this.user = {username:'', fullname:''}; 
        this.Init()
    }

    Init(){
        var info = JSON.parse(localStorage.getItem("logininfo"));
        console.log(info);
        if (info != null){
            this.user.fullname=info.fullname
            console.log(info.username);
        }
    }
   
    
    render() {
       
        return (
            <header>
                <div className="App-Header">
                    <Link className="nav-item" to={'/'}>Home</Link>
                    <Link className="nav-item" to={'/info'}>InFo</Link>
                    <span style={{ marginLeft: '50%' }}>Welcome <b>{this.user.fullname}</b></span>
                    { !this.user.fullname ? <Link className="nav-item" style={{ float: 'right' }} to={'/login'}>Login</Link> :<Link className="nav-item" style={{ float: 'right' }} to={'/logout'}>Logout</Link>  }
                    
                    
                </div>
            </header>
        );
    }


}

export default AppHeader;
