import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import Select from 'react-select';

import { useCreateFlightTicketMutation } from '../../api/flightTicketsApi';
import { useGetAllEmployeeQuery } from '../../api/Employee';

import SectionBox from '../../components/ui/containers/SectionBox';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import TextInput from '../../components/reusable_components/TextInput';
import DateInput from '../../components/reusable_components/DateInput';

const AddFlightTicket = () => {
  const navigate = useNavigate();
  const [createFlightTicket, { isLoading }] = useCreateFlightTicketMutation();
  const { data: employeesData } = useGetAllEmployeeQuery({ page: 1 });

  const employeeOptions =
    employeesData?.body?.data?.map((emp) => ({
      value: emp.id,
      label: emp.name,
    })) || [];

  const ticketTypeOptions = [
    { value: 'one_way', label: t('one_way') },
    { value: 'round_trip', label: t('round_trip') },
    { value: 'return_only', label: t('return_only') },
  ];

  const statusOptions = [
    { value: 'pending', label: t('pending') },
    { value: 'accepted', label: t('approved') },
    { value: 'rejected', label: t('rejected') },
  ];

  const [formData, setFormData] = useState({
    employee: null,
    ticket_type: null,
    ticket_price: '',
    flight_date: '',
    responsible_person_name: '',
    status: statusOptions[0], // default to pending
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { employee, ticket_type, ticket_price, flight_date, responsible_person_name, status } = formData;

    if (!employee || !ticket_type || !ticket_price || !flight_date || !responsible_person_name || !status) {
      toast.error(t('all_fields_required'));
      return;
    }

    const formToSend = new FormData();
    formToSend.append('employee_id', employee.value);
    formToSend.append('ticket_type', ticket_type.value);
    formToSend.append('ticket_price', ticket_price);
    formToSend.append('flight_date', flight_date);
    formToSend.append('responsible_person_name', responsible_person_name);
    formToSend.append('status', status.value);

    try {
      const res = await createFlightTicket(formToSend).unwrap();
      toast.success(res?.message || t('added_successfully'));
      navigate('/app/flight-tickets');
    } catch (err) {
      toast.error(err?.data?.message || t('something_went_wrong'));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-xl font-bold">{t('add_flight_ticket')}</h2>
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

        {/* Ticket Type Dropdown */}
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('ticket_type')}</label>
          <Select
            value={formData.ticket_type}
            onChange={(selected) => setFormData((prev) => ({ ...prev, ticket_type: selected }))}
            options={ticketTypeOptions}
            placeholder={t('choose_ticket_type')}
          />
        </div>

        <TextInput
          label={t('ticket_price')}
          name="ticket_price"
          value={formData.ticket_price}
          onChange={handleInputChange}
        />

        <DateInput
          label={t('flight_date')}
          name="flight_date"
          value={formData.flight_date}
          onChange={handleInputChange}
        />

        <TextInput
          label={t('responsible_person_name')}
          name="responsible_person_name"
          value={formData.responsible_person_name}
          onChange={handleInputChange}
        />

        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('status')}</label>
          <Select
            value={formData.status}
            onChange={(selected) => setFormData((prev) => ({ ...prev, status: selected }))}
            options={statusOptions}
            placeholder={t('choose_status')}
          />
        </div>

        <div className="col-span-2 flex justify-end gap-4">
          <AddingButton type="submit" variant="main" disabled={isLoading}>
            {isLoading ? t('adding') : t('add')}
          </AddingButton>
          <CancelButton type="button" onClick={() => navigate('/app/flight-tickets')}>
            {t('cancel')}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddFlightTicket;
