import React, { useState } from "react";
import {
  useGetAllFlightTicketsQuery,
  useDeleteFlightTicketMutation,
} from "../../api/flightTicketsApi";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const FlightTickets = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: ticketsData, isLoading } = useGetAllFlightTicketsQuery({ page, per_page: 10 });
  const [deleteTicket] = useDeleteFlightTicketMutation();

  const flightTickets = (ticketsData?.body?.data || []).map((item) => ({
    ...item,
    employee_name: item.empoloyee?.name || "-",
    flight_date: item.flight_date?.date || "-",
  }));

  const pagination = ticketsData?.body?.paginate;

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteTicket(selectedId).unwrap();
      toast.success(res?.message || t("deleted_successfully"));
    } catch (error) {
      toast.error(error?.message || t("delete_failed"));
    } finally {
      setConfirmOpen(false);
    }
  };

  const statusOptions = {
    pending: t("pending"),
    rejected: t("rejected"),
    accepted: t("approved"),
  };

  const statusChipClass = {
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    accepted: "bg-green-100 text-green-800",
  };

  const items = flightTickets.map((item) => ({
    ...item,
    status_chip: (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusChipClass[item.status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {statusOptions[item.status] || "-"}
      </span>
    ),
        ticket_type:t(item.ticket_type) || "-",

  }));

  const headers = [
    { key: "employee_name", label: t("employee") },
    { key: "responsible_person_name", label: t("responsible_person_name") },
    { key: "ticket_type", label: t("ticket_type") },
    { key: "ticket_price", label: t("ticket_price") },
    { key: "flight_date", label: t("flight_date") },
    { key: "status_chip", label: t("status") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("flight_tickets")}</div>
        <div className="flex justify-end">
          <a href="/app/flight-tickets/add">
            <AddingButton variant="main">{t("add_flight_ticket")}</AddingButton>
          </a>
        </div>
      </div>

      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ProductTable
            headers={headers}
            data={items}
            baseRoute="/app/flight-tickets"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a
                  href={`/app/flight-tickets/edit/${item.id}`}
                  className="font-medium text-blue-600 hover:underline editIcon"
                >
                  <MdEdit />
                </a>
                <button onClick={() => handleDeleteClick(item.id)} className="deleteIcon">
                  <MdDelete />
                </button>
              </div>
            )}
          />
        )}

        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title={t("confirm_delete")}
          message={t("are_you_sure_you_want_to_delete_this_flight_ticket")}
        />
      </div>
    </SectionBox>
  );
};

export default FlightTickets;
