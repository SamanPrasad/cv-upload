interface Props {
  modalId: string;
}

function ScheduleInterviewModal({ modalId }: Props) {
  return (
    <div
      className="modal fade modal-dialog modal-dialog-centered cv-modal-position"
      id={modalId}
      aria-hidden="true"
      style={{ display: "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Schedule Interview</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <label htmlFor="interview" className="me-3">
              Select Date and Time:
            </label>
            <input
              className="border rounded"
              type="datetime-local"
              id="interview"
              name="interview"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleInterviewModal;
