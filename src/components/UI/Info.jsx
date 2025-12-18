const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-xs">{label}</p>
    <p className="font-medium text-gray-900">{value || "—"}</p>
  </div>
);
export default Info;
