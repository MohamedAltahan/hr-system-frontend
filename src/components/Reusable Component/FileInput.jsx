export default function FileInput({ label, name, onChange }) {
  return (
    <div>
      <label className="block mb-2 label-md">{label}</label>
      <input
        type="file"
        name={name}
        onChange={onChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
}
