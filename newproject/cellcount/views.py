from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return render(request, "main.html")

def hello(request):
    return HttpResponse("Hello World!")
