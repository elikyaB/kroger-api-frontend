import React, {Fragment} from "react";
import { NavLink, Link } from "react-router-dom";

const BurgerMenu = ({
    isOpen,
    closeBurgerMenu
}) => {

    const styles = isOpen ? 'burgermenu burgermenu--open' : 'burgermenu burgermenu--closed';

    return(
        <Fragment>
        {isOpen ? <div className="burgermenu__backdrop" onClick={closeBurgerMenu}></div> : <Fragment></Fragment> }

        <nav className={`${styles}`}>
        <ul className="burgermenu__list">

          <li className="burgermenu__list__item" onClick={closeBurgerMenu}>
            <NavLink className="burgermenu__link" to="/products">
              Home
            </NavLink>
          </li>

          <li className="burgermenu__list__item" onClick={closeBurgerMenu}>
            <NavLink className="burgermenu__link" to="/signup">
              Signup
            </NavLink>
          </li>

          <li className="burgermenu__list__item" onClick={closeBurgerMenu}>
            <NavLink className="burgermenu__link" to="/login">
              Login
            </NavLink>
          </li>

          <li className="burgermenu__list__item" onClick={closeBurgerMenu}>
            <NavLink className="burgermenu__link" to="/cart">
              Cart
            </NavLink>
          </li>

          <li className="burgermenu__list__item" onClick={closeBurgerMenu}>
            <NavLink className="burgermenu__link" to="/">
              Log out
            </NavLink>
          </li>
        </ul>
      </nav>

        </Fragment>
    );
};

export default BurgerMenu;