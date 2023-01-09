import { CRUD } from '../../common/interfaces/crud.interface';
import CourseDao from '../daos/courses.dao';
import { CourseDto } from './../dto/course.dto';
import { CreateCourseDto } from '../dto/create.course.dto';
import { PatchCourseDto } from '../dto/patch.course.dto';
import { PutCourseDto } from '../dto/put.course.dto';
import debug from 'debug';

const log: debug.IDebugger = debug('app:course-service');

class CoursesService implements CRUD<CourseDto, CreateCourseDto, PutCourseDto, PatchCourseDto> {

  async create(resource: CreateCourseDto) {
    log('creating course', resource);
    const course = await CourseDao.addCourse(resource);
    return course;
  }

  async deleteById(id: string) {
    log(`delete course by id: ${id}`);
    return CourseDao.removeCourseById(id);
  }

  async list(limit: number, page: number) {
    log(`list courses with limit: ${limit}, page: ${page}`);
    var courses = await CourseDao.getCourses(limit, page);
    return courses.map((items: CourseDto[]) => items);
  }

  async patchById(id: string, resource: PatchCourseDto) {
    log('patch course', resource);
    var course = await CourseDao.updateCourseById(id, resource);
    return course;
  }

  async getById(id: string) {
    log('read course by id', id);
    var course = await CourseDao.getCourseById(id);
    return course;
  }

  async putById(id: string, resource: PutCourseDto) {
    log('put course', resource);
    var course = await CourseDao.updateCourseById(id, resource);
    return course;
  }

  async getCourseByCode(code: string) {
    log('get course by code', code);
    var course = await CourseDao.getCourseByCode(code);
    return course;
  }
}

export default new CoursesService();