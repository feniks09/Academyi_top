from django.contrib import admin


@admin.register
class VictoryPhraseModelAdmin(admin.ModelAdmin):

    list_display = ('message',)
