interface Props {
  candidateDetails: {
    userId: number;
    candidateName: string;
    email: string;
    stack: string;
    position: string;
    cvUrl: string;
  };
}

function CandidateDetails({ candidateDetails }: Props) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row justify-content-center">
            <h1 className="mt-5 pb-1 text-center display-2">
              Candidate Details
            </h1>
          </div>
          <div className="row justify-content-center pb-4">
            <div className="col-7">
              <div className="cv-divider"></div>
            </div>
          </div>
          <div className="container">
            <div className="row my-3">
              <div className="col-6">
                <div className="px-3 py-2 cv-detail-item">
                  <p>
                    <span className="me-3">
                      <strong>Full Name</strong>
                    </span>
                    <span>
                      <strong>:</strong>
                    </span>
                    <span className="ms-3">
                      {candidateDetails?.candidateName}
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="px-3 py-2 cv-detail-item">
                  <p>
                    <span className="me-3">
                      <strong>E-Mail</strong>
                    </span>
                    <span>
                      <strong>:</strong>
                    </span>
                    <span className="ms-3">{candidateDetails?.email}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-6">
                <div className="px-3 py-2 cv-detail-item">
                  <p>
                    <span className="me-3">
                      <strong>Stack</strong>
                    </span>
                    <span>
                      <strong>:</strong>
                    </span>
                    <span className="ms-3">{candidateDetails?.stack}</span>
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="px-3 py-2 cv-detail-item">
                  <p>
                    <span className="me-3">
                      <strong>Position</strong>
                    </span>
                    <span>
                      <strong>:</strong>
                    </span>
                    <span className="ms-3">{candidateDetails?.position}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <button
                type="button"
                className="btn btn-outline-primary  mt-3 mx-1 pt-0 pb-1 w-25"
              >
                <a href={candidateDetails?.cvUrl} className="cv-anchor">
                  Download CV
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
