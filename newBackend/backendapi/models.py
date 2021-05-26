from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MinValueValidator, MaxValueValidator
from django.urls import reverse
from rest_framework.authtoken.models import Token


class Role(models.Model):
    role_name = models.CharField(max_length=20, null=False)

    def __str__(self):
        return self.role_name


class Course(models.Model):
    course_code = models.CharField(max_length=50, primary_key=True)
    course_name = models.CharField(max_length=50)
    program = models.ManyToManyField("Program", through='Program_Course')

    def __str__(self):
        return self.course_code

    class Meta:
        verbose_name = "course"
        verbose_name_plural = "courses"

    def get_absolute_url(self):
        return reverse("course_detail", kwargs={"pk": self.pk})


class CA_Item(models.Model):
    ca_item_name = models.CharField(max_length=20, primary_key=True)

    def __str__(self):
        return self.ca_item_name


class Lecturer(models.Model):
    lecturer = models.OneToOneField(
        User, on_delete=models.PROTECT, primary_key=True)
    # role_name = models.CharField(max_length=20, null=False, default='Lecturer')
    role = models.ForeignKey(Role, on_delete=models.PROTECT, null=True)
    course = models.ManyToManyField(Course, through='Lecture_Course')
    criteria = models.ManyToManyField(CA_Item, through='LecturerCriteria')

    def __str__(self):
        return str(self.lecturer)

    class Meta:
        verbose_name = "lecturer"
        verbose_name_plural = "lecturers"
        unique_together = ['lecturer', 'role']

    def get_absolute_url(self):
        return reverse("lecturer_detail", kwargs={"pk": self.pk})


@receiver(post_save, sender=User)
def add_lecturer_details_for_new_user(sender, instance=None, created=False, **kwargs):
    if created:
        lecturer = Lecturer(lecturer=instance)
        lecturer.save()


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Program(models.Model):
    program_name = models.CharField(max_length=50, primary_key=True)
    program_span = models.IntegerField(validators=[
        MaxValueValidator(4),
        MinValueValidator(1),
    ])

    def __str__(self):
        return self.program_name


class Program_Course(models.Model):
    ACADEMIC_YEAR = (
        ('a', '2020/2021'),
        ('b', '2021/2022'),
        ('c', '2022/2023'),
        ('d', '2023/2024'),
        ('e', '2024/2025'),
        ('f', '2025/2026'),
    )

    COURSE_TYPE = (
        ('core', 'Core'), ('optional', 'Optional')
    )

    YEARS_OF_STUDY = (
        ('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')
    )

    course = models.ForeignKey(
        'Course', on_delete=models.CASCADE)
    program = models.ForeignKey(
        'Program', on_delete=models.CASCADE)
    semester = models.IntegerField(validators=[
        MaxValueValidator(2),
        MinValueValidator(1),
    ], default=1)
    course_type = models.CharField(max_length=10, choices=COURSE_TYPE, default='core', null=True)
    # year_of_study = models.IntegerField(validators=[
    #     MaxValueValidator(4),
    #     MinValueValidator(1),
    # ], default=1)
    year_of_study = models.CharField(max_length=1, choices=YEARS_OF_STUDY, default='1')
    academic_year = models.CharField(max_length=9, choices=ACADEMIC_YEAR, default='a')

    # def __str__(self):
    #     return "{} {}".format(self.course, self.program)

    class Meta:
        unique_together = ['course', 'program', 'academic_year', 'semester', 'course_type', 'year_of_study']


# class Lecturer(models.Model):
#     user = models.OneToOneField(
#         "User", verbose_name=("user"), on_delete=models.CASCADE)
#     role = models.ForeignKey(
#         'Role', related_name='lecturer', on_delete=models.SET('empty'))

#     class Meta:
#         verbose_name = ("lecturer")
#         verbose_name_plural = ("lecturers")

#     def __str__(self):
#         return self.user.last_name

#     def get_absolute_url(self):
#         return reverse("lecturer_detail", kwargs={"pk": self.pk})


class Lecture_Course(models.Model):
    ACADEMIC_YEAR = (
        ('a', '2020/2021'),
        ('b', '2021/2022'),
        ('c', '2022/2023'),
        ('d', '2023/2024'),
        ('e', '2024/2025'),
        ('f', '2025/2026'),
    )

    lecturer = models.ForeignKey(
        'Lecturer', on_delete=models.CASCADE)
    course = models.ForeignKey(
        'Course', on_delete=models.CASCADE)
    assessmentCriteria = models.ForeignKey(
        'CA_Item', on_delete=models.CASCADE, null=True)
    ca_contribution = models.IntegerField(validators=[
        MaxValueValidator(40),
        MinValueValidator(0),
    ], default=20)
    academic_year = models.CharField(max_length=9, choices=ACADEMIC_YEAR, default='a')

    # def __str__(self):
    #     return "{}    {}".format(self.lecturer.lecturer.username, self.course.course_code)

    class Meta:
        unique_together = ['lecturer', 'course', 'academic_year', 'assessmentCriteria']


