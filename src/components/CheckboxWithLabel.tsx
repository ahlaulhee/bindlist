export function CheckboxWithLabel({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="block" onClick={onChange}>
      <input type="checkbox" checked={checked} readOnly />
      <label>{label}</label>
    </div>
  );
}
