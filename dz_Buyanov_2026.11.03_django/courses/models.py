from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


# 1. Преподаватель
class Instructor(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Имя")
    last_name = models.CharField(max_length=100, verbose_name="Фамилия")
    email = models.EmailField(unique=True, verbose_name="Email")
    specialization = models.CharField(max_length=200, verbose_name="Специализация")
    rating = models.DecimalField(
        max_digits=3, decimal_places=1,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        verbose_name="Рейтинг"
    )
    start_date = models.DateField(verbose_name="Дата начала работы")
    bio = models.TextField(verbose_name="Биография")
    is_active = models.BooleanField(default=True, verbose_name="Активен")

    class Meta:
        verbose_name = "Преподаватель"
        verbose_name_plural = "Преподаватели"
        ordering = ['-rating', 'last_name']

    def __str__(self):
        return f"{self.last_name} {self.first_name} ({self.specialization})"


# 2. Категория (self-referencing)
class Category(models.Model):
    name = models.CharField(max_length=200, unique=True, verbose_name="Название")
    description = models.TextField(blank=True, verbose_name="Описание")
    slug = models.SlugField(unique=True, verbose_name="Slug")
    parent = models.ForeignKey(
        'self', on_delete=models.SET_NULL,
        null=True, blank=True, related_name='subcategories',
        verbose_name="Родительская категория"
    )

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ['name']

    def __str__(self):
        return self.name


# 3. Курс
class Course(models.Model):
    class DifficultyLevel(models.TextChoices):
        BEGINNER = 'beginner', 'Начальный'
        INTERMEDIATE = 'intermediate', 'Средний'
        ADVANCED = 'advanced', 'Продвинутый'

    title = models.CharField(max_length=200, verbose_name="Название")
    instructor = models.ForeignKey(
        Instructor, on_delete=models.CASCADE,
        related_name='courses', verbose_name="Преподаватель"
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE,
        related_name='courses', verbose_name="Категория"
    )
    description = models.TextField(verbose_name="Описание")
    duration_hours = models.PositiveIntegerField(verbose_name="Длительность (часы)")
    level = models.CharField(
        max_length=20, choices=DifficultyLevel.choices,
        default=DifficultyLevel.BEGINNER, verbose_name="Уровень сложности"
    )
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")
    is_published = models.BooleanField(default=False, verbose_name="Опубликован")
    available_spots = models.PositiveIntegerField(
        null=True, blank=True, verbose_name="Количество мест"
    )

    class Meta:
        verbose_name = "Курс"
        verbose_name_plural = "Курсы"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    @property
    def free_spots(self):
        """Свободные места. None = безлимит."""
        if self.available_spots is None:
            return "Безлимит"
        return max(0, self.available_spots - self.enrollments.count())


# 4. Студент
class Student(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Имя")
    last_name = models.CharField(max_length=100, verbose_name="Фамилия")
    email = models.EmailField(unique=True, verbose_name="Email")
    registration_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата регистрации")
    courses = models.ManyToManyField(
        Course, through='Enrollment',
        related_name='students', verbose_name="Курсы"
    )

    class Meta:
        verbose_name = "Студент"
        verbose_name_plural = "Студенты"
        ordering = ['-registration_date']

    def __str__(self):
        return f"{self.last_name} {self.first_name}"

    def get_completed_courses(self):
        """Завершённые курсы студента."""
        return Course.objects.filter(
            enrollments__student=self,
            enrollments__status=Enrollment.Status.COMPLETED
        )


# 5. Запись на курс (промежуточная)
class Enrollment(models.Model):
    class Status(models.TextChoices):
        IN_PROGRESS = 'in_progress', 'В процессе'
        COMPLETED = 'completed', 'Завершен'
        CANCELED = 'canceled', 'Отменен'

    student = models.ForeignKey(
        Student, on_delete=models.CASCADE,
        related_name='enrollments', verbose_name="Студент"
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE,
        related_name='enrollments', verbose_name="Курс"
    )
    enrollment_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата записи")
    status = models.CharField(
        max_length=20, choices=Status.choices,
        default=Status.IN_PROGRESS, verbose_name="Статус"
    )
    progress = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name="Прогресс в %"
    )
    grade = models.PositiveIntegerField(
        null=True, blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name="Оценка"
    )

    class Meta:
        verbose_name = "Запись на курс"
        verbose_name_plural = "Записи на курсы"
        ordering = ['-enrollment_date']
        unique_together = ('student', 'course')

    def __str__(self):
        return f"{self.student} → {self.course} ({self.get_status_display()})"
