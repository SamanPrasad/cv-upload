interface Props {
  modalId: string;
}

function ScheduleInterviewButton({ modalId }: Props) {
  return (
    <button
      type="button"
      className="btn btn-outline-primary w-25"
      data-bs-toggle="modal"
      data-bs-target={"#" + modalId}
    >
      Schedule Interview
    </button>
  );
}

export default ScheduleInterviewButton;
