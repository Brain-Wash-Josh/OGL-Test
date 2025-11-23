import React, { useState, useEffect } from 'react';
import Page from '../../components/page';
import Table from '../../components/table';

const columns = [
	{ key: 'id', title: 'ID' },
	{ key: 'sku', title: 'SKU' },
	{ key: 'price', title: 'Price' },
	{ key: 'desc', title: 'Description' },
];

const ProductPage = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;
		setLoading(true);
		fetch('http://localhost:8080/product')
			.then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			})
			.then((json) => {
				if (!mounted) return;
				setData(Array.isArray(json) ? json : []);
				setLoading(false);
			})
			.catch((err) => {
				if (!mounted) return;
				setError(err.message || 'Fetch error');
				setLoading(false);
			});

		return () => {
			mounted = false;
		};
	}, []);

	return (
		<Page title="Product Title">
			{loading && <p>Loading products...</p>}
			{error && <p style={{ color: 'red' }}>Error: {error}</p>}

			{!loading && !error && (
				<Table columns={columns} data={data} onChange={(next) => setData(next)} />
			)}
		</Page>
	);
};

export default ProductPage;
