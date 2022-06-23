from django.http import JsonResponse
import random
import json
import os


def findword(request):
    info = json.loads(request.body)

    filepath = os.path.abspath(os.path.dirname(__file__)) + "/wordsrawsorted.json"
    with open(filepath) as f:
        words = json.load(f)["words"]

    word = 'A'
    while word[0].isupper():
        index = random.randint(info["min"], info["max"])
        word = words[index]

        # For debugging (-:
        # word = 'descending'
        # word = 'heap'

    # word = "across"
    return JsonResponse({'word': word, 'rank': index})
