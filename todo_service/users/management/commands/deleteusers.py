from django.core.management.base import BaseCommand, CommandError
from users.models import User


class Command(BaseCommand):
    help = 'For deleting users.'

    def handle(self, *args, **options):
        self.stdout.write('Started deleting users...')
        try:
            for user in User.objects.filter(username__startswith='test'):
                user.delete()
        except Exception as error:
            raise CommandError(error)
        else:
            self.stdout.write('Test users were deleted.')
