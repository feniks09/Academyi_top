from django.http import JsonResponse, Http404
from django.shortcuts import render
from django.db.models import Count
from .models import Article


def home(request):
    return render(request, 'blog/home.html')


def article_list(request):
    articles = Article.objects.all()
    return render(request, 'blog/article_list.html', {
        'articles': articles
    })


def articles_by_category(request, category_name):
    articles = Article.objects.filter(category__iexact=category_name)

    if not articles.exists():
        raise Http404(f'Категория «{category_name}» не найдена.')

    return render(request, 'blog/article_list.html', {
        'articles': articles,
        'category': category_name
    })


def article_search(request):
    query = request.GET.get('q', '').strip()
    articles = Article.objects.none()

    if query:
        articles = Article.objects.filter(title__icontains=query)

    return render(request, 'blog/search.html', {
        'articles': articles,
        'query': query,
        'no_results': bool(query) and not articles.exists()
    })


def articles_stats(request):
    total = Article.objects.count()

    by_category = Article.objects.values('category').annotate(
        count=Count('id')
    ).order_by('category')

    unique_categories = Article.objects.values_list(
        'category', flat=True
    ).distinct().order_by('category')

    return JsonResponse({
        'total_articles': total,
        'articles_by_category': {
            item['category']: item['count'] for item in by_category
        },
        'unique_categories': list(unique_categories)
    })