import store from "store2";
import { Keybind } from "../vite-env";

export const exportJSON = () => {
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

export const importJSON = (
  event: React.ChangeEvent<HTMLInputElement>,
  callback: (jsonData: Keybind[]) => void
) => {
  // TODO: Add a popup notification
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        try {
          const jsonData = JSON.parse(e.target.result as string);
          callback(jsonData); // Invoke the callback with the parsed JSON data
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
