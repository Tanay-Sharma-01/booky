import React , {useState , useContext} from 'react'
import {GoogleLogin , GoogleLogout} from 'react-google-login';
import {Link} from "react-router-dom";
import {userContext} from "./App";

function HomePage() {

    const {userData , setUserData} = useContext(userContext);

    const clientId = "773551022599-1375l2n31u4cclt9vi5r1mmspl5nt6fa.apps.googleusercontent.com";
    const [login , setLogin] = useState(true)

    const  goToSearch = () => {
        document.getElementById("search").click();
    }

    const loginSuccessfully = (some) => {
        setLogin(false);
        setUserData(some);
        goToSearch();
        
    }
    const logoutSuccessfully = () => {
        console.log("logout successfully");
        setLogin(true);
    }

    const failed = (some) => {
        console.log(some);
    }

    return (
        <div className=''>
            {

                login ? 

                <GoogleLogin

                    clientId={clientId}
                    buttonText="Login"
                    onSuccess={loginSuccessfully}
                    onFailure={failed}
                    cookiePolicy={'single_host_origin'}
                    // isSignedIn={true}
                /> : 
                <GoogleLogout 
                
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={logoutSuccessfully}

                />
            }
            <Link to="/search" id="search" className='hidden' >hello</Link>
        </div>
    )
}

export default HomePage
