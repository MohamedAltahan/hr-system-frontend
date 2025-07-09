import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import Select from 'react-select';

import SectionBox from '../../../components/ui/containers/SectionBox';
import AddingButton from '../../../components/ui/buttons/AddingBtn';
import CancelButton from '../../../components/ui/buttons/CancelBtn';
import TextInput from '../../../components/reusable_components/TextInput';

import {
  useGetFlightTicketByIdQuery,
  useUpdateFlightTicketMutation,
} from '../../../api/flightTicketsApi';

import { useGetAllEmployeeQuery } from '../../../api/Employee';

const EditFlightTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: ticketData, isLoading: isFetching } = useGetFlightTicketByIdQuery(Number(id));
  const [updateFlightTicket, { isLoading }] = useUpdateFlightTicketMutation();
  const { data: employeesData } = useGetAllEmployeeQuery({ page: 1 });

  const employeeOptions = useMemo(() => {
    return (
      employeesData?.body?.data?.map((emp) => ({
        value: emp.id,
        label: emp.name,
      })) || []
    );
  }, [employeesData]);

  const statusOptions = [
    { value: 'pending', label: t('pending') },
    { value: 'accepted', label: t('accepted') },
    { value: 'rejected', label: t('rejected') },
  ];

  const ticketTypeOptions = [
    { value: 'one_way', label: t('one_way') },
    { value: 'round_trip', label: t('round_trip') },
    { value: 'return_only', label: t('return_only') },
  ];

  const [formData, setFormData] = useState({
    employee: null,
    responsible_person_name: '',
    ticket_type: null,
    ticket_price: '',
    flight_date: '',
    status: null,
  });

  useEffect(() => {
    if (ticketData?.body) {
      const {
        empoloyee,
        responsible_person_name,
        ticket_type,
        ticket_price,
        flight_date,
        status,
      } = ticketData.body;

      setFormData({
        employee: {
          value: empoloyee?.id,
          label: empoloyee?.name,
        },
        responsible_person_name: responsible_person_name || '',
        ticket_type: ticketTypeOptions.find((s) => s.value === ticket_type),
        ticket_price: ticket_price?.replace(/[^\d.]/g, '') || '',
        flight_date: flight_date?.date || '',
        status: statusOptions.find((s) => s.value === status),
      });
    }
  }, [ticketData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      employee,
      responsible_person_name,
      ticket_type,
      ticket_price,
      flight_date,
      status,
    } = formData;

    if (!employee || !ticket_type || !status || !ticket_price || !flight_date) {
      toast.error(t('all_fields_required'));
      return;
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append('employee_id', employee.value);
    formDataToUpload.append('responsible_person_name', responsible_person_name);
    formDataToUpload.append('ticket_type', ticket_type.value);
    formDataToUpload.append('ticket_price', ticket_price);
    formDataToUpload.append('flight_date', flight_date);
    formDataToUpload.append('status', status.value);

    try {
      const res = await updateFlightTicket({
        id: Number(id),
        formData: formDataToUpload,
      }).unwrap();

      toast.success(res?.message || t('updated_successfully'));
      navigate('/app/flight-tickets');
    } catch (error) {
      toast.error(error?.data?.message || t('something_went_wrong'));
    }
  };

  if (isFetching) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('loading')}</p>
      </SectionBox>
    );
  }

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-xl font-bold">{t('edit_flight_ticket')}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Employee Dropdown */}
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('employee')}</label>
          <Select
            value={formData.employee}
            onChange={(selected) => setFormData((prev) => ({ ...prev, employee: selected }))}
            options={employeeOptions}
            placeholder={t('choose_employee')}
          />
        </div>

        {/* Responsible Person */}
        <TextInput
          label={t('responsible_person_name')}
          name="responsible_person_name"
          value={formData.responsible_person_name}
          onChange={handleInputChange}
        />

        {/* Ticket Type */}
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('ticket_type')}</label>
          <Select
            value={formData.ticket_type}
            onChange={(selected) => setFormData((prev) => ({ ...prev, ticket_type: selected }))}
            options={ticketTypeOptions}
            placeholder={t('choose_ticket_type')}
          />
        </div>

        {/* Ticket Price */}
        <TextInput
          label={t('ticket_price')}
          name="ticket_price"
          value={formData.ticket_price}
          onChange={handleInputChange}
        />

        {/* Flight Date */}
        <TextInput
          label={t('flight_date')}
          name="flight_date"
          type="date"
          value={formData.flight_date}
          onChange={handleInputChange}
        />

        {/* Status */}
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('status')}</label>
          <Select
            value={formData.status}
            onChange={(selected) => setFormData((prev) => ({ ...prev, status: selected }))}
            options={statusOptions}
            placeholder={t('choose_status')}
          />
        </div>

        <div className="col-span-2 flex justify-end gap-5 mt-4">
          <AddingButton type="submit" variant="main" disabled={isLoading}>
            {isLoading ? t('updating') : t('update')}
          </AddingButton>
          <CancelButton type="button" onClick={() => navigate('/app/flight-tickets')}>
            {t('cancel')}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default EditFlightTicket;
