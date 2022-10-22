import React from "react";
import {Link} from 'react-router-dom'

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTab({ currentPage, handlePageChange }) {
  // const location = useLocation();
  return (
    <ul className="nav nav-tabs .current-menu-item a ">
      <li className="nav-item">
        <a href =  "/"
          //</li>onClick={() => handlePageChange("Home")}
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
        >
          <button>Home</button>
        </a>
      </li>
      <li className="nav-item">
        <a href = "/review"
          // onClick={() => handlePageChange("Review")}
          // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
        >
          Review
        </a>
      </li>
      <li className="SignUp">
        <a href = '/signup'
          // onClick={() => handlePageChange("SignUp")}
          // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
        >
          SignUp
        </a>
      </li>
      <li className="LogIn">
        <a href = '/login'
          // onClick={() => handlePageChange("LogIn")}
          // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={({isActive}) => isActive? "nav-link active" : "nav-link"}
        >
          LogIn
        </a>
      </li>
    </ul>
  );
}

export default NavTab;
