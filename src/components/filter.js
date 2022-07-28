import React from 'react'

const Filter = ({ items, onChange }) => {
  if (!Object.keys(items).length) return <div></div>;

  return (
    items.map(c => <div key={`category_${c}`} className="flex items-center mb-4">
      <input
        name={c}
        onChange={onChange}
        id={`checkbox_${c}`}
        type="checkbox"
        className="md:w-6 md:h-6 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300" />
      <label htmlFor={`checkbox_${c}`} className="ml-2 md:text-sm text-xs font-medium text-gray-400">{c}</label>
    </div>)
  )
}

export default React.memo(Filter)