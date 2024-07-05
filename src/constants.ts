interface Config {
    SCHEDULED: number;
    STARTED: number;
    COMPLETED: number;
    NOT_PARTICIPATED: number;
    CANCELED: number;
  }

const config:Config = {
    SCHEDULED : 0, //Scheduled for interview
    STARTED: 1, // Interview started
    COMPLETED: 2, // Interview completed
    NOT_PARTICIPATED: 3, // Candidate did not participate
    CANCELED: 4, // Interview canceled
}

export default config;