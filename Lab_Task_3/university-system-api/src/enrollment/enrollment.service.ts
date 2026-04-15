import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class EnrollmentService {

  constructor(
    private courseService: CourseService,

    @Inject(forwardRef(() => NotificationService))
    private notificationService: NotificationService,
  ) {}

  getEnrollments() {
    return { message: 'All enrollments fetched', data: [] };
  }

  enrollStudent(studentName: string, courseId: string) {

    const course = this.courseService.getCourseById(courseId);

    const notification = this.notificationService.sendNotification(
      studentName,
      'Enrollment successful'
    );

    return {
      message: 'Student enrolled successfully',
      student: studentName,
      course,
      notification
    };
  }
}