# class Role(models.Model):
#     role = models.CharField(max_length=30, primary_key=True)

#     def __str__(self):
#         return self.role


class Student(models.Model):
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50)
    regno = models.CharField(max_length=13, primary_key=True)
    program = models.ForeignKey(
        'Program', related_name='program', on_delete=models.SET('empty'))

    class Meta:
        verbose_name = "student"
        verbose_name_plural = "students"

    def __str__(self):
        return self.regno

    def get_absolute_url(self):
        return reverse("student_detail", kwargs={"pk": self.pk})


class Assessment(models.Model):
    ACADEMIC_YEAR = (
        ('a', '2020/2021'),
        ('b', '2021/2022'),
        ('c', '2022/2023'),
        ('d', '2023/2024'),
        ('e', '2024/2025'),
        ('f', '2025/2026'),
    )

    criteria = models.ForeignKey(
        'CA_Item', related_name='assessment', on_delete=models.CASCADE)
    course = models.ForeignKey(
        'Course', related_name='assessment', on_delete=models.CASCADE)
    academic_year = models.CharField(max_length=9, choices=ACADEMIC_YEAR, default='a')
    # time = models.CharField(max_length=8, choices=TIME, default='a')
    date_taken = models.DateField(verbose_name='Date', auto_now_add=False)
    # total_mark = models.IntegerField(default=20, verbose_name='Total marks',
    #                                  validators=[MaxValueValidator(100), MinValueValidator(0)])
    number_of_questions = models.IntegerField(
        validators=[MinValueValidator(1)], default=4)
    contribution = models.IntegerField(default=20, verbose_name='Contribution to CA in Percentage',
                                       validators=[MaxValueValidator(40), MinValueValidator(0)])

    def __str__(self):
        return "{} {}".format(self.course, self.criteria)

    class Meta:
        unique_together = ['course', 'contribution', 'criteria', 'academic_year', 'date_taken', 'number_of_questions']


class Assessment_Results(models.Model):
    assessment = models.ForeignKey(
        'Assessment', related_name='result', on_delete=models.CASCADE)
    student = models.ForeignKey(
        'Student', related_name='assessment_result', on_delete=models.CASCADE)
    # question_number = models.IntegerField(default=1, validators=[MaxValueValidator(4), MinValueValidator(0)])
    # total_score = models.IntegerField(validators=[MaxValueValidator(100), MinValueValidator(0)])
    score = models.IntegerField(validators=[MaxValueValidator(100), MinValueValidator(0)])

    def __str__(self):
        return "{} {}".format(self.student, self.assessment)

    class Meta:
        unique_together = ['assessment', 'student', 'score']


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


class Result(models.Model):
    name = models.CharField(default='question', max_length=10)
    first_question = models.IntegerField(validators=[
        MaxValueValidator(10),
        MinValueValidator(0),
    ])
    second_question = models.IntegerField(validators=[
        MaxValueValidator(10),
        MinValueValidator(0),
    ])
    third_question = models.IntegerField(
        validators=[
            MaxValueValidator(10),
            MinValueValidator(0),
        ]
    )
    fourth_question = models.IntegerField(validators=[
        MaxValueValidator(10),
        MinValueValidator(0),
    ])

    # sum = models.IntegerField(null=True)

    @property
    def sum(self):
        sum = self.first_question + self.second_question + self.third_question + self.fourth_question
        return sum

    # sum = property(_sum)
    # def save(self, force_insert=False, force_update=False, using=None,
    #          update_fields=None):
    # def save(self, *args, **kwargs):
    #     self.sum = self._sum()
    #     super(Result, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class LecturerCriteria(models.Model):
    lecturer = models.ForeignKey(
        'Lecturer', related_name='lecturer_criteria', on_delete=models.CASCADE)
    assessmentCriteria = models.ForeignKey(
        'CA_Item', related_name='criteria', on_delete=models.CASCADE)
    ca_contribution = models.IntegerField(validators=[
        MaxValueValidator(40),
        MinValueValidator(0),
    ], default=20)

    class Meta:
        unique_together = ['lecturer', 'assessmentCriteria']
