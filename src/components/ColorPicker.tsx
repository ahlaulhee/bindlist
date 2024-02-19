export function ColorPicker({
  value,
  onChange,
  name,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
}) {
  return (
    <div className="wrapper block">
      <select onChange={onChange} name={name} value={value}>
        <option value="#E95678" style={{ backgroundColor: "#E95678" }}>
          Red
        </option>
        <option value="#26BBD9" style={{ backgroundColor: "#26BBD9" }}>
          Blue
        </option>
        <option value="#59E3E3" style={{ backgroundColor: "#59E3E3" }}>
          Cyan
        </option>
        <option value="#29D398" style={{ backgroundColor: "#29D398" }}>
          Green
        </option>
        <option value="#FAB795" style={{ backgroundColor: "#FAB795" }}>
          Yellow
        </option>
        <option value="#EE64AE" style={{ backgroundColor: "#EE64AE" }}>
          Pink
        </option>
      </select>
    </div>
  );
}
