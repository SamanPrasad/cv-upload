import { ReactElement } from "react";

interface Props {
  modalId: string;
  children: string;
}

function ScheduleInterviewButton({ modalId, children }: Props) {
  return (
    <button
      type="button"
      className="btn btn-outline-primary mt-3 mx-1 pt-1 pb-1 w-25"
      data-bs-toggle="modal"
      data-bs-target={"#" + modalId}
    >
      {children}
    </button>
  );
}

export default ScheduleInterviewButton;
