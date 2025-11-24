import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import css from './index.module.css';

const Header = () => {
	const navigate = useNavigate();

	return (
		<header className={css.header}>
			<div className={css.brand} onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
				<div className={css.logo}>OGL</div>
				<div className={css.title}>OGL Developer Test</div>
			</div>

			<nav className={css.nav}>
				<NavLink to="/" className={({isActive}) => isActive ? `${css.navLink} ${css.active}` : css.navLink}>
					Main
				</NavLink>
				<NavLink to="/product" className={({isActive}) => isActive ? `${css.navLink} ${css.active}` : css.navLink}>
					Product
				</NavLink>
				<NavLink to="/customer" className={({isActive}) => isActive ? `${css.navLink} ${css.active}` : css.navLink}>
					Customer
				</NavLink>
                <NavLink to="/map" className={({isActive}) => isActive ? `${css.navLink} ${css.active}` : css.navLink}>
					Map
				</NavLink>
			</nav>
		</header>
	);
};

export default Header;
