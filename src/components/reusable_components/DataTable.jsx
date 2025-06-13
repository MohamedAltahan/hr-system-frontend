import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ProductTable = ({
  headers = [],
  data = [],
  rowKey = 'id',
  renderActions,
  pagination,
  onPageChange,
  baseRoute = '',
  customCellRender = {}, // ✅ support for custom cell rendering
}) => {
  const navigate = useNavigate();

  const currentPage = pagination?.current_page;
  const totalPages = pagination?.last_page;
  const from = pagination?.from;
  const to = pagination?.to;
  const total = pagination?.total;
  const links = pagination?.links || [];

  const renderPagination = () => {
    if (!pagination) return null;

    return (
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          عرض <span className="font-semibold text-gray-900">{from}</span> إلى{' '}
          <span className="font-semibold text-gray-900">{to}</span> من{' '}
          <span className="font-semibold text-gray-900">{total}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          {links.map((link, idx) => {
            const label = link.label.replace(/&laquo;|&raquo;/g, '').trim();
            const isArrow = link.label.includes('&laquo;') || link.label.includes('&raquo;');
            const isActive = link.active;
            const isDisabled = !link.url;
            const pageMatch = link.url?.match(/page=(\d+)/);
            const page = pageMatch ? Number(pageMatch[1]) : null;

            return (
              <li key={idx}>
                <button
                  onClick={() => !isDisabled && page && onPageChange(page)}
                  disabled={isDisabled}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border 
                    ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 border-gray-300 hover:bg-blue-100'
                        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                    }
                    ${idx === 0 ? 'rounded-s-lg' : ''} 
                    ${idx === links.length - 1 ? 'rounded-e-lg' : ''}
                    ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {isArrow ? (
                    label === 'Next' ? (
                      <MdChevronLeft className="text-lg" />
                    ) : (
                      <MdChevronRight className="text-lg" />
                    )
                  ) : (
                    label
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-[#F6F6F6]">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-3 tableHeaderText">
                {typeof header === 'string' ? header : header.label}
              </th>
            ))}
            {renderActions && <th className="px-6 py-3 tableHeaderText">الاجراءات</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              key={item[rowKey] || index}
              className={`bg-white hover:bg-gray-50 cursor-pointer ${
                index !== data.length - 1 ? 'border-b border-[#F6F6F6]' : ''
              }`}
              onClick={() => navigate(`${baseRoute}/${item[rowKey]}`)} // ✅ row click
            >
              {headers.map((header, idx) => {
                const key = typeof header === 'string' ? header : header.key;
                const value = item[key];

                return (
                <td
  key={idx}
  className="px-6 py-4 tableContentText"
  onClick={(e) => {
    // prevent row navigation when clicking inside custom cell content
    if (customCellRender[key]) e.stopPropagation();
  }}
>
  {customCellRender[key] ? (
    customCellRender[key](item)
  ) : typeof value === 'string' && value.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
    <img src={value} alt="" className="w-12 h-12 object-cover rounded" />
  ) : (
    value
  )}
</td>

                );
              })}

              {renderActions && (
                <td
                  className="px-6 py-4 tableContentText"
                  onClick={(e) => e.stopPropagation()} // ✅ prevent row click
                >
                  {renderActions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {renderPagination()}
    </div>
  );
};

ProductTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  rowKey: PropTypes.string,
  renderActions: PropTypes.func,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  baseRoute: PropTypes.string,
  customCellRender: PropTypes.object, // ✅ new
};

export default ProductTable;
