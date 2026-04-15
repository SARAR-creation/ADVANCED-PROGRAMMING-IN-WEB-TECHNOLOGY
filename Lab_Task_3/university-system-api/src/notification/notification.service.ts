import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Injectable()
export class NotificationService {

  constructor(
    @Inject(forwardRef(() => EnrollmentService))
    private enrollmentService: EnrollmentService,
  ) {}

  sendNotification(studentName: string, message: string) {
    return {
      message: 'Notification sent',
      student: studentName,
      text: message
    };
  }

  checkEnrollmentAndNotify(studentName: string, courseId: string) {

    const enrollments = this.enrollmentService.getEnrollments();

    return {
      message: 'Checked enrollment and notified',
      student: studentName,
      courseId,
      enrollments
    };
  }
}