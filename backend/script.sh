#!/bin/sh
echo "Starting my application..."
python manage.py makemigrations core
python manage.py makemigrations chat
python manage.py makemigrations handyman
python manage.py migrate
python manage.py runserver 0.0.0.0:8000