import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class EducationService {
  constructor(private readonly prisma: PrismaService) {}

  // CATEGORIES
  async createCategory(data: any) {
    return this.prisma.les_education_category.create({ data });
  }

  async findAllCategories() {
    return this.prisma.les_education_category.findMany();
  }

  async findCategory(id: string) {
    const category = await this.prisma.les_education_category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async updateCategory(id: string, data: any) {
    await this.findCategory(id);
    return this.prisma.les_education_category.update({ where: { id }, data });
  }

  async removeCategory(id: string) {
    await this.findCategory(id);
    return this.prisma.les_education_category.delete({ where: { id } });
  }

  // COURSES
  async createCourse(data: any) {
    return this.prisma.les_education_course.create({ data });
  }

  async findAllCourses() {
    return this.prisma.les_education_course.findMany({ 
      include: { 
        les_category: true,
        les_module: { select: { id: true } }
      } 
    });
  }

  async findCourse(id: string) {
    const course = await this.prisma.les_education_course.findUnique({ where: { id }, include: { les_category: true, les_module: true } });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async updateCourse(id: string, data: any) {
    await this.findCourse(id);
    return this.prisma.les_education_course.update({ where: { id }, data });
  }

  async removeCourse(id: string) {
    await this.findCourse(id);
    return this.prisma.les_education_course.delete({ where: { id } });
  }

  // MODULES
  async createModule(courseId: string, data: any) {
    await this.findCourse(courseId);
    return this.prisma.les_education_module.create({ data: { ...data, course_id: courseId } });
  }

  async findModulesByCourse(courseId: string) {
    await this.findCourse(courseId);
    return this.prisma.les_education_module.findMany({ where: { course_id: courseId }, orderBy: { order_index: 'asc' } });
  }

  async findModule(id: string) {
    const module = await this.prisma.les_education_module.findUnique({ where: { id } });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }

  async updateModule(id: string, data: any) {
    await this.findModule(id);
    return this.prisma.les_education_module.update({ where: { id }, data });
  }

  async removeModule(id: string) {
    await this.findModule(id);
    return this.prisma.les_education_module.delete({ where: { id } });
  }

  // PROGRESS
  async updateCourseProgress(userId: string, courseId: string, data: any) {
    const record = await this.prisma.les_user_education_progress.upsert({
      where: { user_id_course_id: { user_id: userId, course_id: courseId } },
      create: { user_id: userId, course_id: courseId, is_completed: data.is_completed, completed_at: data.is_completed ? new Date() : null },
      update: { is_completed: data.is_completed, completed_at: data.is_completed ? new Date() : null }
    });
    return record;
  }

  async getCourseProgress(userId: string, courseId: string) {
    return this.prisma.les_user_education_progress.findUnique({
      where: { user_id_course_id: { user_id: userId, course_id: courseId } }
    });
  }

  async updateModuleProgress(userId: string, moduleId: string, data: any) {
    const record = await this.prisma.les_user_module_progress.upsert({
      where: { user_id_module_id: { user_id: userId, module_id: moduleId } },
      create: { user_id: userId, module_id: moduleId, is_completed: data.is_completed, completed_at: data.is_completed ? new Date() : null },
      update: { is_completed: data.is_completed, completed_at: data.is_completed ? new Date() : null }
    });
    return record;
  }

  async getModuleProgress(userId: string, moduleId: string) {
    return this.prisma.les_user_module_progress.findUnique({
      where: { user_id_module_id: { user_id: userId, module_id: moduleId } }
    });
  }

  async getUserProgress(userId: string) {
    const courseProgress = await this.prisma.les_user_education_progress.findMany({ where: { user_id: userId } });
    const moduleProgress = await this.prisma.les_user_module_progress.findMany({ where: { user_id: userId } });
    return { courseProgress, moduleProgress };
  }
}
