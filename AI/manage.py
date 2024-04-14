from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from dotenv import load_dotenv
import subprocess


app = create_app()

load_dotenv()

manager = Manager(app)

# @manager.command
# def runserver():
#     app.run(debug=True, host="127.0.0.1", port=50051)
#
# @manager.command
# def runworker():
#     app.run(debug=False)

@manager.command
def start_grpc_server():
    """
    Start the gRPC server.
    """
    subprocess.run(["python", "api/__init__.py"])

if __name__ == "__main__":
    manager.run()


