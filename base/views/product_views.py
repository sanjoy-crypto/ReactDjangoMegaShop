from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.products import products
from base.models import *
from base.serializers import *
from django.contrib.auth.models import User


from rest_framework import status
# Create your views here.


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializers = ProductSerializer(products, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)
