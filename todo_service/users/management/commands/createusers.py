from django.core.management.base import BaseCommand, CommandError
from users.models import User


class Command(BaseCommand):
    help = 'For creating users.'

    def handle(self, *args, **options):
        users_number = 3
        self.stdout.write('Started creating users...')
        try:
            User.objects.create_user(username='testsu',
                                     email='su@example.local',
                                     password='testsupass', is_superuser=True)
        except Exception as error:
            raise CommandError(error)
        else:
            self.stdout.write(
                'Superuser "testsu" created; password: "testsupass".')

        for user_id in range(users_number):
            try:
                name = f'test_{user_id}'
                User.objects.create_user(username=name,
                                         email=f'{name}@example.local',
                                         password=f'{name}pass')
            except Exception as error:
                raise CommandError(error)
            else:
                self.stdout.write(
                    f'User {name} created; password: "{name}pass".')
