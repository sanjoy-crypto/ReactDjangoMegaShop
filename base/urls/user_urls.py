from django.urls import path
from base.views.user_views import *


urlpatterns = [

    path('login/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', registerUser, name="register"),

    path('profile/', getUserProfile, name="users-profile"),
    path('', getUsers, name="users"),

]
