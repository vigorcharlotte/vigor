import React from "react";
import ListItem from "material-ui/List/ListItem"
import Avatar from "material-ui/Avatar"

const Header = ({children}) =>
<header className="page-header row justify-center">
    <div className="col-md-6 col-lg-8" >
     {children}
    </div>

    <div className="dropdown user-dropdown col-md-6 col-lg-4 text-center text-md-right">
      <a className="btn btn-stripped dropdown-toggle" href="https://example.com" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <div className= "circle float-left profile-photo"><ListItem
        disabled={true}
        leftAvatar={<Avatar src = "../images/vigor-logo.png"
        size={40}/>}
        >
        </ListItem> 
        </div>
        {/* <img src="images/profile-pic.jpg" alt="profile photo" className="circle float-left profile-photo" width="50" height="auto"></img> */} 
        <div className="username mt-1">
          <h4 className="mb-1"></h4>
          <h6 className="text-muted"></h6>
				</div>
        </a>
    </div>
    <div class="clear"></div>
    <a href="#menu-toggle" className="btn btn-default" id="menu-toggle"><em className="fa fa-bars"></em></a>
</header>;

export default Header;
