from django.urls import path
from . import views

urlpatterns = [
    # Главная страница
    path('', views.home, name='home'),
    
    # Список всех статей
    path('articles/', views.article_list, name='article_list'),
    
    # Фильтрация по категории (передается строка)
    path('articles/category/<str:category_name>/', views.articles_by_category, name='articles_by_category'),
    
    # Поиск статей
    path('articles/search/', views.article_search, name='article_search'),
    
    # Статистика в JSON
    path('articles/stats/', views.articles_stats, name='articles_stats'),
]