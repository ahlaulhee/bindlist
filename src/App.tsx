import { useEffect, useState } from "react";
import "./App.css";
import { Keybind } from "./vite-env";
import store from "store2";
import { exportJSON, importJSON } from "./utils/jsonUtils";
import { CheckboxWithLabel } from "./components/CheckboxWithLabel";
import { KeybindsList } from "./components/KeybindsList";
import { InputField } from "./components/InputField";

// TODO: Refactor most of the code
// TODO: Allow updates?
// TODO: Allow multiple selection for deletion

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
    const keybinds = store.get("userKeybinds");
    const convertedKeybinds: Keybind[] = JSON.parse(keybinds);
    setKeybinds(convertedKeybinds);
  }, []);

  const storeKeybind = () => {
    // TODO: Add a popup notification
    if (!keybind.action || !keybind.category || !keybind.bind.key) return;
    keybinds.push(keybind);
    store.set("userKeybinds", JSON.stringify(keybinds));
    setKeybind(emptyKeybind);
  };

  const importJSONFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    importJSON(event, (jsonData) => {
      if (jsonData.length > 0) setKeybinds(jsonData);
    });
  };

  return (
    <>
      <section>
        <button className="block accent">Listen to keys</button>
        <InputField
          placeholder="Action..."
          value={keybind.action}
          onChange={(e) => setKeybind({ ...keybind, action: e.target.value })}
        />

        <InputField
          placeholder="Category..."
          value={keybind.category}
          onChange={(e) => setKeybind({ ...keybind, category: e.target.value })}
        />
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
        <InputField
          placeholder="Key..."
          value={keybind.bind.key}
          onChange={(e) =>
            setKeybind({
              ...keybind,
              bind: { ...keybind.bind, key: e.target.value },
            })
          }
        />
        <button className="block accent" onClick={storeKeybind}>
          Store Keybind
        </button>
      </section>
      <section className="block">{KeybindsList(keybinds)}</section>
      <section>
        <button className="block accent" onClick={exportJSON}>
          Export JSON
        </button>
        <div className="wrapper block">
          <input
            type="file"
            accept=".json"
            className="block"
            onChange={importJSONFile}
          />
        </div>
      </section>
    </>
  );
}

export default App;
