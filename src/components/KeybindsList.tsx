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
        <div key={group} className="column keybindBlock">
          <div className="groupTitleBlock">
            <span
              className="groupTitle"
              style={{ backgroundColor: `${group.split(".")[1]}` }}
            >
              {group.split(".")[0]}
            </span>
          </div>
          {keybindsInGroup.map((keybind, index) => (
            <div className="actionKeybind" key={index}>
              <span>{keybind.action}</span>
              <span>{formatBind(keybind.bind)}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
