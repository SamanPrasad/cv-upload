interface Props {
  candidateDetails: {
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    candidateStack: string;
    candidatePosition: string;
    candidateCvUrl: string;
  };
}

function CandidateDetails({ candidateDetails }: Props) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-8">
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
              <div className="col-sm-12 col-lg-6">
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
              <div className="col-sm-12 col-lg-6 mt-3 mt-lg-0">
                <div className="px-3 py-2 cv-detail-item">
                  <p>
                    <span className="me-3">
                      <strong>Email</strong>
                    </span>
                    <span>
                      <strong>:</strong>
                    </span>
                    <span className="ms-3">{candidateDetails?.candidateEmail}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-sm-12 col-lg-6">
                <div className="px-3 py-2 cv-detail-item">
                  <p>
                    <span className="me-3">
                      <strong>Stack</strong>
                    </span>
                    <span>
                      <strong>:</strong>
                    </span>
                    <span className="ms-3">{candidateDetails?.candidateStack}</span>
                  </p>
                </div>
              </div>
              <div className="col-sm-12 col-lg-6 mt-3 mt-lg-0">
                <div className="px-3 py-2 cv-detail-item">
                  <p>
                    <span className="me-3">
                      <strong>Position</strong>
                    </span>
                    <span>
                      <strong>:</strong>
                    </span>
                    <span className="ms-3">{candidateDetails?.candidatePosition}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <a href={candidateDetails?.candidateCvUrl} className="cv-anchor btn btn-outline-primary  mt-3 mx-1 pt-0 pb-1 px-5" target="_blank">
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
