# Use the official Python image as the base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the local code to the container
COPY . .

# Install any dependencies required by your Python script
RUN pip install grpcio grpcio-tools

# Generate gRPC code
RUN python -m grpc_tools.protoc -Igrpc_service --python_out=. --grpc_python_out=. grpc_service/rock_paper_scissors.proto

# Expose the port the gRPC server runs on
EXPOSE 50051

# Define the command to run your application
CMD ["python", "server.py"]