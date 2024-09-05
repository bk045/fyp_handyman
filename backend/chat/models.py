from django.db import models
from core.models import AppUser
from datetime import datetime

class Room(models.Model):
    user1 = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="u1")
    user2 = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="u2")


class Message(models.Model):
    message = models.TextField()
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="user_messages")
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="room_messages")
    timestamp = models.DateTimeField(default=datetime.now)

class Notification(models.Model):
    by = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="posted_by")
    to = models.ManyToManyField(AppUser)
    message = models.TextField()