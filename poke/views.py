from django.shortcuts import render
from django.http import HttpResponse
import requests

def index(request):
    response = requests.get('http://pokeapi.co/api/v2/pokemon/2/')
    #print response
    data = response.json()
    r =  requests.get('http://pokeapi.co/api/v2/pokemon/1/')
    print data['name']
    d = r.json()
    print d['name']
    return render(request,'poke/base.html',{'data':data,'d':d})
# Create your views here.
