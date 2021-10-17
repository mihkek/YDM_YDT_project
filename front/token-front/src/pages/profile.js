import ProfileForm from "../components/page_elements/profileForm"
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import Loader from "../components/library/loader";

const ProfilePage = () =>{
    const logied = useSelector(state => state.logied);
    if(!logied){
        return(
            <Redirect to="/login"/>
        )
    }
    return(
        <div className="container">
          
            <ProfileForm/>
       </div>
    )
}
export default ProfilePage