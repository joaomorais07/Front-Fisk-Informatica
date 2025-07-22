// utils/showAlert.ts
import Swal, { SweetAlertIcon } from "sweetalert2";

interface AlertOptions {
  title: string;
  html?: string;
  text?: string;
  icon?: SweetAlertIcon;
  confirmText?: string;
  showCancel?: boolean;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  customRender?: () => void;
  width?: number;
}

export function showAlert({
  title,
  html,
  text,
  icon = "info",
  confirmText = "Confirmar",
  showCancel = false,
  cancelText = "Cancelar",
  confirmColor = "#3085d6",
  cancelColor = "#aaa",
  onConfirm,
  onCancel,
  customRender,
  width = 420,
}: AlertOptions) {
  Swal.fire({
    title: `<strong>${title}</strong>`,
    html,
    text,
    icon,
    showCancelButton: showCancel,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: confirmColor,
    cancelButtonColor: cancelColor,
    allowOutsideClick: false,
    width,
    position: "center",
    customClass: {
      popup: "custom-swal-center",
    },
    didRender: () => {
      if (customRender) customRender();
    },
  }).then((result) => {
    if (result.isConfirmed && onConfirm) onConfirm();
    if (result.dismiss === Swal.DismissReason.cancel && onCancel) onCancel();
  });
}
