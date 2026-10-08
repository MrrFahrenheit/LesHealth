import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EducationService } from './education.service';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post('categories')
  createCategory(@Body() createCategoryDto: any) {
    return this.educationService.createCategory(createCategoryDto);
  }

  @Get('categories')
  findAllCategories() {
    return this.educationService.findAllCategories();
  }

  @Get('categories/:id')
  findCategory(@Param('id') id: string) {
    return this.educationService.findCategory(id);
  }

  @Patch('categories/:id')
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: any) {
    return this.educationService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  removeCategory(@Param('id') id: string) {
    return this.educationService.removeCategory(id);
  }

  @Post('courses')
  createCourse(@Body() createCourseDto: any) {
    return this.educationService.createCourse(createCourseDto);
  }

  @Get('courses')
  findAllCourses() {
    return this.educationService.findAllCourses();
  }

  @Get('courses/:id')
  findCourse(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.educationService.findCourse(id);
  }

  @Patch('courses/:id')
  updateCourse(@Param('id') id: string, @Body() updateCourseDto: any) {
    return this.educationService.updateCourse(id, updateCourseDto);
  }

  @Delete('courses/:id')
  removeCourse(@Param('id') id: string) {
    return this.educationService.removeCourse(id);
  }

  @Post('courses/:courseId/modules')
  createModule(@Param('courseId') courseId: string, @Body() createModuleDto: any) {
    return this.educationService.createModule(courseId, createModuleDto);
  }

  @Get('courses/:courseId/modules')
  findModulesByCourse(@Param('courseId') courseId: string) {
    return this.educationService.findModulesByCourse(courseId);
  }

  @Get('modules/:id')
  findModule(@Param('id') id: string) {
    return this.educationService.findModule(id);
  }

  @Patch('modules/:id')
  updateModule(@Param('id') id: string, @Body() updateModuleDto: any) {
    return this.educationService.updateModule(id, updateModuleDto);
  }

  @Delete('modules/:id')
  removeModule(@Param('id') id: string) {
    return this.educationService.removeModule(id);
  }

  @Post('progress/courses/:courseId/users/:userId')
  updateCourseProgress(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
    @Body() data: any
  ) {
    return this.educationService.updateCourseProgress(userId, courseId, data);
  }

  @Get('progress/courses/:courseId/users/:userId')
  getCourseProgress(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string
  ) {
    return this.educationService.getCourseProgress(userId, courseId);
  }

  @Post('progress/modules/:moduleId/users/:userId')
  updateModuleProgress(
    @Param('moduleId') moduleId: string,
    @Param('userId') userId: string,
    @Body() data: any
  ) {
    return this.educationService.updateModuleProgress(userId, moduleId, data);
  }

  @Get('progress/modules/:moduleId/users/:userId')
  getModuleProgress(
    @Param('moduleId') moduleId: string,
    @Param('userId') userId: string
  ) {
    return this.educationService.getModuleProgress(userId, moduleId);
  }

  @Get('users/:userId/progress')
  getUserProgress(@Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string) {
    return this.educationService.getUserProgress(userId);
  }
}
