import ModalClient from "./ModalClient";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
}

export default function Modal(props: ModalProps) {
  return <ModalClient {...props} />;
}
