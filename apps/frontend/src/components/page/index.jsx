import React from 'react';
import Header from '../header';
import css from './index.module.css';

const Page = ({ title, children }) => (
	<div className={css.pageWrapper}>
		<Header />
		<main className={css.content}>
			<div className={css.container}>
				{title && <h1 className={css.title}>{title}</h1>}
				{children && <div className={css.lead}>{children}</div>}
			</div>
		</main>
	</div>
);

export default Page;
