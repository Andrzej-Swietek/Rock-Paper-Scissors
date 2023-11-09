import os
import logging

from flask import Flask, request, jsonify
from flask_cors import CORS

from api.config import config
from utils import RequestFormatter

from blueprints.prediction import prediction_blueprint


def create_app(test_config=None):
    """
        The flask application factory.
    """
    app = Flask(__name__)

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not Found'}), 404

    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({'error': 'Internal Server Error'}), 500

    CORS(app) 

    env = os.environ.get("FLASK_ENV", "dev")

    app.config.from_object(config[env]) 

    # Logger
    formatter = RequestFormatter(
        "%(asctime)s %(remote_addr)s: requested %(url)s: %(levelname)s in [%(module)s: %(lineno)d]: %(message)s"
    )

    if app.config.get("LOG_FILE"):
        fileHandler = logging.FileHandler(app.config.get("LOG_FILE"))
        fileHandler.setLevel(logging.DEBUG)
        fileHandler.setFormatter(formatter)
        app.logger.addHandler(fileHandler)

    strm = logging.StreamHandler()
    strm.setLevel(logging.DEBUG)
    strm.setFormatter(formatter)

    app.logger.addHandler(strm)
    app.logger.setLevel(logging.DEBUG)

    root = logging.getLogger("core")
    root.addHandler(strm)

    app.register_blueprint(prediction_blueprint, url_prefix='/api/prediction')


    retrun app

