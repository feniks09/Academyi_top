from django.shortcuts import render
from django.http import JsonResponse
from app.models import VictoryPhraseModel


def get_index(request):

    victory_phrase, _ = VictoryPhraseModel.objects.get_or_create(id=1, message='Задание выполнено!')

    return render(
        request=request,
        template_name='app/index.html',
        context={
            'message': victory_phrase.message
        }
    )

def api_ping(request):
    victory_phrase, _ = VictoryPhraseModel.objects.get_or_create(id=1, message='Задание выполнено!')
    
    return JsonResponse({
        "answer": victory_phrase.message
    })
