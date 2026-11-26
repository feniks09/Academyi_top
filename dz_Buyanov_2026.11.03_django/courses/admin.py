from django.contrib import admin
from .models import Instructor, Category, Course, Student, Enrollment


class EnrollmentInline(admin.TabularInline):
    model = Enrollment
    extra = 1
    raw_id_fields = ('student',)


class CourseInline(admin.TabularInline):
    model = Course
    extra = 1
    fields = ('title', 'level', 'price', 'is_published')


class StudentEnrollmentInline(admin.TabularInline):
    model = Enrollment
    extra = 1
    raw_id_fields = ('course',)


@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ('last_name', 'first_name', 'email', 'specialization', 'rating', 'is_active')
    list_filter = ('is_active', 'specialization')
    search_fields = ('first_name', 'last_name', 'email')
    inlines = [CourseInline]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'parent')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'instructor', 'category', 'level', 'price', 'is_published', 'free_spots')
    list_filter = ('level', 'is_published', 'category')
    search_fields = ('title', 'description')
    list_editable = ('is_published',)
    inlines = [EnrollmentInline]

    @admin.display(description='Свободные места')
    def free_spots(self, obj):
        return obj.free_spots


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('last_name', 'first_name', 'email', 'registration_date')
    search_fields = ('first_name', 'last_name', 'email')
    inlines = [StudentEnrollmentInline]


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'status', 'progress', 'grade', 'enrollment_date')
    list_filter = ('status', 'course')
    search_fields = ('student__last_name', 'course__title')
    raw_id_fields = ('student', 'course')