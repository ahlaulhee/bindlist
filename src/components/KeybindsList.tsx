import { formatBind } from "../utils/formatUtils";
import { Keybind } from "../vite-env";

export function KeybindsList(keybinds: Keybind[]) {
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
    <div className="keybindListContainer">
      {Object.entries(groupedKeybinds).map(([group, keybindsInGroup]) => (
        <div key={group} className="column">
          <p className="groupTitle">{group}</p>
          {keybindsInGroup.map((keybind, index) => (
            <div key={index}>
              {formatBind(keybind.bind)} | {keybind.action}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
