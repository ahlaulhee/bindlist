import { useEffect, useState } from "react";
import "./App.css";
import { Keybind } from "./vite-env";
import store from "store2";
import { exportJSON, importJSON } from "./utils/jsonUtils";
import { KeybindsList } from "./components/KeybindsList";

import { IoMdSettings, IoMdDocument, IoMdBrush } from "react-icons/io";
import { TopBar } from "./components/TopBar";

// TODO: Refactor most of the code
// TODO: Allow updates?
// TODO: Allow multiple selection for deletion
// TODO: Allow the user to theme the page and save and load the theme from localstorage
// TODO: Add validations

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
  color: "#ec6a88",
};

function App() {
  const [keybinds, setKeybinds] = useState<Keybind[]>([]);
  const [keybind, setKeybind] = useState<Keybind>(emptyKeybind);
  const [hideTopBar, setHideTopBar] = useState<boolean>(false);
  const [hideBottomBar, setHideBottomBar] = useState<boolean>(false);

  useEffect(() => {
    const keybinds = store.get("userKeybinds");
    const convertedKeybinds: Keybind[] = JSON.parse(keybinds);
    setKeybinds(convertedKeybinds || []);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setKeybind((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckBoxClick = (key: string, value: boolean) => {
    setKeybind({
      ...keybind,
      bind: { ...keybind.bind, [key]: value },
    });
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeybind({
      ...keybind,
      bind: { ...keybind.bind, key: value },
    });
  };

  const BottomBar = () => {
    return (
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
    );
  };

  return (
    <>
      <div className="settings">
        <IoMdSettings
          onClick={() => setHideTopBar(!hideTopBar)}
          size={30}
          style={{ color: "#ffffff" }}
        />
        <IoMdDocument
          onClick={() => setHideBottomBar(!hideBottomBar)}
          size={30}
          style={{ color: "#ffffff" }}
        />
        <IoMdBrush size={30} style={{ color: "#ffffff" }} />
      </div>
      {!hideTopBar ? (
        <TopBar
          keybind={keybind}
          handleInputChange={handleInputChange}
          handleKeyChange={handleKeyChange}
          handleCheckBoxClick={handleCheckBoxClick}
          storeKeybind={storeKeybind}
        />
      ) : null}
      <main>{KeybindsList(keybinds)}</main>
      {!hideBottomBar ? <BottomBar /> : null}
    </>
  );
}

export default App;
