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
    class Semester(models.IntegerChoices):
        semester_one = 1
        semester_two = 2
    semester = models.IntegerField(choices=Semester.choices)
    academic_year = models.CharField(max_length=5)
    mandatory = models.BooleanField()
    course = models.ForeignKey(
        'Course', on_delete=models.CASCADE)
    program = models.ForeignKey(
        'Program',  on_delete=models.CASCADE)
    year_of_study = models.IntegerField()

    def __str__(self):
        return f'{self.course} for { self.program}'

    class Meta:
        unique_together = ['course', 'program', 'year_of_study']
        verbose_name = ("course in program")
        verbose_name_plural = ("courses in certain program")

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
        return self.user.username

    def get_absolute_url(self):
        return reverse("lecturer_detail", kwargs={"pk": self.pk})


class Lecture_Course(models.Model):
    lecturer = models.ForeignKey(
        'Lecturer', related_name='courses', on_delete=models.CASCADE)
    course = models.ForeignKey(
        'Course', related_name='lecturer', on_delete=models.CASCADE)
    academic_year = models.CharField(max_length=5)

    def __str__(self):
        return f'{self.course.course_code} taught by {self.lecturer.user.username}'

    class Meta:
        unique_together = ['lecturer', 'course', 'academic_year']
        verbose_name = ("course and lecture")
        verbose_name_plural = ("courses and lectures")

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


class CA_Item(models.Model):
    criteria_name = models.CharField(max_length=20, primary_key=True)

    def __str__(self):
        return self.criteria_name

    class Meta:
        verbose_name = ("assessment criteria")
        verbose_name_plural = ("assessment criterias")


class Assessment_Criteria(models.Model):
    criteria = models.ForeignKey(
        'CA_Item', related_name='assessment', on_delete=models.CASCADE)
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


class Assessment_Questions_Results(models.Model):
    score = models.IntegerField(validators=[MaxValueValidator(100)])
    total_score = models.IntegerField(validators=[MaxValueValidator(100)])
    question_number = models.IntegerField(validators=[MinValueValidator(1)])
    student = models.ForeignKey(
        'Student', related_name='assessment_result', on_delete=models.CASCADE)
    assessment = models.ForeignKey(
        'Assessment_Criteria', related_name='result', on_delete=models.CASCADE)

    def __str__(self):
        return f'assessment result'

    class Meta:
        unique_together = ['score', 'total_score',
                           'question_number', 'student', 'assessment']
        verbose_name = ("assessment result")
        verbose_name_plural = ("assessment results")

    class Meta:
        unique_together = ['score', 'total_score',
                           'question_number', 'student', 'assessment']


class UE(models.Model):
    venue = models.ManyToManyField('Venue', through='Course_Venue')
    # assuming total mark = 100
    exam_type_choices = (('sup', 'suplimentary'),
                         ('special', 'special'), ('UE', 'UE'),)
    exam_type = models.CharField(choices=exam_type_choices, max_length=30)
    course = models.ForeignKey(
        'Course', related_name='ue', on_delete=models.CASCADE)
    academic_year = models.CharField(max_length=5)
    date_taken = models.DateTimeField(verbose_name='Date', auto_now_add=True)
    # total_mark = models.IntegerField(verbose_name='Total marks',
    #                                  validators=[MaxValueValidator(100), MinValueValidator(0)])
    number_of_questions = models.IntegerField(
        validators=[MinValueValidator(1)])

    def __str__(self):
        return f'{self.exam_type} {self.academic_year}'

    class Meta:
        unique_together = ['course', 'exam_type', 'academic_year',
                           'date_taken', 'number_of_questions']
        verbose_name = ("University Exam")
        verbose_name_plural = ("University Exams")


class Venue(models.Model):
    venue_name = models.CharField(max_length=30, primary_key=True)

    def __str__(self):
        return self.venue_name


class Course_Venue(models.Model):
    paper = models.ForeignKey('UE',  on_delete=models.CASCADE)
    venue = models.ForeignKey('Venue', on_delete=models.CASCADE)
    head_supervisor = models.ForeignKey('Lecturer',  on_delete=models.CASCADE)
    da_te = models.DateTimeField()

    class Meta:
        unique_together = ['paper', 'venue']
        verbose_name = ("Course Venue")
        verbose_name_plural = ("Course Venue")

    def __str__(self):
        return

    def __unicode__(self):
        return


class UE_Questions_Results(models.Model):
    score = models.IntegerField(validators=[MaxValueValidator(100)])
    total_score = models.IntegerField(validators=[MaxValueValidator(100)])
    question_number = models.IntegerField(validators=[MinValueValidator(1)])
    student = models.ForeignKey(
        'Student', related_name='result', on_delete=models.CASCADE)
    ue = models.ForeignKey(
        'UE', related_name='result', on_delete=models.CASCADE)

    def __str__(self):
        return 'ue results'

    class Meta:
        unique_together = ['score', 'total_score',
                           'question_number', 'student', 'ue']
        verbose_name = ("University Exam Questions Result")
        verbose_name_plural = ("University Exam Questions Results")


class CA_Results(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    ca_item_1 = models.CharField(max_length=20)
    ca_item_2 = models.CharField(max_length=20)
    ca_item_3 = models.CharField(max_length=20)
    ca_item_4 = models.CharField(max_length=20)
    ca_item_5 = models.CharField(max_length=20)
    avarage_score = models.IntegerField()

    class Meta:
        unique_together = ['course', 'student']
        verbose_name = ("Continous Assessment Result")
        verbose_name_plural = ("Continous Assessment Results")

    def __str__(self):
        return f'{self.student} {self.avarage_score}'


class UE_Results(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    avarage_score = models.IntegerField()

    class Meta:
        unique_together = ['course', 'student']
        verbose_name = ("University Exam Result")
        verbose_name_plural = ("University Exam Results")

    def __str__(self):
        return f'{self.student} {self.avarage_score}'
#  todo adding questions marks reference
