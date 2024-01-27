import { useEffect, useState } from "react";
import "./App.css";
import { Bind, Keybind } from "./vite-env";

const emptyKeybind: Keybind = {
  action: "",
  bind: {
    ctrl: false,
    super: false,
    alt: false,
    shift: false,
    key: "",
  },
  category: "",
};

function App() {
  const [keybinds, setKeybinds] = useState<Keybind[]>([]);
  const [keybind, setKeybind] = useState<Keybind>(emptyKeybind);

  useEffect(() => {
    // TODO: Load keybinds from LocalStorage
    setKeybinds([]);
  }, []);

  const storeKeybind = () => {
    if (!keybind.action || !keybind.category || !keybind.bind.key) return;
    keybinds.push(keybind);
    setKeybind(emptyKeybind);
    // TODO: Save to LocalStorage
    console.log(keybind);
    console.log(keybinds);
  };

  const formatBind = (bind: Bind) => {
    return `${bind.ctrl ? "Ctrl+" : ""}${bind.super ? "Super+" : ""}${
      bind.alt ? "Alt+" : ""
    }${bind.shift ? "Shift+" : ""}${bind.key}`;
  };

  const exportJSON = () => {
    // TODO: Retrieve from localstorage and download .json
  };

  const importJSON = () => {
    // TODO: Save .json data to localstorage and modify state
  };

  return (
    <>
      <section>
        <button className="block accent">Listen to keys</button>
        <div className="wrapper block">
          <input
            type="text"
            placeholder="Action..."
            value={keybind.action}
            onChange={(e) => setKeybind({ ...keybind, action: e.target.value })}
          />
        </div>
        <div className="wrapper block">
          <input
            type="text"
            placeholder="Category..."
            value={keybind.category}
            onChange={(e) =>
              setKeybind({ ...keybind, category: e.target.value })
            }
          />
        </div>
        <CheckboxWithLabel
          label="Control"
          checked={keybind.bind.ctrl}
          onChange={() =>
            setKeybind({
              ...keybind,
              bind: { ...keybind.bind, ctrl: !keybind.bind.ctrl },
            })
          }
        />
        <CheckboxWithLabel
          label="Super"
          checked={keybind.bind.super}
          onChange={() =>
            setKeybind({
              ...keybind,
              bind: { ...keybind.bind, super: !keybind.bind.super },
            })
          }
        />
        <CheckboxWithLabel
          label="Alt"
          checked={keybind.bind.alt}
          onChange={() =>
            setKeybind({
              ...keybind,
              bind: { ...keybind.bind, alt: !keybind.bind.alt },
            })
          }
        />
        <CheckboxWithLabel
          label="Shift"
          checked={keybind.bind.shift}
          onChange={() =>
            setKeybind({
              ...keybind,
              bind: { ...keybind.bind, shift: !keybind.bind.shift },
            })
          }
        />
        <div className="wrapper block">
          <input
            type="text"
            placeholder="Key..."
            value={keybind.bind.key}
            onChange={(e) =>
              setKeybind({
                ...keybind,
                bind: { ...keybind.bind, key: e.target.value },
              })
            }
          />
        </div>
        <button className="block accent" onClick={storeKeybind}>
          Store Keybind
        </button>
      </section>
      <section className="block">
        {keybinds.map((keybind, i) => {
          return (
            <div className="block" key={i}>
              {formatBind(keybind.bind)} | {keybind.action} | {keybind.category}
            </div>
          );
        })}
      </section>
      <section>
        <button className="block accent" onClick={exportJSON}>
          Export JSON
        </button>
        <button className="block accent" onClick={importJSON}>
          Import JSON
        </button>
      </section>
    </>
  );
}

function CheckboxWithLabel({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="block" onClick={onChange}>
      <input type="checkbox" checked={checked} readOnly />
      <label>{label}</label>
    </div>
  );
}

export default App;
