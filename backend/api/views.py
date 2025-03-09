from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Note


# Create your views here.
class NoteListCreateView(generics.ListCreateAPIView): # To list and create notes
    serializer_class = NoteSerializer # To serialize and deserialize note objects
    permission_classes = [IsAuthenticated] # To allow only authenticated users to create notes
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)





class NoteDeleteView(generics.DestroyAPIView): # To delete a note
    serializer_class = NoteSerializer # To serialize and deserialize note objects
    permission_classes = [IsAuthenticated] # To allow only authenticated users to delete notes  
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)





class CreateUserView(generics.CreateAPIView): # To create a user
    queryset = User.objects.all() # To get all users
    serializer_class = UserSerializer # To serialize and deserialize user objects
    permission_classes = [AllowAny] # To allow anyone to create a user
    