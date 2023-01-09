import { CreateCourseDto } from '../dto/create.course.dto';
import { PatchCourseDto } from '../dto/patch.course.dto';
import { PutCourseDto } from '../dto/put.course.dto';
import debug from 'debug';
import mongooseService from './../../common/services/mongoose.service';

const log: debug.IDebugger = debug('app:courses-dao');

class CoursesDao {

  Schema = mongooseService.getMongoose().Schema;

  courseSchema = new this.Schema({
    code: { type: String, trim: true, required: true, unique: true },
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, default: '' },
    content: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
    },
    price: { type: Number, default: 0, min: 0 },
    releasedDate: {
      type: Date,
      required: true,
      default: Date.now
    },
  });

  Course = mongooseService.getMongoose().model('Courses', this.courseSchema);

  constructor() {
    log('New instance of CoursesDao has created!');
  }

  async addCourse(courseFields: CreateCourseDto): Promise<any> {
    const course = new this.Course({
      ...courseFields,
    });
    await course.save();
    return course;
  }

  async getCourseById(courseId: string): Promise<any> {
    return await this.Course.findById(courseId);
  }

  async getCourseByCode(code: string): Promise<any> {
    return this.Course.findOne({ code: code });
  }

  async getCourses(limit = 25, page = 0): Promise<any> {
    return this.Course.find()
      .limit(limit)
      .skip(limit * page).exec();
  }

  async updateCourseById(
    courseId: string,
    courseFields: PatchCourseDto | PutCourseDto): Promise<any> {
    const existingCourse = await this.Course.findOneAndUpdate(
      { _id: courseId },
      { $set: courseFields },
      { new: true }
    );

    return existingCourse;
  }

  async removeCourseById(courseId: string): Promise<any> {
    return this.Course.findByIdAndDelete(courseId);
  }
}

export default new CoursesDao();