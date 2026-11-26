from django.shortcuts import render

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
