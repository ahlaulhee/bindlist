import { formatBind } from "../utils/formatUtils";
import { Keybind } from "../vite-env";

export function KeybindsList(keybinds: Keybind[]) {
  // TODO: Add more varierty to group colors
  if (!keybinds) {
    return null;
  }
  const groupedKeybinds: { [key: string]: Keybind[] } = {};
  keybinds.forEach((keybind) => {
    const group = keybind.category;
    const color = keybind.color;
    if (!groupedKeybinds[`${group}.${color}`]) {
      groupedKeybinds[`${group}.${color}`] = [];
    }
    groupedKeybinds[`${group}.${color}`].push(keybind);
  });

  return (
    <div className="keybindListContainer">
      {Object.entries(groupedKeybinds).map(([group, keybindsInGroup]) => (
        <div key={group} className="column">
          <p
            className="groupTitle"
            style={{ backgroundColor: `${group.split(".")[1]}` }}
          >
            {group.split(".")[0]}
          </p>
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
