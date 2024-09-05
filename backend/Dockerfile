FROM python:3.10-alpine3.20
# Prevents Python from writing pyc files.
ENV PYTHONDONTWRITEBYTECODE=1
# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1
RUN addgroup handyman && adduser -S -G handyman handyman
COPY Pipfile.* /code
COPY . /code
RUN pip install --upgrade pip
RUN pip install pipenv
WORKDIR /code
RUN pipenv install --system --deploy
RUN chgrp -R handyman .
RUN chown -R handyman .
RUN chmod -R g=rwx .
RUN chmod -R u=rwx .
USER handyman
EXPOSE 8000
ENTRYPOINT ["./script.sh"]