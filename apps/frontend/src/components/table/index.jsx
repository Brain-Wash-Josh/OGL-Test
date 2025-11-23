import React, { useState, useEffect } from 'react';
import css from './index.module.css';


const Table = ({ columns = [], data = [], onChange }) => {
  const [rows, setRows] = useState(Array.isArray(data) ? data : []);

  useEffect(() => {
    setRows(Array.isArray(data) ? data : []);
  }, [data]);

  const handleCellChange = (rowIndex, key, value) => {
    const next = rows.map((r, i) => (i === rowIndex ? { ...r, [key]: value } : r));
    setRows(next);
    if (typeof onChange === 'function') onChange(next);
  };

  const addRow = () => {
    const empty = columns.reduce((acc, col) => ({ ...acc, [col.key]: '' }), {});
    const next = [...rows, empty];
    setRows(next);
    if (typeof onChange === 'function') onChange(next);
  };

  return (
    <div className={css.tableWrapper}>
      <table className={css.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className={css.smallMuted} style={{ padding: '1rem' }}>
                No rows. Use "Add row" to create one.
              </td>
            </tr>
          )}

          {rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {columns.map((col, cIdx) => (
                <td key={col.key}>
                  { (cIdx === 0 || col.editable === false) ? (
                    <div className={css.cellText} aria-label={`${col.title} row ${rIdx + 1}`}>
                      {row[col.key] ?? ''}
                    </div>
                  ) : (
                    <input
                      className={css.cellInput}
                      value={row[col.key] ?? ''}
                      onChange={(e) => handleCellChange(rIdx, col.key, e.target.value)}
                      aria-label={`${col.title} row ${rIdx + 1}`}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button type="button" className={css.addRowBtn} onClick={addRow}>
          + Add row
        </button>
        <div className={css.smallMuted}>Values are editable; column titles are fixed.</div>
      </div>
    </div>
  );
};

export default Table;
