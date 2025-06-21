import React, { useState, useRef, useEffect } from 'react';
import { Switch } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FiExternalLink, FiEye, FiEdit2, FiShare2, FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const JobCard = ({ data, onTogglePublish, onDelete }) => {
  const {
    position,
    description,
    number_of_vacancies,
    number_of_all_applications,
    number_of_new_applications,
    is_published,
    website,
    id,
  } = data;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const truncateDescription = (text, limit = 50) => {
    return text?.length > limit ? `${text.slice(0, limit)}...` : text;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border text-sm w-full max-w-sm relative min-h-[320px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <span className="font-semibold text-base text-[#1D2026]" style={{ fontSize: '14px', lineHeight: '24px', fontWeight: '600' }}>
          {position?.[1] || '-'}
        </span>

        {/* Menu */}
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#1D2026] text-xl">
            ...
          </button>
{menuOpen && (
  <div 
    style={{ insetInlineEnd: "2px" }}
    className="absolute top-9 w-44 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl rounded-xl border border-gray-200 z-20 transition-all duration-200"
  >
    <div className="flex flex-col py-2">
      <button
        onClick={() => navigate(`/app/opening-positions/${id}`)}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-green-600 transition-all duration-150"
      >
        <span className="bg-green-100 text-green-600 p-1 rounded-full">
          <FiEye size={12} />
        </span>
        <span>{t('show')}</span>
      </button>

      <button
        onClick={() => navigate(`/app/opening-positions/edit/${id}`)}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150"
      >
        <span className="bg-blue-100 text-blue-600 p-1 rounded-full">
          <FiEdit2 size={12} />
        </span>
        <span>{t('edit')}</span>
      </button>

      <button
        onClick={() => navigator.clipboard.writeText(website)}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-150"
      >
        <span className="bg-purple-100 text-purple-600 p-1 rounded-full">
          <FiShare2 size={12} />
        </span>
        <span>{t('share')}</span>
      </button>

      <button
        onClick={() => onDelete?.(id)}
        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-150"
      >
        <span className="bg-red-100 text-red-600 p-1 rounded-full">
          <FiTrash2 size={12} />
        </span>
        <span>{t('delete')}</span>
      </button>
    </div>
  </div>
)}



        </div>
      </div>

      <div style={{ height: '1px', background: '#E9EAF0' }}></div>

      {/* Description */}
      <div className="p-4 mt-0">
        <p className="text-gray-500 text-xs leading-relaxed">{truncateDescription(description)}</p>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-3 gap-2 text-center pt-2 pb-2 pl-4 pr-4">
        <div style={{ border: '1px solid #E9EAF0', borderRadius: '8px', height: '36px' }}>
          <p className="text-xs text-[#131313]" style={{ fontSize: '10px', fontWeight: '400', lineHeight: '24px' }}>
            {number_of_vacancies} {t('to_hire')}
          </p>
        </div>
        <div style={{ border: '1px solid #E9EAF0', borderRadius: '8px', height: '36px' }}>
          <p className="text-xs text-[#131313]" style={{ fontSize: '10px', fontWeight: '400', lineHeight: '24px' }}>
            {number_of_all_applications} {t('applications')}
          </p>
        </div>
      </div>

      {/* New requests */}
      <div
        className="text-center py-1 text-xs m-4"
        style={{
          fontWeight: '700',
          borderRadius: '8px',
          background: '#0553931A',
          height: '32px',
          lineHeight: '2.3',
          color: '#055393',
          fontSize: '10px',
        }}
      >
        {number_of_new_applications} {t('new_applications')}
      </div>

      <div style={{ height: '1px', background: '#E9EAF0' }}></div>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-gray-500  p-4">
        <div className="flex items-center gap-1">
          <span>{is_published ? t('published') : t('unpublished')}</span>
          <Switch size="small" checked={is_published === 1} onChange={() => onTogglePublish?.(id)} />
        </div>

        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:underline gap-1"
        >
          <FiExternalLink size={12} /> {t('job_page')}
        </a>
      </div>
    </div>
  );
};

export default JobCard;
