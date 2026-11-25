from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=100, default='Новости')
    created_at = models.DateTimeField(auto_now_add=True)

    def str(self):
        return self.title
