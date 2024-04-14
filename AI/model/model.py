import torch
import torch.nn as nn
import torch.nn.functional as F

class RockPaperScissorsRecognitionCNN(nn.Module):
    def __init__(self):
        super(RockPaperScissorsRecognitionCNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 96, kernel_size=11, stride=1)
        self.pool1 = nn.MaxPool2d(kernel_size=3, stride=1)
        self.batchnorm1 = nn.BatchNorm2d(96)

        self.conv2 = nn.Conv2d(96, 256, kernel_size=5)
        self.pool2 = nn.MaxPool2d(kernel_size=3, stride=1)
        self.batchnorm2 = nn.BatchNorm2d(256)

        self.conv3_1 = nn.Conv2d(256, 256, kernel_size=3)
        self.conv3_2 = nn.Conv2d(256, 384, kernel_size=3)
        self.conv3_3 = nn.Conv2d(384, 384, kernel_size=3)
        self.pool3 = nn.MaxPool2d(kernel_size=3, stride=1)
        self.batchnorm3 = nn.BatchNorm2d(384)

        self.fc1 = nn.Linear(384 * 12 * 12, 4096)
        self.dropout1 = nn.Dropout(0.5)
        self.fc2 = nn.Linear(4096, 4096)
        self.dropout2 = nn.Dropout(0.5)
        self.fc3 = nn.Linear(4096, 3)

    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = self.pool1(x)
        x = self.batchnorm1(x)

        x = F.relu(self.conv2(x))
        x = self.pool2(x)
        x = self.batchnorm2(x)

        x = F.relu(self.conv3_1(x))
        x = F.relu(self.conv3_2(x))
        x = F.relu(self.conv3_3(x))
        x = self.pool3(x)
        x = self.batchnorm3(x)

        x = x.view(-1, 384 * 12 * 12)
        x = F.tanh(self.fc1(x))
        x = self.dropout1(x)
        x = F.tanh(self.fc2(x))
        x = self.dropout2(x)
        x = F.softmax(self.fc3(x), dim=1)
        return x

