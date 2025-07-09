import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuPencil } from 'react-icons/lu';

import { useGetFlightTicketByIdQuery } from '../../api/flightTicketsApi';

import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';

const statusOptions = {
  pending: 'قيد الانتظار',
  accepted: 'مقبول',
  rejected: 'مرفوض',
};

const ticketTypeOptions = {
  one_way: 'ذهاب فقط',
  round_trip: 'ذهاب وعودة',
  return_only: 'عودة فقط',
};

const ShowFlightTicket = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetFlightTicketByIdQuery(Number(id));

  if (isLoading) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('loading')}</p>
      </SectionBox>
    );
  }

  if (isError) {
    return (
      <p>
        {t('error_occurred')}: {error?.data?.message || t('unable_to_load_data')}
      </p>
    );
  }

  const ticket = data?.body;
  if (!ticket) return <p>{t('not_found')}</p>;

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">{t('show_flight_ticket')}</h2>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('ticket_details')}</h2>
                    <button className="EditPermissionBtn">

          <CancelButton onClick={() => navigate(`/app/flight-tickets/edit/${id}`)}>
            <LuPencil /> {t('edit')}
          </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('employee_name')}:</span>
            <p className="text-gray-900">{ticket?.empoloyee?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('responsible_person_name')}:</span>
            <p className="text-gray-900">{ticket?.responsible_person_name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('ticket_type')}:</span>
            <p className="text-gray-900">{ticketTypeOptions[ticket?.ticket_type] || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('ticket_price')}:</span>
            <p className="text-gray-900">{ticket?.ticket_price || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('flight_date')}:</span>
            <p className="text-gray-900">{ticket?.flight_date?.datetime || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('status')}:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                ticket?.status === 'accepted'
                  ? 'bg-green-100 text-green-800'
                  : ticket?.status === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {statusOptions[ticket?.status] || '-'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton type="button" onClick={() => navigate('/app/flight-tickets')}>
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowFlightTicket;
