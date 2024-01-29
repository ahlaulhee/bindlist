import { Keybind } from "../vite-env";
import { CheckboxWithLabel } from "./CheckboxWithLabel";
import { InputField } from "./InputField";

export const TopBar = ({
  keybind,
  handleInputChange,
  handleKeyChange,
  handleCheckBoxClick,
  storeKeybind,
}: {
  keybind: Keybind;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckBoxClick: (key: string, value: boolean) => void;
  storeKeybind: () => void;
}) => {
  return (
    <section>
      <button className="block accent">Listen to keys</button>
      <InputField
        placeholder="Action..."
        value={keybind.action}
        onChange={handleInputChange}
        name="action"
      />
      <InputField
        placeholder="Category..."
        value={keybind.category}
        onChange={handleInputChange}
        name="category"
      />
      <input
        className="colorPicker"
        type="color"
        value={keybind.color}
        onChange={handleInputChange}
        name="color"
      />
      <CheckboxWithLabel
        label="Control"
        checked={keybind.bind.ctrl}
        onChange={() => handleCheckBoxClick("ctrl", !keybind.bind.ctrl)}
      />
      <CheckboxWithLabel
        label="Super"
        checked={keybind.bind.super}
        onChange={() => handleCheckBoxClick("super", !keybind.bind.super)}
      />
      <CheckboxWithLabel
        label="Alt"
        checked={keybind.bind.alt}
        onChange={() => handleCheckBoxClick("alt", !keybind.bind.alt)}
      />
      <CheckboxWithLabel
        label="Shift"
        checked={keybind.bind.shift}
        onChange={() => handleCheckBoxClick("shift", !keybind.bind.shift)}
      />
      <InputField
        placeholder="Key..."
        value={keybind.bind.key}
        onChange={handleKeyChange}
        name="bind"
      />
      <button className="block accent" onClick={storeKeybind}>
        Store Keybind
      </button>
    </section>
  );
};
