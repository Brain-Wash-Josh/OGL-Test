import React, { useState, useEffect, useRef } from 'react';
import Page from '../../components/page';
import css from './index.module.css';
import Table from '../../components/table';

const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'house', title: 'House' },
    { key: 'street', title: 'Street' },
    { key: 'city', title: 'City' },
    { key: 'postcode', title: 'Postcode' },
];

const CustomerPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const originalRef = useRef([]);
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState(null);

    const saveChanges = async () => {
        setSaving(true);
        setSaveMessage(null);
        const original = Array.isArray(originalRef.current) ? originalRef.current : [];
        const origById = new Map(original.filter(Boolean).map((r) => [String(r.id), r]));

        const rowsToUpdate = [];
        const rowsToCreate = [];

        data.forEach((row, idx) => {
            const id = row && (row.id ?? row.id === 0 ? String(row.id) : '') ;
            if (!id) {
                rowsToCreate.push({ row, idx });
            } else if (!origById.has(String(id))) {
                // id present but not in original -> skip (avoid duplicates)
            } else {
                const orig = origById.get(String(id));
                try {
                    if (JSON.stringify(orig) !== JSON.stringify(row)) {
                        rowsToUpdate.push({ row, idx });
                    }
                } catch (e) {
                    rowsToUpdate.push({ row, idx });
                }
            }
        });

        if (rowsToCreate.length === 0 && rowsToUpdate.length === 0) {
            setSaveMessage('No changes to save.');
            setSaving(false);
            return;
        }

        const errors = [];

        // send updates first (use POST for updates)
        for (const item of rowsToUpdate) {
            const { row, idx } = item;
            try {
                const res = await fetch('http://localhost:8080/customer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(row),
                });
                if (!res.ok) {
                    const text = await res.text();
                    errors.push(`Update id=${row.id}: ${res.status} ${text}`);
                } else {
                    const updated = await res.json().catch(() => row);
                    originalRef.current = originalRef.current.map((o) => (String(o.id) === String(row.id) ? updated : o));
                    setData((prev) => prev.map((p, i) => (i === idx ? updated : p)));
                }
            } catch (err) {
                errors.push(`Update id=${row.id}: ${err.message}`);
            }
        }

        // then create new rows (POST to /customer)
        for (const item of rowsToCreate) {
            const { row, idx } = item;
            try {
                const res = await fetch('http://localhost:8080/customer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(row),
                });
                if (!res.ok) {
                    const text = await res.text();
                    errors.push(`Create row index=${idx}: ${res.status} ${text}`);
                } else {
                    const created = await res.json().catch(() => row);
                    originalRef.current = [...originalRef.current, created];
                    setData((prev) => prev.map((p, i) => (i === idx ? created : p)));
                }
            } catch (err) {
                errors.push(`Create row index=${idx}: ${err.message}`);
            }
        }

        setSaving(false);
        if (errors.length === 0) {
            setSaveMessage('Save complete.');
        } else {
            setSaveMessage(`Save finished with errors:\n${errors.join('; ')}`);
        }
    };

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetch('http://localhost:8080/customer')
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => {
                if (!mounted) return;
                const arr = Array.isArray(json) ? json : [];
                setData(arr);
                originalRef.current = arr;
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
        <Page title="Customer Page">
            {saveMessage && <p style={{ color: saving ? '#333' : 'green' }}>{saveMessage}</p>}
            {loading && <p>Loading customers...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {!loading && !error && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem', gap: '0.5rem' }}>
                        <button
                            className={css.saveButton}
                            onClick={async () => {
                                if (saving) return;
                                setSaveMessage(null);
                                await saveChanges();
                            }}
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                    <Table
                        columns={columns}
                        data={data}
                        onChange={(next) => setData(next)}
                    />
                </>
            )}
        </Page>
    );
};

export default CustomerPage;