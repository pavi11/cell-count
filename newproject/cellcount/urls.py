from django.urls import path

from . import views, count, predict

urlpatterns = [
               path('', views.index, name='index'),
               path('hello', views.hello, name='hello'),
               path('count', count.hello, name='count'),
               path('predict',predict.predict,name='predict')
               ]