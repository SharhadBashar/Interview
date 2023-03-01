from django.conf import settings


def get_site_url():
    """Get the full base URL for this site based on settings."""
    protocol = "http" if settings.IN_DEV else "https"
    domain = settings.CURRENT_DOMAIN
    return "{0}://{1}{2}".format(protocol, domain, f":{settings.CURRENT_PORT}" if settings.CURRENT_PORT else "")
