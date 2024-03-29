import Bee from 'bee-queue';
import SuccessEnrollmentMail from '../app/jobs/SuccessEnrollmentMail';
import CreateHelpOrderMail from '../app/jobs/CreateHelpOrderMail';
import AnswerHelpOrder from '../app/jobs/AnswerHelpOrder';
import redisConfig from '../config/redis';

const jobs = [SuccessEnrollmentMail, CreateHelpOrderMail, AnswerHelpOrder];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
