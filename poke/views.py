from django.shortcuts import render
from django.http import HttpResponse, Http404
import requests
from django.http import JsonResponse

def index(request):
	response = requests.get("http://pokeapi.co/api/v2/pokemon/")
	response = response.json()
	#print response['results']
	index = 0
	poke_dict = {}
	for pokemon in response['results']:
		index = index+1
		poke_dict[index] = pokemon['name']
	#print index
	data = {
	'index':index,
	'poke_dict':poke_dict,
	}
	return render(request,'poke/index.html',data)	
# Create your views here.
def next(request):
	if request.method == "GET":
 		try:
 			index = request.GET['index']
 			index = int(index)
 			#print index
 		except Exception as e:
 			raise e
 		try:
 			response = requests.get("http://pokeapi.co/api/v2/pokemon/?offset="+str(index))
 			response = response.json()
		except Exception as e:
 			raise e
 		poke_dict = {}
 		for pokemon in response['results']:
 			index = index + 1
 			poke_dict[index] = pokemon['name']

 		data = {
 		'index':index,
 		'poke_dict':poke_dict,
 		}
 		return JsonResponse(data)
 	else:
 		raise Http404("No Get Request")

def previous(request):
	if request.method == "GET":
 		try:
 			index = request.GET['index']
 			index = int(index)
 			index = index - 40
 		except Exception as e:
 			raise e
 		try:
 			response = requests.get("http://pokeapi.co/api/v2/pokemon/?offset="+str(index))
 			response = response.json()
		except Exception as e:
 			raise e
 		poke_dict = {}
 		for pokemon in response['results']:
 			index = index + 1
 			poke_dict[index] = pokemon['name']

 		data = {
 		'index':index,
 		'poke_dict':poke_dict,
 		}
 		return JsonResponse(data)
 	else:
 		raise Http404("No Get Request")

def poke_detail(request):
	if request.method == "GET":
		try:
			key = request.GET['key']
			key = int(key)
		except Exception as e:
			raise e
		
		try:
			response = requests.get("http://pokeapi.co/api/v2/pokemon/"+str(key)+"/")
			response = response.json()
		except Exception as e:
			raise e

		poke_det = {
		'key':key,
		'name':response['name'],
		'base_experience':response['base_experience'],
		'height':response['height'],
		'order':response['order'],
		'weight':response['weight'],
		}

		return JsonResponse(poke_det)
	else:
		raise Http404("No Get in poke_detail")


def analytics(request):
	if request.method == "GET":
		try:
 			index = request.GET['index']
 			index = int(index)
 			#print index
 		except Exception as e:
 			raise e
 		try:
 			response = requests.get("http://pokeapi.co/api/v2/pokemon/?limit=10&offset="+str(index))
 			response = response.json()
		except Exception as e:
 			raise e
 		poke_d = []
 		for pokemon in response['results']:
 			index = index + 1
 			res = requests.get(str(pokemon['url']))
 			res = res.json()
 			dict = {
 			'name':res['name'],
 			'base_experience':res['base_experience'],
 			'height':res['height'],
 			'weight':res['weight'],
 			}
 			poke_d.append(dict);

 		#print poke_d
 		data = {
 		'index':index,
 		'poke_d':poke_d,
 		}
 		return JsonResponse(data)
 	else:
 		raise Http404("No Get Request in analytics")


