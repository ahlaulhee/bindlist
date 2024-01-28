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
