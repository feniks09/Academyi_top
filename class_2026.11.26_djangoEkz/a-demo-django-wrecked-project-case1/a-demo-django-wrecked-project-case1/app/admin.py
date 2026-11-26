from django.contrib import admin
from app.models import VictoryPhraseModel


@admin.register(VictoryPhraseModel)
class VictoryPhraseModelAdmin(admin.ModelAdmin):

    list_display = ('message',)
