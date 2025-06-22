import { useEffect, useState } from "react";
import {
  useGetOpeningPositionsQuery,
  useSubmitApplicationMutation,
} from "../../api/applyJobApi";

export default function ApplyJob() {
  const companyName = new URLSearchParams(window.location.search).get("c") || "owner";
const { data, isLoading } = useGetOpeningPositionsQuery(companyName);
const positions = data?.body || [];
  const [submitApplication] = useSubmitApplicationMutation();

  const [fileName, setFileName] = useState("لم يتم اختيار ملف");
  const [toastVisible, setToastVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      input:-webkit-autofill {
        box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        background-color: white !important;
        transition: background-color 5000s ease-in-out 0s;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await submitApplication({ formData, companyName }).unwrap();
      e.target.reset();
      setFileName("لم يتم اختيار ملف");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 4000);
    } catch (error) {
      alert("حدث خطأ أثناء الإرسال، حاول مرة أخرى.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>نموذج التقديم على الوظائف</h2>
        <form onSubmit={handleSubmit}>
          <FormField label="الوظيفة">
            <select
              name="opening_position_id"
              required
              style={styles.input}
              onChange={(e) => {
                const selected = positions.find((p) => p.id === parseInt(e.target.value));
                setSelectedDescription(selected?.description || "");
              }}
            >
              <option value="">اختر الوظيفة</option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.position.name}
                </option>
              ))}
            </select>
          </FormField>

          {selectedDescription && (
            <div style={styles.descriptionBox}>
              <p>{selectedDescription}</p>
            </div>
          )}

          <FormInput name="name" label="الاسم" required />
          <FormInput name="email" label="البريد الإلكتروني" type="email" required />
          <FormInput name="phone" label="رقم الهاتف" required />
          <FormInput name="current_salary" label="الراتب الحالي" />
          <FormInput name="expected_salary" label="الراتب المتوقع" />
          <FormInput name="religion" label="الديانة" />
          <FormInput name="nationality" label="الجنسية" />
          <FormInput name="birthdate" label="تاريخ الميلاد" type="date" />

          <FormField label="السيرة الذاتية (PDF أو DOC)">
            <label style={styles.uploadLabel}>
              اختيار ملف
              <input
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx"
                required
                style={{ display: "none" }}
                onChange={(e) => setFileName(e.target.files[0]?.name || "لم يتم اختيار ملف")}
              />
            </label>
            <span>{fileName}</span>
          </FormField>

          <button type="submit" style={styles.button}>
            إرسال الطلب
          </button>
        </form>
      </div>

      {toastVisible && (
        <div style={styles.toast}>تم إرسال طلبك بنجاح. شكراً لتقديمك!</div>
      )}
    </div>
  );
}

// Reusable input
function FormInput({ name, label, type = "text", required = false }) {
  return (
    <FormField label={label}>
      <input type={type} name={name} required={required} style={styles.input} />
    </FormField>
  );
}

// Reusable field wrapper
function FormField({ label, children }) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Cairo', sans-serif",
    backgroundColor: "#f8fafc",
    padding: "2rem",
  },
  container: {
    maxWidth: "600px",
    margin: "auto",
    background: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#1f2937",
  },
  label: {
    fontWeight: "600",
    color: "#374151",
    display: "block",
    fontSize: "15px",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #cbd5e1",
    borderRadius: "5px",
    fontFamily: "'Cairo', sans-serif",
    outline: "none",
    boxShadow: "none",
    transition: "none",
  },
  button: {
    marginTop: "2rem",
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#0284c7",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "'Cairo', sans-serif",
  },
  uploadLabel: {
    backgroundColor: "rgb(119 153 171)",
    color: "white",
    padding: "0.4rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    display: "inline-block",
    marginInlineEnd: "1rem",
  },
  descriptionBox: {
    marginTop: "0.5rem",
    padding: "0.75rem",
    backgroundColor: "#f1f5f9",
    borderRadius: "5px",
    color: "#334155",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  toast: {
    position: "fixed",
    top: "1.5rem",
    insetInlineEnd: "1.5rem",
    backgroundColor: "#16a34a",
    color: "white",
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    fontFamily: "'Cairo', sans-serif",
    zIndex: 9999,
    opacity: 1,
    transform: "translateY(0)",
    transition: "opacity 0.4s ease, transform 0.3s ease",
  },
};
