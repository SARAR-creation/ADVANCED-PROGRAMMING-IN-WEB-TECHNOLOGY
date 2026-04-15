import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {

  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  send(@Body() body: any) {
    return this.notificationService.sendNotification(
      body.studentName,
      body.message
    );
  }

  @Post('check')
  check(@Body() body: any) {
    return this.notificationService.checkEnrollmentAndNotify(
      body.studentName,
      body.courseId
    );
  }
}