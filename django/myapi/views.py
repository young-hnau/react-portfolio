from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
import json


@api_view(['GET'])
def agify(request):
    name = request.GET.get('name')
    resp = requests.get(f"https://api.agify.io?name={name}")

    return Response({'message': json.loads(resp.text)})

@api_view(['GET'])
def cats(request):
    resp = requests.get("https://api.thecatapi.com/v1/images/search")

    return Response({'message': json.loads(resp.text)})

@api_view(['GET'])
def recipe(request):
    resp = requests.get("https://www.themealdb.com/api/json/v1/1/random.php")
    respData = json.loads(resp.text)
    respMeal = respData['meals'][0]

    ingredients = [
        respMeal[key]
        for key in respMeal
        if "Ingredient" in key
        and respMeal[key] is not None
        and respMeal[key] != ""
        and respMeal[key] != " "
    ]

    measure = [
        respMeal[key]
        for key in respMeal
        if "Measure" in key
        and respMeal[key] is not None
        and respMeal[key] != ""
        and respMeal[key] != " "
    ]

    if len(ingredients) != len(measure): 
        return Response({'message': 'error', 'errorMessage': 'An error occured while trying to get the recipe'})

    data = {
        'name': respMeal['strMeal'],
        'category': respMeal['strCategory'],
        'instructions': respMeal['strInstructions'],
        'thumb': respMeal['strMealThumb'],
        'ingredients': [
            {'ingredient': ingredients[i], 'measurement': measure[i]}
            for i in range(len(ingredients))
        ],
    }
    return Response({'message': data})