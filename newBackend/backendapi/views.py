import xlwt
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import status, viewsets, generics
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ResultSerializer, CA_ItemSerializer, LecturerCourseSerializer, AssessmentSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import authentication
from rest_framework.authtoken.models import Token
from .models import *
# lau imports
from rest_framework import generics
from . import serializers


class ResultsViewset(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    permission_classes = [IsAuthenticated]


class CA_ItemsViewset(viewsets.ReadOnlyModelViewSet):
    queryset = CA_Item.objects.all()
    serializer_class = CA_ItemSerializer
    permission_classes = [IsAuthenticated]


#
#
# lecturer details api
#
#

def get_user_from_token(token):
    user = Token.objects.get(pk=token).user
    print("username: {}".format(user))
    return user


def get_lecturer_from_user(user):
    lecturer = Lecturer.objects.get(lecturer=user)
    print("lecturer role: {}".format(lecturer.role))
    return lecturer


def get_lecturer_name(lecturer):
    lecturer_first_name = lecturer.lecturer.first_name
    lecturer_last_name = lecturer.lecturer.last_name
    print("lecturer name: {} {}".format(
        lecturer_first_name, lecturer_last_name))
    return "{} {}".format(lecturer_first_name, lecturer_last_name)


def get_courses_assigned_to_a_lecturer(lecturer):
    lecturer_course = Lecture_Course.objects.filter(lecturer=lecturer)
    print('lecturer course: {}'.format(lecturer_course))
    courses = get_list_of_courses_for_a_lecturer(lecturer_course)
    print("number of courses assigned to {}: {}".format(
        get_lecturer_name(lecturer), len(courses)))
    print(courses)
    return courses


def get_list_of_courses_for_a_lecturer(list_of_lecturer_course_instance):
    courses = []

    for lecturer_course_instance in list_of_lecturer_course_instance:
        courses.append(
            {
                "course_code": lecturer_course_instance.course.course_code,
                "course_description": lecturer_course_instance.course.course_name
            }
        )
    return courses


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def lecturer_details(request):
    usernames = [user.username for user in User.objects.all()]
    print("token from request header: {}".format(
        request.META.get('HTTP_AUTHORIZATION')))
    authorization_token = request.META.get('HTTP_AUTHORIZATION')
    token = authorization_token[6:]

    try:
        user = get_user_from_token(token)
        lecturer = get_lecturer_from_user(user)
        lecturer_name = get_lecturer_name(lecturer)
        courses = get_courses_assigned_to_a_lecturer(lecturer)

        return Response({
            "user_name": lecturer.lecturer.username,
            "lecturer_name": lecturer_name,
            "courses_teaching": courses,
            "course_count": len(courses),
            "position": lecturer.role.role_name,
        })
    except ObjectDoesNotExist as error:
        print("no lecturer with such credentials")
        print("error message: {}".format(error))

    print("usernames: {}".format(usernames))

    return Response("Nothing to show")


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def assessment_details(request):
    authorization_token = request.META.get('HTTP_AUTHORIZATION')
    token = authorization_token[6:]

    if request.method == 'GET':
        try:
            user = get_user_from_token(token)
            lecturer = get_lecturer_from_user(user)
            courses = get_courses_assigned_to_a_lecturer(lecturer)

            courses_list = []
            for course in courses:
                courses_list.append(course["course_code"])

            assessments = Assessment.objects.filter(course__in=courses_list)
            serializer = AssessmentSerializer(assessments, many=True)
            return Response(serializer.data)

        except ObjectDoesNotExist as error:
            print("error message: {}".format(error))

    elif request.method == "POST":
        serializer = AssessmentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def assessment_details_update_delete(request, pk):
    try:
        assessment = Assessment.objects.get(pk=pk)
    except Assessment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "DELETE":
        assessment.delete()
        return Response({"message": "deleted successfully", "verified_by": "django"}, status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = AssessmentSerializer(assessment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#
#
# end lecturer api
#
#


def export_users_xls(request):
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="users.xls"'

    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('Users Data')  # this will make a sheet named Users Data

    # writing the first row
    alignment = xlwt.Alignment()
    alignment.horz = xlwt.Alignment.HORZ_CENTER
    look = xlwt.Font()
    look.bold = True
    horz_style = xlwt.XFStyle()
    horz_style.alignment = alignment
    horz_style.font = look

    top_row = 1
    bottom_row = 1
    left_column = 0
    right_column = 3
    ws.write_merge(top_row, bottom_row, left_column, right_column,
                   'UNIVERSITY OF DAR ES SALAAM', horz_style)
    # end of first row

    # writing the second row
    alignment = xlwt.Alignment()
    alignment.horz = xlwt.Alignment.HORZ_CENTER
    look = xlwt.Font()
    look.bold = False
    horz_style = xlwt.XFStyle()
    horz_style.alignment = alignment
    horz_style.font = look

    top_row = 3
    bottom_row = 3
    left_column = 0
    right_column = 3
    ws.write_merge(top_row, bottom_row, left_column, right_column, 'SUMMARY OF RESULTS (PAPERS/COURSES/PRACTICAL/ORAL)',
                   horz_style)
    # end of second row

    # writing programme
    row_num = 5
    col_num = 0
    ws.write(row_num, col_num, "CEIT", xlwt.XFStyle())
    # end of writing programme

    # writing year of study
    row_num = 5
    col_num = 2
    ws.write(row_num, col_num, "YEAR OF STUDY", xlwt.XFStyle())
    # end of writing year of study
    #
    # writing year of study value
    row_num = 5
    col_num = 3
    style = xlwt.XFStyle()
    bold_style = xlwt.Font()
    bold_style.bold = True
    style.font = bold_style
    style.alignment = alignment
    ws.write(row_num, col_num, "III", style)
    # end of writing year of study value

    # Sheet header, first row
    row_num = 10

    font_style = xlwt.XFStyle()
    font_style.font.bold = True

    columns = ['Username', 'First Name', 'Last Name', 'Email Address', ]

    for col_num in range(len(columns)):
        cwidth = ws.col(col_num).width
        if (len(columns[col_num]) * 367) > cwidth:
            ws.col(col_num).width = (len(columns[col_num]) * 367)
        # at 0 row 0 column
        ws.write(row_num, col_num, columns[col_num], font_style)

    # Sheet body, remaining rows
    font_style = xlwt.XFStyle()

    rows = User.objects.all().values_list(
        'username', 'first_name', 'last_name', 'email')
    for row in rows:
        row_num += 1
        for col_num in range(len(row)):
            ws.write(row_num, col_num, row[col_num], font_style)

    wb.save(response)

    context = {}

    return render(request, 'backendapi/excel_home.html', context)


# lau views
class UEListCreateView(generics.ListCreateAPIView):
    queryset = UE.objects.all()
    serializer_class = serializers.UESerializer
