import { useEffect, useState } from "react";
import "./App.css";
import { Bind, Keybind } from "./vite-env";
import store from "store2";

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

  const exportJSON = () => {
    // TODO: Add a popup notification
    const keybinds = store.get("userKeybinds");
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "_");
    const blob = new Blob([keybinds], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `userKeybinds_${formattedDate}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Add a popup notification
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          try {
            const jsonData: Keybind[] = JSON.parse(e.target.result as string);
            setKeybinds(jsonData);
            console.log(jsonData);
          } catch (error) {
            console.error("Error parsing JSON file:", error);
          }
        } else {
          console.error("Empty or null result from FileReader");
        }
      };
      reader.readAsText(file);
    }
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
            onChange={importJSON}
          />
        </div>
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

const formatBind = (bind: Bind) => {
  return `${bind.ctrl ? "Ctrl+" : ""}${bind.super ? "Super+" : ""}${
    bind.alt ? "Alt+" : ""
  }${bind.shift ? "Shift+" : ""}${bind.key}`;
};

function KeybindsList(keybinds: Keybind[]) {
  // TODO: Style this component
  const groupedKeybinds: { [key: string]: Keybind[] } = {};
  keybinds.forEach((keybind) => {
    const group = keybind.category;
    if (!groupedKeybinds[group]) {
      groupedKeybinds[group] = [];
    }
    groupedKeybinds[group].push(keybind);
  });

  return (
    <div>
      {Object.entries(groupedKeybinds).map(([group, keybindsInGroup]) => (
        <div key={group}>
          <h3>{group}</h3>
          {keybindsInGroup.map((keybind, index) => (
            <div className="block" key={index}>
              {formatBind(keybind.bind)} | {keybind.action}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
