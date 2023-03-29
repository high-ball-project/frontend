import { Modal as _Modal, ModalFuncProps } from "antd";

const Modal = _Modal as typeof _Modal & {
  confirmAsync: (props: ModalFuncProps) => Promise<boolean>;
};

Modal.confirmAsync = (props) =>
  new Promise((resolve) =>
    Modal.confirm({
      ...props,
      onOk: (...args) => {
        props.onOk?.(args);
        resolve(true);
      },
      onCancel: (...args) => {
        props.onCancel?.(args);
        resolve(false);
      },
    })
  );

export default Modal;
