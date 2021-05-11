from django.db import models
from django.urls import reverse
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class Program(models.Model):
    program_name = models.CharField(max_length=50, primary_key=True)
    program_span = models.IntegerField(
        validators=[MaxValueValidator(4), MinValueValidator(1)])

    def __str__(self):
        return self.program_name


class Course(models.Model):
    course_code = models.CharField(max_length=50, primary_key=True)
    course_name = models.CharField(max_length=50)
    program = models.ManyToManyField("Program", through='Program_Course')

    def __str__(self):
        return self.course_code

    class Meta:
        verbose_name = ("course")
        verbose_name_plural = ("courses")

    def get_absolute_url(self):
        return reverse("course_detail", kwargs={"pk": self.pk})


class Program_Course(models.Model):
    course = models.ForeignKey(
        'Course', on_delete=models.CASCADE)
    program = models.ForeignKey(
        'Program',  on_delete=models.CASCADE)
    year_of_study = models.IntegerField()

    def __str__(self):
        pass

    class Meta:
        unique_together = ['course', 'program', 'year_of_study']


class Lecturer(models.Model):
    user = models.OneToOneField(
        "User", verbose_name=("user"), on_delete=models.CASCADE)
    role = models.ForeignKey(
        'Role', related_name='lecturer', on_delete=models.SET('empty'))

    class Meta:
        verbose_name = ("lecturer")
        verbose_name_plural = ("lecturers")

    def __str__(self):
        return self.user.last_name

    def get_absolute_url(self):
        return reverse("lecturer_detail", kwargs={"pk": self.pk})


class Lecture_Course(models.Model):
    lecturer = models.ForeignKey(
        'Lecturer', related_name='courses', on_delete=models.CASCADE)
    course = models.ForeignKey(
        'Course', related_name='lecturer', on_delete=models.CASCADE)
    academic_year = models.CharField(max_length=5)

    def __str__(self):
        pass

    class Meta:
        unique_together = ['lecturer', 'course', 'academic_year']


class Role(models.Model):
    role = models.CharField(max_length=30, primary_key=True)

    def __str__(self):
        return self.role


class Student(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    regno = models.CharField(max_length=13, primary_key=True)
    program = models.ForeignKey(
        'Program', related_name='program', on_delete=models.SET('empty'))

    class Meta:
        verbose_name = ("student")
        verbose_name_plural = ("students")

    def __str__(self):
        return self.regno

    def get_absolute_url(self):
        return reverse("student_detail", kwargs={"pk": self.pk})


class Assessment_Criteria(models.Model):
    criteria_name = models.CharField(max_length=20, primary_key=True)

    def __str__(self):
        return self.criteria_name


class Assessment(models.Model):
    criteria = models.ForeignKey(
        'Assessment_Criteria', related_name='assessment', on_delete=models.CASCADE)
    course = models.ForeignKey(
        'Course', related_name='assessment', on_delete=models.CASCADE)
    academic_year = models.CharField(max_length=5)
    date_taken = models.DateTimeField(verbose_name='Date', auto_now_add=True)
    total_mark = models.IntegerField(verbose_name='Total marks',
                                     validators=[MaxValueValidator(100), MinValueValidator(0)])
    number_of_questions = models.IntegerField(
        validators=[MinValueValidator(1)])
    contribution = models.IntegerField(verbose_name='Contribution in Percentage',
                                       validators=[MaxValueValidator(40), MinValueValidator(0)])

    def __str__(self):
        return f'{self.criteria} {self.academic_year}'

    class Meta:
        unique_together = ['course', 'contribution',
                           'criteria', 'academic_year', 'date_taken', 'total_mark', 'number_of_questions']


class Assessment_Results(models.Model):
    score = models.IntegerField(validators=[MaxValueValidator(100)])
    total_score = models.IntegerField(validators=[MaxValueValidator(100)])
    question_number = models.IntegerField(validators=[MinValueValidator(1)])
    student = models.ForeignKey(
        'Student', related_name='assessment_result', on_delete=models.CASCADE)
    assessment = models.ForeignKey(
        'Assessment', related_name='result', on_delete=models.CASCADE)

    def __str__(self):
        return

    def __unicode__(self):
        return

    class Meta:
        unique_together = ['score', 'total_score',
                           'question_number', 'student', 'assessment']


class UE(models.Model):
    exam_type = models.CharField(max_length=30)
    course = models.ForeignKey(
        'Course', related_name='ue', on_delete=models.CASCADE)
    academic_year = models.CharField(max_length=5)
    date_taken = models.DateTimeField(verbose_name='Date', auto_now_add=True)
    total_mark = models.IntegerField(verbose_name='Total marks',
                                     validators=[MaxValueValidator(100), MinValueValidator(0)])
    number_of_questions = models.IntegerField(
        validators=[MinValueValidator(1)])

    def __str__(self):
        return f'{self.criteria} {self.academic_year}'

    def __str__(self):
        return

    def __unicode__(self):
        return

    class Meta:
        unique_together = ['course', 'exam_type', 'academic_year',
                           'date_taken', 'total_mark', 'number_of_questions']


class UE_Results(models.Model):
    score = models.IntegerField(validators=[MaxValueValidator(100)])
    total_score = models.IntegerField(validators=[MaxValueValidator(100)])
    question_number = models.IntegerField(validators=[MinValueValidator(1)])
    student = models.ForeignKey(
        'Student', related_name='result', on_delete=models.CASCADE)
    ue = models.ForeignKey(
        'UE', related_name='result', on_delete=models.CASCADE)

    def __str__(self):
        return

    def __unicode__(self):
        return

    class Meta:
        unique_together = ['score', 'total_score',
                           'question_number', 'student', 'ue']
