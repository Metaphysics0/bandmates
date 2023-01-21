import { useEffect } from "react";

export default function useCloseModalOnEscape(
  setShouldShowModal: React.Dispatch<boolean>
) {
  return useEffect(() => {
    const closeModalOnEscape = (e: KeyboardEvent | any): void => {
      if (e.key === "Escape") setShouldShowModal(false);
    };
    document.addEventListener("keydown", closeModalOnEscape);
    return () => {
      document.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [setShouldShowModal]);
}
