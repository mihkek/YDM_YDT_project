const ProfileForm = () =>{
    return(
        <div className="dashboard__block container profile">
        
          <div className="widget-form__header widget-form__header--center">
            <h3 className="center_text">Your personal user-data</h3>
          </div>
          
          <form className="form ">
              <h3>Email</h3>
              <input t ype="text" ></input>
              <h3>Password</h3>
              <input type="text" ></input>
                    <button className="btn butSmall" type="button"><span className="btn__text ">Change password</span>
                        </button>
              <h3>Name</h3>
              <input type="text" ></input>

              <h3>Adress</h3>
              <input type="text" ></input>
              <button className="btn" type="button"><span className="btn__text">Save changes</span>
                        </button><span>    </span>
          </form>


      </div>
    )
}
export default ProfileForm