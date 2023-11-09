class Config:
    """
    Base Configuration
    """

    APP_NAME = 'Image Recognition Backend'
    FRONT_END_DOMAIN = 'http://localhost:3000'
    SECRET_KEY = "testkey"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    LOG_FILE = "api.log"  # where logs are outputted to
    JWT_SECRET_KEY = "sectret"
    API_ROOT = "/api"




class DevelopmentConfig(Config):
    """
    Development Configuration - default config
    This defaults the Database URL that can be created through the docker
    cmd in the setup instructions. You can change this to environment variable as well.
    """
    DEBUG = True

class ProductionConfig(Config):
    """
    Production Configuration
    Most deployment options will provide an option to set environment variables.
    Hence, why it defaults to retrieving the value of the env variable `DATABASE_URL`.
    You can update it to use a `creds.ini` file or anything you want.
    Requires the environment variable `FLASK_ENV=prod`
    """
    DEBUG = False


config = { "dev": DevelopmentConfig,  "prod": ProductionConfig }