import xlwt
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import status, viewsets, generics
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Result, Assessment_Criteria
from .serializers import ResultSerializer, AssessmentCriteriaSerializer, LecturerCourseSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import authentication


# def show_average(request): results = Result.objects.all().values_list('first_question', 'second_question',
# 'third_question', 'fourth_question')
#
#     student_scores = []
#
#     # for scores in results:
#     #     result = [
#     #         results[scores].first_question,
#     #         results[scores].second_question,
#     #         results[scores].third_question,
#     #         results[scores].fourth_question,
#     #     ]
#     #     student_scores.append(result)
#
#     # for a in range(len(results)):
#     #     print(list(results[a]))
#
#     print(results)
#     return Response('len(results)')


class ResultsViewset(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    permission_classes = [IsAuthenticated]


class AssessmentCriteriaViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Assessment_Criteria.objects.all()
    serializer_class = AssessmentCriteriaSerializer
    permission_classes = [IsAuthenticated]


class UserDetails(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = LecturerCourseSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        print(request.data)
        queryset = self.get_queryset()
        serializer = LecturerCourseSerializer(queryset, many=True)
        return Response(serializer.data)


def get_lecture_course_details(token):
    user_email = Token.objects.get(key=token).user.email
    user_first_name = Token.objects.get(key=token).user.first_name
    user_last_name = Token.objects.get(key=token).user.last_name
    user = {"user_email": user_email, "user_first_name": user_first_name, "user_last_name": user_last_name}
    return user


# # @api_view(['GET', 'POST'])
# @csrf_exempt
# def show_results(request):
#     if request.method == 'GET':
#         results = Result.objects.all()
#         serializer = ResultSerializer(results, many=True)
#         return JsonResponse(serializer.data, safe=False)
#
#
# @csrf_exempt
# @api_view(['POST'])
# def create_results(request):
#     if request.method == 'POST':
#         serializer = ResultSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    ws.write_merge(top_row, bottom_row, left_column, right_column, 'UNIVERSITY OF DAR ES SALAAM', horz_style)
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
        ws.write(row_num, col_num, columns[col_num], font_style)  # at 0 row 0 column

    # Sheet body, remaining rows
    font_style = xlwt.XFStyle()

    rows = User.objects.all().values_list('username', 'first_name', 'last_name', 'email')
    for row in rows:
        row_num += 1
        for col_num in range(len(row)):
            ws.write(row_num, col_num, row[col_num], font_style)

    wb.save(response)

    context = {}

    return render(request, 'backendapi/excel_home.html', context)
